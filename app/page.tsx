import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { CONTACT, SERVICES, STATS, TESTIMONIALS, PORTFOLIO } from "@/lib/constants";
import FaultFinder from "@/components/home/FaultFinder";
import JobSteps from "@/components/home/JobSteps";
import HoursTable from "@/components/ui/HoursTable";
import Photo from "@/components/ui/Photo";

/* One fact per service, from its own feature list, for the row's tag. */
const SERVICE_TAG: Record<string, { text: string; now?: boolean }> = {
  "boiler-installation": { text: "Free survey" },
  "boiler-repair": { text: "Same day", now: true },
  "underfloor-heating": { text: "Wet and electric" },
  "radiator-services": { text: "Power flushing" },
};

const WHY = [
  "Gas Safe registered engineers",
  "Fully insured: public liability and indemnity",
  "No hidden costs, upfront and honest pricing",
  "Tidy, respectful work, your home treated with care",
  "Aftercare and follow-up service",
  "Local to Hatfield, fast response times",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero: the head, and the fault finder as the action ───────── */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__text">
              <h1 className="settle" style={{ ["--i" as string]: 1 }}>
                Hatfield&apos;s heating engineers, on call 24/7
              </h1>
              <p className="lead settle" style={{ ["--i" as string]: 2 }}>
                Gas Safe boilers, repairs, underfloor heating and radiators across Hertfordshire.
              </p>
              <div className="actions settle" style={{ ["--i" as string]: 2 }}>
                <Link href="/contact" className="btn">
                  Get a Free Quote
                </Link>
                <a href={`tel:${CONTACT.phoneTel}`} className="btn btn--quiet">
                  <Phone className="icon" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
            <FaultFinder />
          </div>
        </div>
      </section>

      {/* ── What we fit and fix ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="head head--split">
            <h2>What we fit and fix</h2>
            <p className="lead">All makes and models, from one radiator valve to a whole-house system.</p>
          </div>
          <div className="rows">
            {SERVICES.map((service) => (
              <Link key={service.id} id={service.id} href={`/services#${service.id}`} className="row row--link">
                <h3>{service.title}</h3>
                <p>{service.shortDesc}</p>
                <span className={`tag ${SERVICE_TAG[service.id]?.now ? "tag--now" : ""}`}>{SERVICE_TAG[service.id]?.text}</span>
                <span className="row__more">Details</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How a boiler job goes: the steps light up as you scroll ─── */}
      <section className="section--s">
        <div className="container">
          <JobSteps />
        </div>
      </section>

      {/* ── The figures ─────────────────────────────────────────────── */}
      <section className="band section--s">
        <div className="container">
          <dl className="figures">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd className={stat.value === "24/7" ? "is-now" : undefined}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Mike, and why people use us ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <Photo src="/plumber-smile.png" alt="Mike, LukMaTic lead engineer" width={1024} height={1024} ratio="45" position="50% 20%" />
            </div>
            <div className="split__text">
              <h2>Mike oversees every job</h2>
              <p className="lead">
                With over 10 years serving Hatfield and Hertfordshire, LukMaTic has built a reputation for quality
                workmanship, transparent pricing and exceptional customer service.
              </p>
              <ul className="ticks">
                {WHY.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="badge-row">
                <Image src="/gas-safe.png" alt="Gas Safe Register" width={64} height={64} />
                <Link href="/about" className="link">
                  About Mike and the team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────────────── */}
      <section className="band section">
        <div className="container">
          <div className="head">
            <h2>What customers wrote</h2>
          </div>
          <div className="quotes">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="quote">
                <span className="tag tag--now">Rated {t.rating} of 5</span>
                <blockquote>
                  <p>&ldquo;{t.text}&rdquo;</p>
                </blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  {t.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent projects ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="split split--flip">
            <div className="split__media">
              <Photo src="/underfloor.png" alt="An engineer laying underfloor heating pipe in loops across a ground floor" width={1536} height={1024} ratio="43" />
            </div>
            <div className="split__text index-wrap">
              <h2>Recent projects</h2>
              <ul className="index">
                {PORTFOLIO.map((item) => (
                  <li key={item.id}>
                    <strong>{item.title}</strong>
                    <span className="tag tag--out">{item.category}</span>
                    <span>{item.location}</span>
                  </li>
                ))}
              </ul>
              <Link href="/portfolio" className="link">
                See the portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Close: call, and the hours with today marked ─────────────── */}
      <section className="band--ink section">
        <div className="container">
          <div className="close">
            <div className="close__main">
              <h2>
                <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phone}</a>
              </h2>
              <p className="lead">Get a free, no-obligation quote from Hatfield&apos;s most trusted heating and plumbing specialists.</p>
              <div className="actions">
                <Link href="/contact" className="btn btn--accent">
                  Get a Free Quote
                </Link>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--on-ink">
                  Message on WhatsApp
                </a>
              </div>
            </div>
            <div className="close__side">
              <HoursTable caption="Opening hours, UK time. Emergency callouts 24/7." />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
