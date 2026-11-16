"use client";

import { useEffect, useState } from "react";
import { HOURS } from "@/lib/constants";
import { clock, officeStatus } from "@/lib/hours";

/** Opening hours as a schedule; today's row is marked from the UK clock. */
export default function HoursTable({ caption = "Opening hours" }: { caption?: string }) {
  const [now, setNow] = useState<{ day: number; open: boolean } | null>(null);

  useEffect(() => {
    const tick = () => {
      const s = officeStatus();
      setNow({ day: s.day, open: s.open });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <table className="hours">
      <caption>{caption}</caption>
      <tbody>
        {HOURS.map((h) => {
          const today = now?.day === h.day;
          return (
            <tr key={h.day} className={today ? "is-today" : undefined}>
              <th scope="row">
                {h.label}
                {today && <span className={`tag ${now?.open ? "tag--now" : "tag--out"}`}>{now?.open ? "Open now" : "Today"}</span>}
              </th>
              <td>{h.open === null || h.close === null ? "Emergencies only" : `${clock(h.open)} to ${clock(h.close)}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
