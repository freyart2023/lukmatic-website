import { HOURS } from "@/lib/constants";

/** The current day and hour in the UK, wherever the visitor is. */
export function ukNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days.indexOf(get("weekday"));
  const hour = Number(get("hour")) + Number(get("minute")) / 60;
  return { day, hour };
}

export function clock(h: number) {
  const suffix = h >= 12 ? "pm" : "am";
  const n = h % 12 === 0 ? 12 : h % 12;
  return `${n}${suffix}`;
}

/** Whether the office is open now, and the sentence the status chip shows. */
export function officeStatus(date = new Date()) {
  const { day, hour } = ukNow(date);
  const today = HOURS.find((h) => h.day === day);
  if (today && today.open !== null && today.close !== null && hour >= today.open && hour < today.close) {
    return { open: true, text: `Open now, until ${clock(today.close)}`, day };
  }
  return { open: false, text: "Office closed, emergency line open", day };
}
