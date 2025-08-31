import cron from "node-cron";
import { Event, Registration } from "../models/sql/associations.js";
import { queueReminderEmail } from "../services/emailQueue.js";

cron.schedule("0 * * * *", async () => {
  console.log("⏰ Running reminder scheduler...");

  const now = new Date();
  const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000); 

  try {
    const events = await Event.findAll({
      where: {
        date: {
          [Op.between]: [nextDay, new Date(nextDay.getTime() + 60 * 60 * 1000)] 
        }
      }
    });

    for (const event of events) {
      const regs = await Registration.findAll({
        where: { eventId: event.id, status: "REGISTERED" }
      });

      for (const reg of regs) {
        const userEmail = process.env.SMTP_USER || "test@example.com";
        await queueReminderEmail(userEmail, event);
        console.log(`📬 Queued reminder for ${userEmail} - ${event.title}`);
      }
    }
  } catch (err) {
    console.error("❌ Reminder scheduler error:", err.message);
  }
});
