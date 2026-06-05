"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Phone, CheckCircle, Star, Flame, Wrench, Layers, Thermometer,
  Shield, Award, Clock, Users, ArrowUpRight,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { CONTACT, SERVICES, STATS, TESTIMONIALS, PORTFOLIO } from "@/lib/constants";
import { motionTokens } from "@/lib/motionTokens";

/* ─── Word-mask text animation ──────────────────────────── */
function SplitText({
  text,
  className,
  delay = 0,
  viewport = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  viewport?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const animProps = viewport
    ? { initial: { y: reduce ? 0 : "105%" }, whileInView: { y: 0 }, viewport: { once: true } }
    : { initial: { y: reduce ? 0 : "105%" }, animate: { y: 0 } };

  return (
    <span className={className} role="text" aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-[-.08em] mr-[0.22em]">
          <motion.span
            className="inline-block"
            {...animProps}
            transition={{ duration: 0.7, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Clip-path image reveal ────────────────────────────── */
function RevealImage({
  src, alt, fill = true, className = "", priority = false,
}: {
  src: string; alt: string; fill?: boolean; className?: string; priority?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: reduce ? "inset(0% 0 0% 0)" : "inset(100% 0 0% 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduce ? 1 : 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={src} alt={alt} fill={fill} className={`object-cover ${className}`} priority={priority} unoptimized />
      </motion.div>
    </motion.div>
  );
}

/* ─── Animated stat counter ─────────────────────────────── */
function AnimatedStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const match = value.match(/^(\d+)([+%]?)$/);
  const num = match ? parseInt(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || num === null) return;
    if (reduce) { setDisplay(num); return; }
    const start = Date.now();
    const dur = 1600;
    let raf: number;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      setDisplay(Math.round((1 - Math.pow(1 - t, 3)) * num));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, reduce]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: motionTokens.duration.slow, delay, ease: motionTokens.easing.smooth }}
        className="text-center"
      >
        <div className="font-heading font-black text-5xl md:text-6xl text-brand-orange mb-2 tabular-nums">
          {num !== null ? `${display}${suffix}` : value}
        </div>
        <div className="font-body text-gray-400 text-xs uppercase tracking-[0.18em]">{label}</div>
      </motion.div>
    </div>
  );
}

/* ─── Service icon map ───────────────────────────────────── */
const serviceIcons: Record<string, React.ReactNode> = {
  Flame: <Flame size={24} />,
  Wrench: <Wrench size={24} />,
  Layers: <Layers size={24} />,
  Thermometer: <Thermometer size={24} />,
};

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0px", reduce ? "0px" : "-80px"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);
  const [activeService, setActiveService] = useState(0);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <motion.div className="absolute inset-0" style={{ y: bgY, opacity: bgOpacity }}>
          <Image
            src="/boiler-install.png"
            alt="LukMaTic boiler installation"
            fill priority
            className="object-cover object-center scale-[1.15]"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/75" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: motionTokens.easing.smooth }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 border border-white/20 text-white/60 text-xs uppercase tracking-[0.18em] px-5 py-2.5 rounded-full">
              <Shield size={12} className="text-brand-orange" />
              Gas Safe Registered · Hatfield &amp; Hertfordshire
            </span>
          </motion.div>

          {/* Headline — word mask animation */}
          <h1 className="font-heading font-black leading-[0.95] mb-8">
            <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
              <SplitText text="Hatfield's Most" delay={0.1} />
            </span>
            <span className="block text-brand-orange text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
              <SplitText text="Trusted Heating" delay={0.3} />
            </span>
            <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
              <SplitText text="& Plumbing" delay={0.5} />
            </span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: motionTokens.easing.smooth }}
            className="font-body text-white/50 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Professional boiler installation, repairs, underfloor heating and radiator
            services across Hatfield and Hertfordshire. Available 24/7.
          </motion.p>

          {/* CTA pill buttons */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: motionTokens.easing.smooth }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <motion.div whileHover={{ scale: reduce ? 1 : 1.04 }} whileTap={{ scale: reduce ? 1 : 0.97 }} transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-orange text-white font-heading font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors">
                Get a Free Quote <ArrowUpRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: reduce ? 1 : 1.04 }} whileTap={{ scale: reduce ? 1 : 0.97 }} transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-heading font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wide hover:border-white/60 hover:bg-white/5 transition-all">
                <Phone size={16} /> {CONTACT.phone}
              </a>
            </motion.div>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6 text-white/40 text-xs uppercase tracking-[0.15em]"
          >
            {[
              { icon: <Shield size={12} />, text: "Gas Safe Registered" },
              { icon: <Clock size={12} />, text: "24/7 Emergency" },
              { icon: <Award size={12} />, text: "10+ Years" },
              { icon: <Users size={12} />, text: "500+ Projects" },
            ].map((b) => (
              <span key={b.text} className="flex items-center gap-2">
                <span className="text-brand-orange">{b.icon}</span>{b.text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30" />
        </motion.div>
      </section>

      {/* ── MARQUEE TRUST STRIP ──────────────────────────── */}
      <div className="bg-brand-orange py-3.5 overflow-hidden">
        <div className="marquee-track gap-0">
          {[...Array(2)].map((_, pass) => (
            <div key={pass} className="flex items-center gap-0 shrink-0">
              {[
                "Gas Safe Registered",
                "10+ Years Experience",
                "500+ Projects Completed",
                "24/7 Emergency Callouts",
                "Fully Insured",
                "Hatfield & Hertfordshire",
                "Free Quotes",
                "No Hidden Costs",
              ].map((item) => (
                <span key={item} className="flex items-center font-heading font-bold text-white text-xs uppercase tracking-[0.15em] whitespace-nowrap px-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 mr-8 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="bg-[#F5F5F5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
            className="mb-14"
          >
            <span className="font-body text-gray-400 text-xs uppercase tracking-[0.2em] block mb-4">What We Do</span>
            <h2 className="section-title max-w-2xl">
              Professional Heating &<br />Plumbing Services
            </h2>
          </motion.div>

          {/* Desktop: two-column interactive selector */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-start">
            {/* Left: numbered list */}
            <div>
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, x: reduce ? 0 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: motionTokens.easing.smooth }}
                  className="relative border-b border-[#E0E0E0] first:border-t cursor-pointer"
                  onMouseEnter={() => setActiveService(i)}
                  onClick={() => setActiveService(i)}
                >
                  <AnimatePresence>
                    {activeService === i && (
                      <motion.div
                        layoutId="service-bar"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-orange rounded-full"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.22 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className={`py-7 pl-6 pr-4 transition-colors duration-200 ${activeService === i ? "bg-white" : "hover:bg-white/60"}`}>
                    <div className="flex items-start gap-5">
                      <span className={`font-heading font-black text-3xl leading-none tabular-nums shrink-0 mt-0.5 transition-colors duration-300 ${activeService === i ? "text-brand-orange" : "text-[#D0D0D0]"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-heading font-black text-xl transition-colors duration-300 ${activeService === i ? "text-brand-orange" : "text-[#0A0A0A]"}`}>
                            {service.title}
                          </h3>
                          <motion.span
                            animate={{ rotate: activeService === i ? 45 : 0 }}
                            transition={{ duration: 0.22 }}
                            className={`ml-4 shrink-0 transition-colors duration-300 ${activeService === i ? "text-brand-orange" : "text-[#C0C0C0]"}`}
                          >
                            <ArrowUpRight size={18} />
                          </motion.span>
                        </div>
                        <AnimatePresence initial={false}>
                          {activeService === i && (
                            <motion.p
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 10 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: motionTokens.easing.smooth }}
                              className="font-body text-gray-500 text-sm leading-relaxed overflow-hidden"
                            >
                              {service.shortDesc}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: sticky image + detail panel */}
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A1A1A] shadow-2xl">
                <AnimatePresence mode="sync">
                  {SERVICES.map((service, i) =>
                    activeService === i ? (
                      <motion.div
                        key={service.id}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: reduce ? 1 : 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: motionTokens.easing.smooth }}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/92 via-[#0A0A0A]/25 to-transparent" />
                        <motion.div
                          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2, ease: motionTokens.easing.smooth }}
                          className="absolute bottom-0 left-0 right-0 p-8"
                        >
                          <div className="flex items-center gap-2.5 mb-4">
                            <span className="text-brand-orange">{serviceIcons[service.icon]}</span>
                            <span className="font-heading font-black text-white text-lg">{service.title}</span>
                          </div>
                          <div className="space-y-2.5 mb-6">
                            {service.features.slice(0, 3).map((f) => (
                              <div key={f} className="flex items-center gap-2.5 font-body text-white/75 text-sm">
                                <CheckCircle size={13} className="text-brand-orange shrink-0" />
                                {f}
                              </div>
                            ))}
                          </div>
                          <Link
                            href={`/services#${service.id}`}
                            className="inline-flex items-center gap-2 bg-brand-orange text-white font-heading font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wide hover:bg-orange-600 transition-colors"
                          >
                            Learn More <ArrowUpRight size={13} />
                          </Link>
                        </motion.div>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile: 2×2 image card grid */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: motionTokens.easing.smooth }}
              >
                <Link href={`/services#${service.id}`} className="block relative aspect-square rounded-xl overflow-hidden bg-[#1A1A1A]">
                  <Image src={service.image} alt={service.title} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/88 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="font-heading font-black text-[#D0D0D0]/40 text-2xl block leading-none">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-heading font-bold text-white text-sm leading-tight block mt-0.5">{service.title}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image with clip-path reveal */}
            <motion.div
              initial={{ opacity: 0, x: reduce ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative h-72 sm:h-96 md:h-[540px] rounded-2xl overflow-hidden">
                <RevealImage src="/plumber-pipes.png" alt="LukMaTic engineer at work" />
              </div>
              <motion.div
                animate={reduce ? {} : { y: [0, -7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:block absolute -bottom-6 -right-6 bg-brand-orange text-white px-6 py-4 rounded-2xl shadow-2xl"
              >
                <div className="font-heading font-black text-3xl">10+</div>
                <div className="font-body text-xs font-semibold opacity-80">Years Experience</div>
              </motion.div>
              <motion.div
                animate={reduce ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="hidden sm:block absolute top-6 -left-6 bg-white border border-gray-100 p-3 rounded-2xl shadow-xl"
              >
                <Image src="/gas-safe.png" alt="Gas Safe Register" width={56} height={56} className="object-contain" unoptimized />
              </motion.div>
            </motion.div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: reduce ? 0 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
              >
                <span className="font-body text-gray-400 text-xs uppercase tracking-[0.2em] block mb-5">Why Choose Us</span>
                <h2 className="section-title">
                  Why Hatfield Trusts
                  <span className="text-brand-orange"> LukMaTic</span>
                </h2>
                <p className="font-body text-gray-500 text-base leading-relaxed mb-8">
                  With over 10 years serving Hatfield and Hertfordshire, LukMaTic has built a
                  reputation for quality workmanship, transparent pricing, and exceptional customer
                  service.
                </p>

                <motion.ul
                  className="space-y-3 mb-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.1 } } }}
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
                        hidden: { opacity: 0, x: reduce ? 0 : -14 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.36, ease: motionTokens.easing.smooth } },
                      }}
                      className="flex items-center gap-3 font-body text-gray-600 text-sm"
                    >
                      <CheckCircle size={16} className="text-brand-orange shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="flex flex-wrap gap-3">
                  <motion.div whileHover={{ scale: reduce ? 1 : 1.04 }} whileTap={{ scale: reduce ? 1 : 0.97 }} transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}>
                    <Link href="/about" className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white font-heading font-bold px-7 py-3.5 rounded-full text-sm uppercase tracking-wide hover:bg-brand-orange transition-colors">
                      About Us <ArrowUpRight size={14} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: reduce ? 1 : 1.04 }} whileTap={{ scale: reduce ? 1 : 0.97 }} transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}>
                    <Link href="/contact" className="inline-flex items-center gap-2 border border-[#0A0A0A]/20 text-[#0A0A0A] font-heading font-bold px-7 py-3.5 rounded-full text-sm uppercase tracking-wide hover:border-brand-orange hover:text-brand-orange transition-all">
                      Get a Quote
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────── */}
      <section className="bg-[#F5F5F5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
            >
              <span className="font-body text-gray-400 text-xs uppercase tracking-[0.2em] block mb-4">Our Work</span>
              <h2 className="section-title mb-0">Recent Projects</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: motionTokens.easing.smooth }}
            >
              <motion.div whileHover={{ scale: reduce ? 1 : 1.04 }} whileTap={{ scale: reduce ? 1 : 0.97 }} transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}>
                <Link href="/portfolio" className="inline-flex items-center gap-2 border border-[#0A0A0A]/20 text-[#0A0A0A] font-heading font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wide hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] transition-all">
                  View All Projects <ArrowUpRight size={13} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={reduce ? {} : { y: -6 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: motionTokens.easing.smooth }}
                className="group relative h-64 md:h-72 rounded-2xl overflow-hidden bg-gray-200 cursor-pointer"
              >
                <Image
                  src={item.image} alt={item.title} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <span className="inline-block bg-brand-orange text-white font-heading font-bold text-[10px] px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-bold text-white text-base">{item.title}</h3>
                  <p className="font-body text-white/60 text-xs mt-0.5">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
            className="mb-16"
          >
            <span className="font-body text-white/30 text-xs uppercase tracking-[0.2em] block mb-4">Customer Reviews</span>
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              What Our Customers<br />Say About Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={reduce ? {} : { y: -5 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: motionTokens.easing.smooth }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-white/20 transition-colors duration-300"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="font-body text-white/70 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-5 border-t border-white/10">
                  <div className="font-heading font-bold text-white text-sm">{t.name}</div>
                  <div className="font-body text-white/40 text-xs mt-0.5">{t.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="bg-brand-orange py-24 md:py-32 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          >
            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-8">
              Ready to Get<br />Started?
            </h2>
            <p className="font-body text-white/70 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Get a free, no-obligation quote from Hatfield&apos;s most trusted heating and
              plumbing specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: reduce ? 1 : 1.05 }} whileTap={{ scale: reduce ? 1 : 0.96 }} transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-orange font-heading font-bold px-9 py-4 rounded-full text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors">
                  Get a Free Quote <ArrowUpRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: reduce ? 1 : 1.05 }} whileTap={{ scale: reduce ? 1 : 0.96 }} transition={{ duration: 0.14, ease: motionTokens.easing.sharp }}>
                <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-heading font-bold px-9 py-4 rounded-full text-sm uppercase tracking-wide hover:border-white hover:bg-white/10 transition-all">
                  <Phone size={16} /> {CONTACT.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
