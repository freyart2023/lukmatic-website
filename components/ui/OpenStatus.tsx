"use client";

import { useEffect, useState } from "react";
import { officeStatus } from "@/lib/hours";

/** A live chip worked out from the real opening hours, in UK time. Before the
 *  clock is read it states the one thing that is always true. */
export default function OpenStatus({ className = "" }: { className?: string }) {
  const [state, setState] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const tick = () => setState(officeStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={`status ${className}`} role="status" data-open={state?.open ? "true" : "false"}>
      <span className="status__text" key={state?.text ?? "default"}>
        {state ? state.text : "Emergency line open 24/7"}
      </span>
    </p>
  );
}
