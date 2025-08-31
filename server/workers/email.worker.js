import amqp from "amqplib";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function startWorker() {
  try {
    // const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("emails", { durable: true });
    await channel.assertQueue("reminders", { durable: true });

    console.log("📨 Email worker listening on queues: emails, reminders...");

    channel.consume("emails", async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log("📧 Processing registration email:", data);

        try {
          await transporter.sendMail({
            from: '"Event System" <no-reply@events.com>',
            to: data.to,
            subject: `You're registered for ${data.event.title}`,
            text: `Hi, you successfully registered for ${data.event.title} on ${data.event.date}.`,
          });
          console.log("✅ Registration email sent to", data.to);
          channel.ack(msg);
        } catch (err) {
          console.error("❌ Failed to send email:", err.message);
          channel.nack(msg, false, true); 
        }
      }
    });

    channel.consume("reminders", async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log("📧 Processing reminder email:", data);

        try {
          await transporter.sendMail({
            from: '"Event System" <no-reply@events.com>',
            to: data.to,
            subject: `Reminder: ${data.event.title} is coming up`,
            text: `Hi, just a reminder about ${data.event.title} on ${data.event.date}.`,
          });
          console.log("✅ Reminder email sent to", data.to);
          channel.ack(msg);
        } catch (err) {
          console.error("❌ Failed to send reminder:", err.message);
          channel.nack(msg, false, true);
        }
      }
    });

  } catch (err) {
    console.error("❌ Email worker error:", err.message);
    process.exit(1);
  }
}

startWorker();
