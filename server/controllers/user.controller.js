import { User } from "../models/sql/associations.js";
import amqplib from "amqplib";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

async function publishMessage(queue, message) {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}

export async function loginUser(request, reply) {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return reply.code(401).send({ error: "Invalid email or password" });
    }

    if (user.password !== password) {
      return reply.code(401).send({ error: "Invalid email or password" });
    }

    // const isValid = await bcrypt.compare(password, user.password);

    reply.send({
      id: user.id,
      name: user.name,
      email: user.email,
    });

  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}


export async function registerUser(request, reply) {
  const { name, email, password } = request.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return reply.code(400).send({ error: "Email already exists" });

    const user = await User.create({ name, email, password });

    await publishMessage("registrationEmails", {
      type: "CONFIRMATION",
      email: user.email,
      name: user.name,
      userId: user.id
    });

    reply.code(201).send({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
}

export async function getUserProfile(request, reply) {
  reply.send(request.user);
}
