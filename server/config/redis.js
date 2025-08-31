import { createClient } from "redis";

let redis;

export async function initRedis() {
  redis = createClient({ url: process.env.REDIS_URL });
  redis.on("error", (err) => console.error("Redis error:", err));
  await redis.connect();
  console.log("✅ Redis connected");
  return redis;
}

export function getRedis() {
  if (!redis) throw new Error("Redis not initialized");
  return redis;
}

export async function closeRedis() {
  if (redis) await redis.quit();
}
