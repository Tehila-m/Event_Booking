import { queueReminderEmail } from "../services/email.service.js";

async function reminderRoutes(app) {
    app.post("/events/:id/remind", async (req, reply) => {
      const { id } = req.params;
      const { userEmail } = req.body;
  
      const event = { id, name: "Some Event" };
  
      await queueReminderEmail(userEmail, event);
  
      return { message: "Reminder queued", event };
    });
  }
  
  export default reminderRoutes;
  