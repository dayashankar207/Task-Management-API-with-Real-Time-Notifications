import rateLimit from "express-rate-limit";

// protect against brute-force
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many login attempts. Try again after 15mins. ",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    error: "Too many registration attempts. Try again later. ",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Task creation/update/delete limiter: prevent abuse
export const taskMutationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    error: "Too many requests to modify tasks. Try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Task read limiter: light limit to prevent scraping
export const taskReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    error: "Too many requests . Slow down a bit",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Refresh token limiter: prevent abuse
export const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    error: "Too many refresh requests . Try again later. ",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
