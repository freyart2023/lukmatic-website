import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import Photo from "@/components/ui/Photo";

export const metadata = { title: "About" };

const values = [
  { title: "Safety First", desc: "Every job is carried out by Gas Safe registered engineers to the highest safety standards." },
  { title: "Quality Workmanship", desc: "We take pride in our work: neat, efficient installations and repairs that last." },
  { title: "Customer Focus", desc: "We treat every customer's home with respect and keep communication clear throughout." },
  { title: "Reliability", desc: "We show up on time, get the job done right, and follow up to make sure you're happy." },
];

const certifications = [
  "Gas Safe Registered",
  "Public Liability Insurance",
  "Professional Indemnity Insurance",
  "Worcester Bosch Approved Installer",
  "Viessmann Certified Engineer",
  "MCS Certified (Heat Pumps)",
];

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="banner">
        <div className="container">
          <div className="banner__grid">
            <h1>About LukMaTic</h1>
            <p className="lead">Hatfield&apos;s heating and plumbing specialists, founded in 2014.</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="split split--flip">
            <div className="split__media">
              <Photo src="/plumber-pipes.png" alt="LukMaTic plumber working on pipes" width={1456} height={816} ratio="45" position="40% 50%" />
              <div className="figure-inline caption">
                <strong>500+</strong>
                Projects Completed
              </div>
            </div>
            <div className="split__text">
              <h2>Hatfield&apos;s trusted heating and plumbing specialists</h2>
              <p>
                LukMaTic was founded in 2014 with a simple mission: to provide Hatfield and the wider Hertfordshire
                community with honest, reliable, and high-quality heating and plumbing services at fair prices.
              </p>
              <p>
                Over more than a decade, we&apos;ve completed hundreds of projects, from single boiler replacements to
                whole-house underfloor heating systems. Every job, big or small, receives the same level of care and
                professionalism.
              </p>
              <p>
                As a local business, our reputation is everything. We rely on word of mouth and repeat customers, which is
                why we go above and beyond to ensure every customer is completely satisfied.
              </p>
              <Link href="/contact" className="btn">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="band section">
        <div className="container">
          <div className="head head--split">
            <h2>Our Values</h2>
            <p className="lead">Everything we do is guided by four core principles.</p>
          </div>
          <div className="rows">
            {values.map((v) => (
              <div key={v.title} className="row">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mike */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <Photo src="/plumber-smile.png" alt="Mike, LukMaTic lead engineer" width={1024} height={1024} ratio="45" position="50% 20%" />
            </div>
            <div className="split__text">
              <h2>Mike, founder and lead engineer</h2>
              <p>
                Mike is the founder and lead engineer at LukMaTic. With over 10 years of hands-on experience in domestic
                and commercial heating and plumbing, he built LukMaTic on a simple belief: every customer deserves honest
                advice, quality workmanship, and a fair price.
              </p>
              <p>
                Gas Safe registered and continuously trained on the latest heating technologies, Mike personally oversees
                every job to ensure it meets the high standards LukMaTic is known for across Hatfield and Hertfordshire.
              </p>
              <div className="badge-row">
                <Image src="/gas-safe.png" alt="Gas Safe Register" width={64} height={64} />
                <div className="figure-inline">
                  <strong>10+</strong>
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="band section">
        <div className="container">
          <div className="split split--wide">
            <div className="split__text">
              <h2>Gas Safe and fully certified</h2>
              <p>
                All LukMaTic engineers are registered on the Gas Safe Register, the official list of businesses and
                engineers legally permitted to work on gas appliances in the UK. You can verify our registration at
                gassaferegister.co.uk.
              </p>
              <p>
                We hold all relevant industry certifications and are committed to continuous professional development to
                stay up to date with the latest heating technologies and regulations.
              </p>
              <div className="badge-row">
                <Image src="/gas-safe.png" alt="Gas Safe Register" width={64} height={64} />
                <p className="small">
                  Every engineer working in your home is registered with the Gas Safe Register and legally qualified to
                  carry out gas work safely.
                </p>
              </div>
            </div>
            <ul className="ticks split__media" aria-label="Certifications and insurance">
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="band--ink section">
        <div className="container">
          <div className="close">
            <div className="close__main">
              <h2>Work with Hatfield&apos;s best</h2>
              <p className="lead">Get in touch today for a free, no-obligation quote from our Gas Safe registered team.</p>
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
