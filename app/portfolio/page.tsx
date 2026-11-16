"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone } from "lucide-react";
import { CONTACT, PORTFOLIO } from "@/lib/constants";
import Photo from "@/components/ui/Photo";

type Category = "All" | "Boiler" | "Underfloor" | "Radiators";
const filters: Category[] = ["All", "Boiler", "Underfloor", "Radiators"];

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === active);

  return (
    <>
      {/* Banner */}
      <section className="banner">
        <div className="container">
          <div className="banner__grid">
            <h1>Our Portfolio</h1>
            <p className="lead">Hundreds of successful projects across Hertfordshire.</p>
          </div>
        </div>
      </section>

      {/* Filter and grid */}
      <section className="section">
        <div className="container">
          <div className="head head--split">
            <h2>Completed Projects</h2>
            <p className="lead">Browse our recent installations and repairs across Hertfordshire.</p>
          </div>

          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button key={f} type="button" className="filter" aria-pressed={active === f} onClick={() => setActive(f)}>
                {f}
              </button>
            ))}
          </div>

          <div className="works" aria-live="polite">
            {filtered.map((item, i) => (
              <figure key={`${active}-${item.id}`} className="work" style={{ ["--i" as string]: i }}>
                <Photo
                  src={item.image}
                  alt={item.title}
                  width={1024}
                  height={768}
                  ratio="43"
                  standIn={`Photograph of the ${item.title.toLowerCase()} in ${item.location}`}
                />
                <figcaption>
                  <h3>{item.title}</h3>
                  <span className="tag tag--out">{item.category}</span>
                  <p>{item.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {filtered.length === 0 && <p className="muted">No projects found in this category yet.</p>}
        </div>
      </section>

      {/* Close */}
      <section className="band--ink section">
        <div className="container">
          <div className="close">
            <div className="close__main">
              <h2>Want a similar result?</h2>
              <p className="lead">
                Contact us today for a free survey and quote. We cover all areas across Hatfield and Hertfordshire.
              </p>
              <div className="actions">
                <Link href="/contact" className="btn btn--accent">
                  Get a Free Quote
                </Link>
                <a href={`tel:${CONTACT.phoneTel}`} className="btn btn--on-ink">
                  <Phone className="icon" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
