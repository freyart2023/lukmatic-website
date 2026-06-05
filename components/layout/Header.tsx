"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CONTACT, NAV_LINKS } from "@/lib/constants";
import { motionTokens } from "@/lib/motionTokens";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

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
                  className={`font-heading font-semibold text-sm uppercase tracking-wide transition-colors duration-200 relative ${
                    pathname === link.href ? "text-brand-orange" : "text-white hover:text-brand-orange"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-orange rounded-full"
                      transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                    />
                  )}
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
              <motion.div
                whileHover={{ scale: reduce ? 1 : 1.04 }}
                whileTap={{ scale: reduce ? 1 : 0.96 }}
                transition={{ duration: 0.15, ease: motionTokens.easing.sharp }}
              >
                <Link
                  href="/contact"
                  className="bg-brand-orange text-white font-heading font-bold px-5 py-2.5 rounded text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors inline-block"
                >
                  Free Quote
                </Link>
              </motion.div>
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
              <motion.button
                className="text-white p-2 relative w-10 h-10 flex items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                whileTap={{ scale: reduce ? 1 : 0.88 }}
                transition={{ duration: 0.12 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      className="absolute"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: reduce ? 0.01 : 0.16 }}
                    >
                      <X size={26} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      className="absolute"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: reduce ? 0.01 : 0.16 }}
                    >
                      <Menu size={26} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -10 }}
              transition={{ duration: reduce ? 0.1 : 0.24, ease: motionTokens.easing.smooth }}
              className="lg:hidden bg-brand-dark border-t border-gray-800"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: reduce ? 0 : -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.28,
                      delay: reduce ? 0 : i * 0.06 + 0.05,
                      ease: motionTokens.easing.smooth,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-heading font-semibold text-sm uppercase tracking-wide py-3 border-b border-gray-800 block ${
                        pathname === link.href ? "text-brand-orange" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: reduce ? 0 : -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.28, delay: reduce ? 0 : NAV_LINKS.length * 0.06 + 0.05, ease: motionTokens.easing.smooth }}
                >
                  <a
                    href={`tel:${CONTACT.phoneTel}`}
                    className="flex items-center gap-2 text-white font-heading font-bold text-base mt-4"
                  >
                    <Phone size={18} className="text-brand-orange" />
                    {CONTACT.phone}
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: reduce ? 0 : -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.28, delay: reduce ? 0 : (NAV_LINKS.length + 1) * 0.06 + 0.05, ease: motionTokens.easing.smooth }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-3 bg-brand-orange text-white font-heading font-bold px-5 py-3 rounded text-center text-sm uppercase tracking-wide w-full block"
                  >
                    Get a Free Quote
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
