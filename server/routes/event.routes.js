import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../controllers/event.controller.js";
  
  export default async function eventRoutes(fastify) {
    fastify.post("/events", /*{ preHandler: [fastify.authenticate] },*/ createEvent);
    fastify.get("/events", getAllEvents);
    fastify.get("/events/:id", getEventById);
    fastify.put("/events/:id", /*{ preHandler: [fastify.authenticate] },*/ updateEvent);
    fastify.delete("/events/:id", /*{ preHandler: [fastify.authenticate] },*/ deleteEvent);
  }
  