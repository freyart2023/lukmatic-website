import Link from "next/link";
import Image from "next/image";
import { CONTACT, SERVICES, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer band--ink">
      <div className="container">
        <div className="site-footer__cols">
          <div className="site-footer__brand">
            <Link href="/" className="logo-chip" aria-label="LukMaTic, home">
              <Image src="/logo.png" alt="LukMaTic Logo" width={120} height={112} />
            </Link>
            <p>
              Hatfield&apos;s trusted heating and plumbing specialists. Gas Safe registered engineers delivering
              quality workmanship since 2014.
            </p>
            <Image src="/gas-safe.png" alt="Gas Safe Register" width={64} height={64} />
          </div>

          <div>
            <h2>Quick links</h2>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact">Free Quote</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2>Our services</h2>
            <ul>
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.id}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Contact us</h2>
            <ul>
              <li>
                <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phone}</a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>{CONTACT.address}</li>
              <li>{CONTACT.hours.weekday}</li>
              <li>{CONTACT.hours.saturday}</li>
              <li>{CONTACT.hours.emergency}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__legal">
          <p>&copy; 2011 LukMaTic Ltd. All rights reserved.</p>
          <p>Hatfield, Hertfordshire. Gas Safe Registered.</p>
        </div>
      </div>
    </footer>
  );
}
