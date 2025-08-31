import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../config/env.js";
const JWT_SECRET = process.env.JWT_SECRET;

export async function authenticate(request, reply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) return reply.code(401).send({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return reply.code(401).send({ error: "Invalid token format" });

    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = { id: decoded.id, email: decoded.email };
  } catch (err) {
    return reply.code(401).send({ error: "Unauthorized: " + err.message });
  }
}
