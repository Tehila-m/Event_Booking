import amqp from "amqplib";

let channel;

export async function initRabbitMQ() {
  const conn = await amqp.connect(ENV.PROCESS.RABBITMQ_URL);
  channel = await conn.createChannel();

  await channel.assertQueue("emails", { durable: true });
  await channel.assertQueue("reminders", { durable: true });

  await channel.assertQueue("reminders_scheduled", {
    durable: true,
    arguments: {
      "x-dead-letter-exchange": "",
      "x-dead-letter-routing-key": "reminders",
    },
  });

  channel.prefetch(10);

  conn.on("close", () => console.error("RabbitMQ connection closed"));
  conn.on("error", (err) => console.error("RabbitMQ connection error:", err));

  console.log("✅ RabbitMQ connected & queues ready");
  return channel;
}

export function getChannel() {
  if (!channel) throw new Error("RabbitMQ not initialized");
  return channel;
}
