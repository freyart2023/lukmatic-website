"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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
import { motionTokens } from "@/lib/motionTokens";

const serviceIcons: Record<string, React.ReactNode> = {
  Flame: <Flame size={32} className="text-brand-orange" />,
  Wrench: <Wrench size={32} className="text-brand-orange" />,
  Layers: <Layers size={32} className="text-brand-orange" />,
  Thermometer: <Thermometer size={32} className="text-brand-orange" />,
};

function AnimatedStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Only animate clean "number + optional symbol" values (not "24/7" etc.)
  const match = value.match(/^(\d+)([+%]?)$/);
  const num = match ? parseInt(match[1]) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || num === null) return;
    if (reduce) { setDisplay(num); return; }
    const startTime = Date.now();
    const duration = 1600;
    let rafId: number;
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * num));
      if (progress < 1) rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, num, reduce]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 30 }}
        transition={{ duration: motionTokens.duration.slow, delay, ease: motionTokens.easing.smooth }}
        className="text-center px-6 py-4"
      >
        <div className="font-heading font-black text-4xl md:text-5xl text-brand-orange mb-2">
          {num !== null ? `${display}${suffix}` : value}
        </div>
        <div className="font-body text-gray-300 text-sm uppercase tracking-widest">{label}</div>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0px", reduce ? "0px" : "-80px"]);

  const heroContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.15 },
    },
  };
  const heroItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: motionTokens.easing.smooth } },
  };

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <Image
            src="/boiler-install.png"
            alt="LukMaTic boiler installation — Hatfield heating specialists"
            fill
            className="object-cover object-center scale-[1.15]"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-brand-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={heroItem}>
              <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-body font-semibold text-sm px-4 py-2 rounded-full mb-6">
                <Shield size={14} />
                Gas Safe Registered — Hatfield &amp; Hertfordshire
              </div>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="font-heading font-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
            >
              Hatfield&apos;s Most Trusted{" "}
              <span className="text-brand-orange">Heating &amp; Plumbing</span>{" "}
              Specialists
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="font-body text-gray-300 text-lg md:text-xl mb-8 leading-relaxed"
            >
              Professional boiler installation, repairs, underfloor heating and radiator services
              across Hatfield and Hertfordshire. Available 24/7 for emergencies.
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.div
                whileHover={{ scale: reduce ? 1 : 1.04 }}
                whileTap={{ scale: reduce ? 1 : 0.97 }}
                transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}
              >
                <Link
                  href="/contact"
                  className="bg-brand-orange text-white font-heading font-bold px-8 py-4 rounded text-base uppercase tracking-wide hover:bg-orange-600 transition-colors text-center inline-block"
                >
                  Get a Free Quote
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: reduce ? 1 : 1.04 }}
                whileTap={{ scale: reduce ? 1 : 0.97 }}
                transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}
              >
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="flex items-center justify-center gap-3 border-2 border-white text-white font-heading font-bold px-8 py-4 rounded text-base uppercase tracking-wide hover:bg-white hover:text-brand-black transition-colors"
                >
                  <Phone size={20} />
                  Call {CONTACT.phone}
                </a>
              </motion.div>
            </motion.div>

            <motion.div variants={heroItem} className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                <Image src="/gas-safe.png" alt="Gas Safe Register" width={80} height={80} className="object-contain rounded-xl overflow-hidden" />
                <span className="font-body text-white text-xs sm:text-sm font-semibold">Gas Safe Registered</span>
              </div>
              {[
                { icon: <Clock size={16} />, text: "24/7 Emergency" },
                { icon: <Award size={16} />, text: "10+ Years" },
                { icon: <Users size={16} />, text: "500+ Customers" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-1.5 text-white/80 font-body text-xs sm:text-sm">
                  <span className="text-brand-orange">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              From new boiler installations to emergency repairs, we cover all your heating and
              plumbing needs across Hertfordshire.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: reduce ? 0 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={reduce ? {} : { y: -8, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.18)" }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: motionTokens.easing.smooth }}
                className="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
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
                  <motion.div
                    whileHover={reduce ? {} : { scale: 1.12, rotate: -4 }}
                    transition={{ duration: 0.22, ease: motionTokens.easing.smooth }}
                    className="mb-3 inline-block"
                  >
                    {serviceIcons[service.icon]}
                  </motion.div>
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
            {STATS.map((stat, i) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: reduce ? 0 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
            >
              <h2 className="section-title">
                Why Hatfield Trusts <span className="text-brand-orange">LukMaTic</span>
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-6">
                With over 10 years serving Hatfield and Hertfordshire, LukMaTic has built a
                reputation for quality workmanship, transparent pricing, and exceptional customer
                service. Every engineer is Gas Safe registered and fully insured.
              </p>

              <motion.ul
                className="space-y-3 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: reduce ? 0 : 0.07,
                      delayChildren: reduce ? 0 : 0.15,
                    },
                  },
                }}
              >
                {[
                  "Gas Safe registered engineers",
                  "Fully insured — public liability & indemnity",
                  "No hidden costs — upfront, honest pricing",
                  "Tidy, respectful work — your home treated with care",
                  "Aftercare and follow-up service",
                  "Local to Hatfield — fast response times",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, x: reduce ? 0 : -16 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.36, ease: motionTokens.easing.smooth },
                      },
                    }}
                    className="flex items-center gap-3 font-body text-gray-700 text-sm"
                  >
                    <CheckCircle size={18} className="text-brand-orange shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: reduce ? 1 : 1.04 }}
                  whileTap={{ scale: reduce ? 1 : 0.97 }}
                  transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}
                >
                  <Link
                    href="/about"
                    className="bg-brand-orange text-white font-heading font-bold px-6 py-3 rounded text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors inline-block"
                  >
                    About Us
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: reduce ? 1 : 1.04 }}
                  whileTap={{ scale: reduce ? 1 : 0.97 }}
                  transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}
                >
                  <Link
                    href="/contact"
                    className="border-2 border-brand-black text-brand-black font-heading font-bold px-6 py-3 rounded text-sm uppercase tracking-wide hover:bg-brand-black hover:text-white transition-colors inline-block"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
              <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-xs">
                <Image src="/gas-safe.png" alt="Gas Safe Register" width={130} height={130} className="object-contain rounded-xl overflow-hidden" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">Gas Safe Registered</p>
                  <p className="text-xs text-gray-600">All our engineers are fully certified</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: reduce ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
              className="relative"
            >
              <div className="relative h-64 sm:h-80 md:h-[480px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/plumber-pipes.png"
                  alt="LukMaTic plumber at work"
                  fill
                  className="object-cover"
                />
              </div>
              <motion.div
                animate={reduce ? {} : { y: [0, -7, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:block absolute -bottom-5 -left-5 bg-brand-orange text-white p-4 rounded-lg shadow-xl"
              >
                <div className="font-heading font-black text-2xl">10+</div>
                <div className="font-body text-xs font-semibold">Years Experience</div>
              </motion.div>
              <motion.div
                animate={reduce ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="hidden sm:block absolute top-5 -right-5 bg-white text-brand-black p-3 rounded-lg shadow-xl border-l-4 border-brand-orange"
              >
                <div className="font-heading font-bold text-sm">Gas Safe</div>
                <div className="font-body text-xs text-gray-600">Registered</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO GALLERY ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Recent Projects</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              A selection of our completed installations and repairs across Hertfordshire.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTFOLIO.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={reduce ? {} : { scale: 1.02 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: motionTokens.easing.smooth }}
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
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
            className="text-center mt-10"
          >
            <motion.div
              whileHover={{ scale: reduce ? 1 : 1.04 }}
              whileTap={{ scale: reduce ? 1 : 0.97 }}
              transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}
              className="inline-block"
            >
              <Link
                href="/portfolio"
                className="bg-brand-black text-white font-heading font-bold px-8 py-3 rounded text-sm uppercase tracking-wide hover:bg-brand-orange transition-colors inline-block"
              >
                View All Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
            className="text-center mb-12"
          >
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Hundreds of happy customers across Hatfield and Hertfordshire.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: reduce ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={reduce ? {} : { y: -6, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.14)" }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: motionTokens.easing.smooth }}
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
      <section className="bg-brand-orange py-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          className="max-w-7xl mx-auto px-4 text-center"
        >
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-body text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Get a free, no-obligation quote from Hatfield&apos;s most trusted heating and plumbing
            specialists.
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
