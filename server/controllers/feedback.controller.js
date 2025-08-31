import Feedback from "../models/mongo/Feedback.js";
import { getRegistrationByUserAndEvent } from "../services/registration.service.js";

import { v4 as uuidv4 } from "uuid";

export async function submitFeedback(request, reply) {
  const { eventId } = request.params;
  const {
    userName,
    satisfiedLevel,
    suggetedLevel,
    foodLevel,
    cleanLevel,
    showLevel,
    dis_recommendations
  } = request.body;

  try {
    const registration = await getRegistrationByUserAndEvent(userId, eventId);
    if (!registration) {
      return reply.code(403).send({ error: "You must register for the event before leaving feedback." });
    }

    const feedback = await Feedback.create({
      id: uuidv4(),   // generate unique id
      eventId,
      userName,
      satisfiedLevel,
      suggetedLevel,
      foodLevel,
      cleanLevel,
      showLevel,
      dis_recommendations
    });

    reply.code(201).send(feedback);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}

export async function getFeedbackByEvent(request, reply) {
  const { eventId } = request.params;

  try {
    const feedbacks = await Feedback.find({ eventId });
    reply.send(feedbacks);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}
