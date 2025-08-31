import { registerUser, loginUser, getUserProfile } from "../controllers/user.controller.js";

export default async function userRoutes(fastify) {
  fastify.post("/users/register", registerUser);
  fastify.post("/users/login", loginUser);
  fastify.get("/users/me", /*{ preHandler: [fastify.authenticate] },*/ getUserProfile);
}
