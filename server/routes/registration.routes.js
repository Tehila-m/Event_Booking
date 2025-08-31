import { registerForEvent, cancelRegistration, getRegistrationsByUser } from "../controllers/registration.controller.js";
  
  export default async function registrationRoutes(fastify) {
    fastify.post("/registrations/:eventId", /*{ preHandler: [fastify.authenticate] },*/ registerForEvent);
    fastify.delete("/registrations/:id", /*{ preHandler: [fastify.authenticate] },*/ cancelRegistration);
    fastify.get("/registrations/me", /*{ preHandler: [fastify.authenticate] },*/ getRegistrationsByUser);
  }
  