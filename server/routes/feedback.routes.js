import { submitFeedback, getFeedbackByEvent } from "../controllers/feedback.controller.js";
  
  export default async function feedbackRoutes(fastify) {
    fastify.post("/feedback/:eventId", /*{ preHandler: [fastify.authenticate] },*/ submitFeedback);
    fastify.get("/feedback/:eventId", /*{ preHandler: [fastify.authenticate] },*/ getFeedbackByEvent);
  }
  