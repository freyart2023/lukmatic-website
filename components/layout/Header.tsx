"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Emergency top bar */}
      <div className="bg-brand-orange text-white text-xs sm:text-sm font-body">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <span className="font-semibold sm:hidden">⚡ 24/7 Emergency · {CONTACT.phone}</span>
          <span className="font-semibold hidden sm:block">⚡ 24/7 Emergency Callouts — We&apos;re Always Available</span>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="font-bold hover:underline hidden sm:flex items-center gap-1"
          >
            <Phone size={14} />
            {CONTACT.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`bg-brand-black transition-shadow duration-300 ${scrolled ? "shadow-2xl" : ""}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="LukMaTic Logo" width={120} height={112} className="h-10 sm:h-12 md:h-14 w-auto" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-heading font-semibold text-sm uppercase tracking-wide transition-colors duration-200 ${
                    pathname === link.href ? "text-brand-orange" : "text-white hover:text-brand-orange"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="flex items-center gap-2 text-white font-heading font-bold text-lg hover:text-brand-orange transition-colors"
              >
                <Phone size={20} className="text-brand-orange" />
                {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="bg-brand-orange text-white font-heading font-bold px-5 py-2.5 rounded text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors"
              >
                Free Quote
              </Link>
            </div>

            {/* Mobile: call button + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="flex items-center gap-1.5 bg-brand-orange text-white font-heading font-bold px-3 py-2 rounded text-xs uppercase tracking-wide"
              >
                <Phone size={14} />
                Call
              </a>
              <button
                className="text-white p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-brand-dark border-t border-gray-800">
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-heading font-semibold text-sm uppercase tracking-wide py-3 border-b border-gray-800 ${
                    pathname === link.href ? "text-brand-orange" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="flex items-center gap-2 text-white font-heading font-bold text-base mt-4"
              >
                <Phone size={18} className="text-brand-orange" />
                {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 bg-brand-orange text-white font-heading font-bold px-5 py-3 rounded text-center text-sm uppercase tracking-wide w-full block"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
