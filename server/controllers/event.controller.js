import { Event, Registration, User } from "../models/sql/associations.js";
import { getRedis } from "../config/redis.js";
import { getHotEvent } from "../services/cache.service.js";

export async function getAllEvents(request, reply) {
  try {
    const events = await Event.findAll({
      order: [["date"]],
      include: [
        {
          model: Registration,
          where: { status: "REGISTERED" },
          required: false, 
          include: [{ model: User, attributes: ["id", "name", "email"] }]
        }
      ]
    });

    const mapped = events.map(event => {
      const regs = event.Registrations || [];
      return {
        ...event.toJSON(),
        registeredCount: regs.length,
        registeredUsers: regs.map(r => r.User) 
      };
    });

    reply.send(mapped);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }

  //     const eventsWithHot = await Promise.all(
  //     events.map(async (event) => {
  //       const hotSeats = await getHotEvent(event.id); // Redis check
  //       return {
  //         ...event.toJSON(),
  //         registeredCount: event.Registrations?.length || 0,
  //         registeredUsers: event.Registrations?.map(r => r.User) || [],
  //         isHot: hotSeats !== null // flag for frontend
  //       };
  //     })
  //   );

  //   reply.send(eventsWithHot);
  // } catch (err) {
  //   reply.code(500).send({ error: err.message });
  // }

}

export async function getEventById(request, reply) {
  try {
    const event = await Event.findByPk(request.params.id, {
      include: [
        {
          model: Registration,
          where: { status: "REGISTERED" },
          required: false,
          include: [{ model: User, attributes: ["id", "name", "email"] }]
        }
      ]
    });

    if (!event) return reply.code(404).send({ error: "Event not found" });

    const regs = event.Registrations || [];
    const result = {
      ...event.toJSON(),
      registeredCount: regs.length,
      registeredUsers: regs.map(r => r.User)
    };

    reply.send(result);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}


export async function createEvent(request, reply) {
  try {
    const event = await Event.create(request.body);
    reply.code(201).send(event);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}

export async function updateEvent(request, reply) {
  try {
    const event = await Event.findByPk(request.params.id);
    if (!event) return reply.code(404).send({ error: "Event not found" });
    const updated = await event.update(request.body);
    reply.send(updated);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}

export async function deleteEvent(request, reply) {
  try {
    const event = await Event.findByPk(request.params.id);
    if (!event) return reply.code(404).send({ error: "Event not found" });
    await event.destroy();
    reply.code(204).send();
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}
