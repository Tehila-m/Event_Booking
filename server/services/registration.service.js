import Registration from "../models/sql/Registration.js"; // adjust path if needed

export async function getRegistrationByUserAndEvent(userId, eventId) {
  return await Registration.findOne({
    where: { userId, eventId }
  });
}
