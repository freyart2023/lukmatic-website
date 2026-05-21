"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  CheckCircle,
  Star,
  Flame,
  Wrench,
  Layers,
  Thermometer,
  Shield,
  Award,
  Clock,
  Users,
} from "lucide-react";
import { CONTACT, SERVICES, STATS, TESTIMONIALS, PORTFOLIO } from "@/lib/constants";

const serviceIcons: Record<string, React.ReactNode> = {
  Flame: <Flame size={32} className="text-brand-orange" />,
  Wrench: <Wrench size={32} className="text-brand-orange" />,
  Layers: <Layers size={32} className="text-brand-orange" />,
  Thermometer: <Thermometer size={32} className="text-brand-orange" />,
};

function AnimatedStat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center px-6 py-4"
    >
      <div className="font-heading font-black text-4xl md:text-5xl text-brand-orange mb-2">
        {value}
      </div>
      <div className="font-body text-gray-300 text-sm uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center">
        <Image
          src="/boiler-install.png"
          alt="LukMaTic boiler installation — Hatfield heating specialists"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-brand-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-body font-semibold text-sm px-4 py-2 rounded-full mb-6">
              <Shield size={14} />
              Gas Safe Registered — Hatfield &amp; Hertfordshire
            </div>
            <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Hatfield&apos;s Most Trusted{" "}
              <span className="text-brand-orange">Heating &amp; Plumbing</span>{" "}
              Specialists
            </h1>
            <p className="font-body text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
              Professional boiler installation, repairs, underfloor heating and radiator services
              across Hatfield and Hertfordshire. Available 24/7 for emergencies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/contact"
                className="bg-brand-orange text-white font-heading font-bold px-8 py-4 rounded text-base uppercase tracking-wide hover:bg-orange-600 transition-colors text-center"
              >
                Get a Free Quote
              </Link>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="flex items-center justify-center gap-3 border-2 border-white text-white font-heading font-bold px-8 py-4 rounded text-base uppercase tracking-wide hover:bg-white hover:text-brand-black transition-colors"
              >
                <Phone size={20} />
                Call {CONTACT.phone}
              </a>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                <Image src="/gas-safe.jpg" alt="Gas Safe Registered" width={60} height={60} className="object-contain" />
                <span className="font-body text-white text-sm font-semibold">Gas Safe Registered</span>
              </div>
              {[
                { icon: <Clock size={18} />, text: "24/7 Emergency" },
                { icon: <Award size={18} />, text: "10+ Years Experience" },
                { icon: <Users size={18} />, text: "500+ Happy Customers" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-white/80 font-body text-sm"
                >
                  <span className="text-brand-orange">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              From new boiler installations to emergency repairs, we cover all your heating and
              plumbing needs across Hertfordshire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/10 transition-colors" />
                </div>
                <div className="p-6">
                  <div className="mb-3">{serviceIcons[service.icon]}</div>
                  <h3 className="font-heading font-bold text-xl text-brand-black mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                  <Link
                    href={`/services#${service.id}`}
                    className="font-heading font-semibold text-brand-orange text-sm uppercase tracking-wide hover:underline"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-brand-black py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-700">
            {STATS.map((stat) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">
                Why Hatfield Trusts <span className="text-brand-orange">LukMaTic</span>
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-6">
                With over 10 years serving Hatfield and Hertfordshire, LukMaTic has built a
                reputation for quality workmanship, transparent pricing, and exceptional customer
                service. Every engineer is Gas Safe registered and fully insured.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Gas Safe registered engineers",
                  "Fully insured — public liability & indemnity",
                  "No hidden costs — upfront, honest pricing",
                  "Tidy, respectful work — your home treated with care",
                  "Aftercare and follow-up service",
                  "Local to Hatfield — fast response times",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-body text-gray-700 text-sm">
                    <CheckCircle size={18} className="text-brand-orange shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 mb-6">
                <Link
                  href="/about"
                  className="bg-brand-orange text-white font-heading font-bold px-6 py-3 rounded text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-brand-black text-brand-black font-heading font-bold px-6 py-3 rounded text-sm uppercase tracking-wide hover:bg-brand-black hover:text-white transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
              <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-xs">
                <Image src="/gas-safe.jpg" alt="Gas Safe Registered" width={60} height={60} className="object-contain" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">Gas Safe Registered</p>
                  <p className="text-xs text-gray-600">All our engineers are fully certified</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[480px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/plumber-pipes.png"
                  alt="LukMaTic plumber at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-brand-orange text-white p-5 rounded-lg shadow-xl">
                <div className="font-heading font-black text-3xl">10+</div>
                <div className="font-body text-sm font-semibold">Years Experience</div>
              </div>
              <div className="absolute top-5 -right-5 bg-white text-brand-black p-4 rounded-lg shadow-xl border-l-4 border-brand-orange">
                <div className="font-heading font-bold text-sm">Gas Safe</div>
                <div className="font-body text-xs text-gray-600">Registered</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO GALLERY ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Recent Projects</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              A selection of our completed installations and repairs across Hertfordshire.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTFOLIO.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-brand-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <span className="font-heading font-bold text-white text-lg text-center">{item.title}</span>
                  <span className="font-body text-brand-orange text-sm mt-1 font-semibold">
                    {item.category} — {item.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="bg-brand-black text-white font-heading font-bold px-8 py-3 rounded text-sm uppercase tracking-wide hover:bg-brand-orange transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Hundreds of happy customers across Hatfield and Hertfordshire.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-lg p-7 shadow-md border-t-4 border-brand-orange"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={18} className="fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="font-body text-gray-700 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="font-heading font-bold text-brand-black text-sm">{t.name}</div>
                  <div className="font-body text-gray-500 text-xs">{t.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-brand-orange py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-body text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Get a free, no-obligation quote from Hatfield&apos;s most trusted heating and plumbing
            specialists.
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
