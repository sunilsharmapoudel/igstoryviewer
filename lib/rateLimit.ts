import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | null = null;
let warnedMissingConfig = false;

function getRatelimit(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (!warnedMissingConfig) {
      console.warn(
        "UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are not set - skipping rate limiting."
      );
      warnedMissingConfig = true;
    }
    return null;
  }

  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      prefix: "igstoryviewer",
    });
  }

  return ratelimit;
}

export async function checkRateLimit(identifier: string) {
  const limiter = getRatelimit();
  if (!limiter) {
    return { success: true } as const;
  }
  return limiter.limit(identifier);
}
