"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Phone } from "lucide-react";
import { CONTACT, PORTFOLIO } from "@/lib/constants";
import { motionTokens } from "@/lib/motionTokens";

type Category = "All" | "Boiler" | "Underfloor" | "Radiators";

const filters: Category[] = ["All", "Boiler", "Underfloor", "Radiators"];

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");
  const reduce = useReducedMotion();

  const filtered =
    active === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden">
        <Image src="/van.png" alt="LukMaTic Van" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: motionTokens.easing.smooth }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-heading font-black text-3xl md:text-5xl">Our Portfolio</h1>
          <p className="text-base md:text-xl mt-2 text-gray-200">Hundreds of successful projects across Hertfordshire</p>
        </motion.div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
            className="text-center mb-10"
          >
            <h2 className="section-title">Completed Projects</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Browse our recent installations and repairs across Hertfordshire.
            </p>

            {/* Animated filter tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {filters.map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`relative font-heading font-semibold text-sm px-5 py-2.5 rounded-full uppercase tracking-wide transition-colors ${
                    active === f ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: reduce ? 1 : 1.06 }}
                  whileTap={{ scale: reduce ? 1 : 0.94 }}
                  transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}
                >
                  {active === f && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 bg-brand-orange rounded-full"
                      transition={{
                        duration: reduce ? 0.05 : 0.3,
                        ease: motionTokens.easing.smooth,
                      }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
                  whileHover={reduce ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.38, delay: i * 0.06, ease: motionTokens.easing.smooth }}
                  className="group relative h-72 rounded-lg overflow-hidden shadow-md cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block bg-brand-orange text-white font-heading font-bold text-xs px-3 py-1 rounded-full mb-2 uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-bold text-white text-lg">{item.title}</h3>
                    <p className="font-body text-gray-300 text-sm">{item.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-body text-gray-500 py-12"
            >
              No projects found in this category yet.
            </motion.p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-16">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          className="max-w-7xl mx-auto px-4 text-center"
        >
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4">
            Want a Similar Result?
          </h2>
          <p className="font-body text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Contact us today for a free survey and quote. We cover all areas across Hatfield and
            Hertfordshire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: reduce ? 1 : 1.05 }}
              whileTap={{ scale: reduce ? 1 : 0.96 }}
              transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}
            >
              <Link
                href="/contact"
                className="bg-white text-brand-orange font-heading font-bold px-8 py-4 rounded text-base uppercase tracking-wide hover:bg-gray-100 transition-colors inline-block"
              >
                Get a Free Quote
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: reduce ? 1 : 1.05 }}
              whileTap={{ scale: reduce ? 1 : 0.96 }}
              transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}
            >
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="flex items-center justify-center gap-3 border-2 border-white text-white font-heading font-bold px-8 py-4 rounded text-base uppercase tracking-wide hover:bg-white/10 transition-colors"
              >
                <Phone size={20} />
                {CONTACT.phone}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
