import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { CONTACT, SERVICES } from "@/lib/constants";
import Photo from "@/components/ui/Photo";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      {/* Banner */}
      <section className="banner">
        <div className="container">
          <div className="banner__grid">
            <h1>Our Services</h1>
            <p className="lead">
              Our Gas Safe registered engineers cover everything from new boiler installations to emergency repairs. All
              work is guaranteed, fully insured, and carried out to the highest standard.
            </p>
          </div>
          <nav className="jump" aria-label="Services on this page">
            {SERVICES.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="btn btn--quiet">
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* One section per service; the ids are the anchors the rest of the site links to */}
      {SERVICES.map((service, i) => (
        <section key={service.id} id={service.id} className="service section">
          <div className="container">
            <div className={`split ${i % 2 === 1 ? "split--flip" : "split--wide"}`}>
              <div className="split__media">
                <Photo
                  src={service.image}
                  alt={service.title}
                  width={1536}
                  height={1024}
                  ratio={i % 2 === 1 ? "45" : "43"}
                  standIn={`A photograph of your own ${service.title.toLowerCase()} work goes here`}
                />
              </div>
              <div className="split__text">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul className="ticks">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="actions">
                  <Link href="/contact" className="btn">
                    Get a Free Quote
                  </Link>
                  <a href={`tel:${CONTACT.phoneTel}`} className="btn btn--quiet">
                    <Phone className="icon" aria-hidden="true" />
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Trust */}
      <section className="band section--s">
        <div className="container">
          <dl className="figures figures--s">
            <div>
              <dt>Gas Safe Register</dt>
              <dd>
                <Image src="/gas-safe.png" alt="Gas Safe Register" width={96} height={96} />
              </dd>
            </div>
            <div>
              <dt>Serving Hatfield &amp; Hertfordshire since 2014</dt>
              <dd>10+ years</dd>
            </div>
            <div>
              <dt>Trusted by hundreds of local homeowners</dt>
              <dd>500+ projects</dd>
            </div>
            <div>
              <dt>Emergency callouts</dt>
              <dd className="is-now">24/7</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Close */}
      <section className="band--ink section">
        <div className="container">
          <div className="close">
            <div className="close__main">
              <h2>Need a quote?</h2>
              <p className="lead">
                Contact us today for a free, no-obligation quote. We cover all areas across Hatfield and Hertfordshire.
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
