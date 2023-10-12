import { DateTime } from "luxon";

export const startTime = DateTime.fromISO(
  process.env.NEXT_PUBLIC_HACKATHON_START || ""
);
export const endTime = DateTime.fromISO(
  process.env.NEXT_PUBLIC_HACKATHON_END || ""
);
export const isHackathonOver = DateTime.now() > endTime;
export const isHackathonStarted = DateTime.now() > startTime;
