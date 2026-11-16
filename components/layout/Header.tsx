"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/constants";
import OpenStatus from "@/components/ui/OpenStatus";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu when the route changes or Escape is pressed.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__bar">
          <nav className="site-nav" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="site-logo" aria-label="LukMaTic, home">
            <Image src="/logo.png" alt="LukMaTic Logo" width={120} height={112} priority />
          </Link>

          <div className="site-header__end">
            <OpenStatus />
            <a href={`tel:${CONTACT.phoneTel}`} className="site-header__phone" aria-label={`Call ${CONTACT.phone}`}>
              <Phone className="icon" aria-hidden="true" />
              <span>{CONTACT.phone}</span>
            </a>
            <button
              type="button"
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="icon" aria-hidden="true" /> : <Menu className="icon" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu" id="mobile-menu">
            <OpenStatus />
            <nav aria-label="Main, mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="actions">
              <a href={`tel:${CONTACT.phoneTel}`} className="btn btn--quiet">
                <Phone className="icon" aria-hidden="true" />
                {CONTACT.phone}
              </a>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn">
                Get a Free Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
