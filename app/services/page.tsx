"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Phone, Flame, Wrench, Layers, Thermometer } from "lucide-react";
import { CONTACT, SERVICES } from "@/lib/constants";

const serviceIcons: Record<string, React.ReactNode> = {
  Flame: <Flame size={40} className="text-brand-orange" />,
  Wrench: <Wrench size={40} className="text-brand-orange" />,
  Layers: <Layers size={40} className="text-brand-orange" />,
  Thermometer: <Thermometer size={40} className="text-brand-orange" />,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden">
        <Image src="/van.png" alt="LukMaTic Van" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-heading font-black text-3xl md:text-5xl">Our Services</h1>
          <p className="text-base md:text-xl mt-2 text-gray-200">Professional heating &amp; plumbing solutions</p>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title">
            Full-Service Heating &amp; Plumbing in{" "}
            <span className="text-brand-orange">Hertfordshire</span>
          </h2>
          <p className="section-subtitle">
            Our Gas Safe registered engineers cover everything from new boiler installations to
            emergency repairs. All work is guaranteed, fully insured, and carried out to the
            highest standard.
          </p>
        </div>
      </section>

      {/* Service sections */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10 lg:py-16 border-b border-gray-200 ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="mb-4">{serviceIcons[service.icon]}</div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-brand-black mb-4">
                {service.title}
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 font-body text-gray-700 text-sm">
                    <CheckCircle size={18} className="text-brand-orange shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="bg-brand-orange text-white font-heading font-bold px-6 py-3 rounded text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors text-center"
                >
                  Get a Free Quote
                </Link>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="flex items-center justify-center gap-2 border-2 border-brand-black text-brand-black font-heading font-bold px-6 py-3 rounded text-sm uppercase tracking-wide hover:bg-brand-black hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
            <div className={`relative h-56 sm:h-72 lg:h-[440px] rounded-lg overflow-hidden shadow-xl ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust strip */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-4">
              <Image src="/gas-safe.png" alt="Gas Safe Register" width={130} height={130} className="object-contain rounded-xl overflow-hidden" />
              <div>
                <p className="font-heading font-bold text-brand-black text-lg">Gas Safe Registered</p>
                <p className="font-body text-gray-600 text-sm">All engineers fully certified &amp; insured</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-300" />
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-brand-black text-lg">10+ Years Experience</p>
              <p className="font-body text-gray-600 text-sm">Serving Hatfield &amp; Hertfordshire since 2014</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-300" />
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-brand-black text-lg">500+ Projects Completed</p>
              <p className="font-body text-gray-600 text-sm">Trusted by hundreds of local homeowners</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4">
            Need a Quote? We&apos;re Ready to Help.
          </h2>
          <p className="font-body text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Contact us today for a free, no-obligation quote. We cover all areas across Hatfield
            and Hertfordshire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-brand-orange font-heading font-bold px-8 py-4 rounded text-base uppercase tracking-wide hover:bg-gray-100 transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="flex items-center justify-center gap-3 border-2 border-white text-white font-heading font-bold px-8 py-4 rounded text-base uppercase tracking-wide hover:bg-white/10 transition-colors"
            >
              <Phone size={20} />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
