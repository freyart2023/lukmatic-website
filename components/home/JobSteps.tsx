"use client";

import { useEffect, useRef } from "react";
import Photo from "@/components/ui/Photo";

const STEPS = [
  { title: "You call", text: "Phone, text or WhatsApp 07427 556589, or send the form. Emergencies at any hour." },
  { title: "Free home survey", text: "We look at the house and recommend the right boiler for it." },
  { title: "Fitted", text: "Installed by Gas Safe registered engineers and fully commissioned." },
  { title: "Registered", text: "Registered with the manufacturer for your warranty, with aftercare after." },
];

/** The steps of a boiler job. As the reader scrolls, the rail fills and the step
 *  in view lights up. Without script, or with reduced motion, every step is lit. */
export default function JobSteps() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const steps = Array.from(list.querySelectorAll<HTMLLIElement>(".job__step"));
    const rail = list.querySelector<HTMLSpanElement>(".job__rail span");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      steps.forEach((s) => s.classList.add("is-on"));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.55;
      const box = list.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (line - box.top) / box.height));
      rail?.style.setProperty("--p", p.toFixed(3));
      steps.forEach((s) => {
        const r = s.getBoundingClientRect();
        s.classList.toggle("is-on", r.top < line);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="job">
      <div className="job__pin">
        <h2>How a boiler job goes</h2>
        <Photo src="/boiler-install.png" alt="An engineer connecting the pipework under a new wall-hung boiler" width={1536} height={1024} ratio="43" position="35% 50%" />
      </div>
      <div className="job__steps" ref={listRef}>
        <span className="job__rail" aria-hidden="true">
          <span />
        </span>
        <ol>
        {STEPS.map((s) => (
          <li key={s.title} className="job__step">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
        </ol>
      </div>
    </div>
  );
}
