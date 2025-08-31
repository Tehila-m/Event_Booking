import { getChannel } from "../config/rabbitmq.js";

export async function queueRegistrationEmail(userEmail, event) {
  const channel = getChannel();
  channel.sendToQueue("emails", Buffer.from(JSON.stringify({
    type: "registration",
    to: userEmail,
    event
  })));
}

export async function queueReminderEmail(userEmail, event) {
  const channel = getChannel();
  channel.sendToQueue("reminders", Buffer.from(JSON.stringify({
    type: "reminder",
    to: userEmail,
    event
  })));
}
