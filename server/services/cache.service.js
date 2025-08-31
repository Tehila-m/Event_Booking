import { getRedis } from "../config/redis.js";

export async function setHotEvent(eventId, seatsLeft) {
  const redis = getRedis();
  if (seatsLeft < 10) {
    await redis.set(`hot_event:${eventId}`, seatsLeft, { EX: 3600 }); 
  } else {
    await redis.del(`hot_event:${eventId}`);
  }
}

export async function getHotEvent(eventId) {
  const redis = getRedis();
  return await redis.get(`hot_event:${eventId}`);
}
