import { Registration, Event } from "../models/sql/associations.js";
import { setHotEvent } from "../services/cache.service.js";
import { queueRegistrationEmail } from "../services/email.service.js";

export async function registerForEvent(request, reply) {
  const { userId, userName, email } = request.body; // take from frontend
  const { eventId } = request.params;

  try {
    const event = await Event.findByPk(eventId);
    if (!event) return reply.code(404).send({ error: "Event not found" });

    const count = await Registration.count({
      where: { eventId, status: "REGISTERED" }
    });
    if (count >= event.capacity) {
      return reply.code(400).send({ error: "Event is full" });
    }

    const registration = await Registration.create({
      userId,
      userName,
      eventId,
      status: "REGISTERED"
    });

    const seatsLeft = event.capacity - (count + 1);
    await setHotEvent(eventId, seatsLeft);

    if (email) {
      await queueRegistrationEmail(email, event);
    }

    reply.code(201).send(registration);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}

export async function cancelRegistration(request, reply) {
  const { id } = request.params;

  try {
    const reg = await Registration.findByPk(id);
    if (!reg) return reply.code(404).send({ error: "Registration not found" });

    const cancelled = await reg.update({ status: "CANCELLED" });

    const event = await Event.findByPk(reg.eventId);
    const count = await Registration.count({ where: { eventId: reg.eventId, status: "REGISTERED" } });
    const seatsLeft = event.capacity - count;
    await setHotEvent(event.id, seatsLeft);

    reply.send(cancelled);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}

export async function getRegistrationsByUser(request, reply) {
  const { userId } = request.query;

  try {
    const regs = await Registration.findAll({
      where: { userId },
      include: ["Event"]
    });
    reply.send(regs);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}
