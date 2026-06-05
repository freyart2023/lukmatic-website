import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { CONTACT, SERVICES, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + tagline */}
          <div className="text-center sm:text-left">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="LukMaTic Logo"
                width={120}
                height={112}
                className="h-14 w-auto mx-auto sm:mx-0 mix-blend-screen"
                style={{ filter: "invert(1) hue-rotate(180deg)" }}
              />
            </Link>
            <p className="font-body text-gray-400 text-sm leading-relaxed mb-4">
              Hatfield&apos;s trusted heating and plumbing specialists. Gas Safe
              registered engineers delivering quality workmanship since 2014.
            </p>
            <div className="flex items-center gap-3 mt-4 bg-white/5 rounded-lg p-3 w-fit mx-auto sm:mx-0">
              <Image src="/gas-safe.png" alt="Gas Safe Register" width={80} height={80} className="object-contain rounded-xl overflow-hidden" />
              <div>
                <p className="font-heading font-bold text-white text-xs uppercase tracking-wide">Gas Safe</p>
                <p className="font-body text-gray-400 text-xs">Registered</p>
              </div>
            </div>
          </div>

          {/* Col 2: Quick links */}
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-bold text-base uppercase tracking-widest text-brand-orange mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-gray-400 text-sm hover:text-brand-orange transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="font-body text-gray-400 text-sm hover:text-brand-orange transition-colors">
                  Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-bold text-base uppercase tracking-widest text-brand-orange mb-5">
              Our Services
            </h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="font-body text-gray-400 text-sm hover:text-brand-orange transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-bold text-base uppercase tracking-widest text-brand-orange mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="flex items-start gap-3 text-gray-400 text-sm hover:text-brand-orange transition-colors group justify-center sm:justify-start"
                >
                  <Phone size={16} className="text-brand-orange mt-0.5 shrink-0" />
                  <span className="font-body">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 text-gray-400 text-sm hover:text-brand-orange transition-colors justify-center sm:justify-start"
                >
                  <Mail size={16} className="text-brand-orange mt-0.5 shrink-0" />
                  <span className="font-body break-all">{CONTACT.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm justify-center sm:justify-start">
                <MapPin size={16} className="text-brand-orange mt-0.5 shrink-0" />
                <span className="font-body">{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm justify-center sm:justify-start">
                <Clock size={16} className="text-brand-orange mt-0.5 shrink-0" />
                <div className="font-body">
                  <div>{CONTACT.hours.weekday}</div>
                  <div>{CONTACT.hours.saturday}</div>
                  <div className="text-brand-orange font-semibold mt-1">{CONTACT.hours.emergency}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-500 font-body text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} LukMaTic Ltd. All rights reserved.</p>
          <p>Hatfield, Hertfordshire | Gas Safe Registered</p>
        </div>
      </div>
    </footer>
  );
}
