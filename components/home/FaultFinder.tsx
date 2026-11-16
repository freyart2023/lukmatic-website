"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";

/* Every answer is built from facts already on the site (lib/constants.ts). */
const FAULTS = [
  {
    id: "no-heat",
    label: "No heating or hot water",
    service: "Boiler repair",
    href: "/services#boiler-repair",
    facts: ["Same-day emergency repairs", "All makes and models covered", "Pressure and fault-code resolution"],
    action: "call" as const,
    note: "Emergency callouts 24/7, weekends included.",
  },
  {
    id: "old-boiler",
    label: "My boiler is old or keeps failing",
    service: "Boiler installation",
    href: "/services#boiler-installation",
    facts: ["Free home survey and recommendation", "Same-week installation available", "10-year warranty options available"],
    action: "quote" as const,
    note: "Worcester Bosch, Viessmann, Ideal and Baxi.",
  },
  {
    id: "cold-radiators",
    label: "Radiators cold in spots",
    service: "Radiator services",
    href: "/services#radiator-services",
    facts: ["Cold spot diagnosis and repair", "Power flushing", "System balancing"],
    action: "quote" as const,
    note: "TRV valves and magnetic filters fitted too.",
  },
  {
    id: "underfloor",
    label: "Planning underfloor heating",
    service: "Underfloor heating",
    href: "/services#underfloor-heating",
    facts: ["Wet and electric systems", "New builds and retrofit installations", "Heat pump compatible"],
    action: "quote" as const,
    note: "Works with all floor types.",
  },
  {
    id: "service",
    label: "Annual service or landlord certificate",
    service: "Boiler servicing",
    href: "/services#boiler-repair",
    facts: ["Annual service plans from £75", "Landlord gas safety certificates", "Boiler diagnostics and health check"],
    action: "quote" as const,
    note: "Keeps your boiler warranty valid.",
  },
];

function Tick() {
  return (
    <svg className="finder__tick" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function FaultFinder() {
  const [pick, setPick] = useState(FAULTS[0].id);
  const fault = FAULTS.find((f) => f.id === pick) ?? FAULTS[0];

  return (
    <div className="finder settle" style={{ ["--i" as string]: 3 }}>
      <fieldset className="finder__ask">
        <legend>What&apos;s the problem?</legend>
        <div className="finder__opts" role="radiogroup">
          {FAULTS.map((f) => (
            <label key={f.id} className="finder__opt">
              <input
                type="radio"
                name="fault"
                value={f.id}
                checked={pick === f.id}
                onChange={() => setPick(f.id)}
              />
              <span>{f.label}</span>
              <Tick />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="finder__answer" aria-live="polite">
        <div className="finder__card" key={fault.id}>
          <h3>{fault.service}</h3>
          <ul className="finder__facts">
            {fault.facts.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="finder__foot">
          {fault.action === "call" ? (
            <a className="btn btn--accent" href={`tel:${CONTACT.phoneTel}`}>
              Call {CONTACT.phone}
            </a>
          ) : (
            <Link className="btn btn--accent" href="/contact">
              Ask for a free quote
            </Link>
          )}
          <small>
            {fault.note} <Link className="link" href={fault.href}>About {fault.service.toLowerCase()}</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
