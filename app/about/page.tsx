"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Award, Users, Clock, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const values = [
  {
    icon: <Shield size={28} className="text-brand-orange" />,
    title: "Safety First",
    desc: "Every job is carried out by Gas Safe registered engineers to the highest safety standards.",
  },
  {
    icon: <Award size={28} className="text-brand-orange" />,
    title: "Quality Workmanship",
    desc: "We take pride in our work — neat, efficient installations and repairs that last.",
  },
  {
    icon: <Users size={28} className="text-brand-orange" />,
    title: "Customer Focus",
    desc: "We treat every customer's home with respect and keep communication clear throughout.",
  },
  {
    icon: <Clock size={28} className="text-brand-orange" />,
    title: "Reliability",
    desc: "We show up on time, get the job done right, and follow up to make sure you're happy.",
  },
];

const certifications = [
  "Gas Safe Registered",
  "Public Liability Insurance",
  "Professional Indemnity Insurance",
  "Worcester Bosch Approved Installer",
  "Viessmann Certified Engineer",
  "MCS Certified (Heat Pumps)",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-center">
        <Image
          src="/van.png"
          alt="LukMaTic branded van — professional heating and plumbing"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-brand-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest mb-2">
              Who We Are
            </p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white">About LukMaTic</h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">
                Hatfield&apos;s Trusted Heating &amp;{" "}
                <span className="text-brand-orange">Plumbing Specialists</span>
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-4">
                LukMaTic was founded in 2014 with a simple mission: to provide Hatfield and the
                wider Hertfordshire community with honest, reliable, and high-quality heating and
                plumbing services at fair prices.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-4">
                Over more than a decade, we&apos;ve completed hundreds of projects — from single
                boiler replacements to whole-house underfloor heating systems. Every job, big or
                small, receives the same level of care and professionalism.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
                As a local business, our reputation is everything. We rely on word of mouth and
                repeat customers, which is why we go above and beyond to ensure every customer is
                completely satisfied.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="bg-brand-orange text-white font-heading font-bold px-6 py-3 rounded text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors"
                >
                  Get a Free Quote
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[460px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/plumber-pipes.png"
                  alt="LukMaTic plumber working on pipes"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-brand-orange text-white p-5 rounded-lg shadow-xl">
                <div className="font-heading font-black text-3xl">500+</div>
                <div className="font-body text-sm font-semibold">Projects Completed</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Everything we do is guided by four core principles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-lg p-7 shadow-sm border-t-4 border-brand-orange text-center"
              >
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h3 className="font-heading font-bold text-lg text-brand-black mb-2">{v.title}</h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Engineer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[440px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/plumber-smile.png"
                  alt="Mike — LukMaTic lead engineer"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-brand-orange text-white p-5 rounded-lg shadow-xl">
                <div className="font-heading font-black text-3xl">10+</div>
                <div className="font-body text-sm font-semibold">Years Experience</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">
                The Person Behind the Work
              </p>
              <h2 className="section-title">
                Meet <span className="text-brand-orange">Mike</span>
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-4">
                Mike is the founder and lead engineer at LukMaTic. With over 10 years of hands-on
                experience in domestic and commercial heating and plumbing, he built LukMaTic on a
                simple belief: every customer deserves honest advice, quality workmanship, and a
                fair price.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-6">
                Gas Safe registered and continuously trained on the latest heating technologies,
                Mike personally oversees every job to ensure it meets the high standards LukMaTic
                is known for across Hatfield and Hertfordshire.
              </p>
              <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <Image src="/gas-safe.jpg" alt="Gas Safe Registered" width={80} height={80} className="object-contain" />
                <div>
                  <p className="font-bold text-gray-900">Gas Safe Registered</p>
                  <p className="text-sm text-gray-600">All our engineers are fully certified</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gas Safe + Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">
                Gas Safe &amp; <span className="text-brand-orange">Fully Certified</span>
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-6">
                All LukMaTic engineers are registered on the Gas Safe Register — the official list
                of businesses and engineers legally permitted to work on gas appliances in the UK.
                You can verify our registration at gassaferegister.co.uk.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
                We hold all relevant industry certifications and are committed to continuous
                professional development to stay up to date with the latest heating technologies
                and regulations.
              </p>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-3 font-body text-gray-700 text-sm">
                    <CheckCircle size={18} className="text-brand-orange shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-black rounded-xl p-10 text-white text-center">
              <div className="flex justify-center mb-6">
                <Image src="/gas-safe.jpg" alt="Gas Safe Registered" width={120} height={120} className="object-contain" />
              </div>
              <h3 className="font-heading font-black text-2xl mb-2">Gas Safe Registered</h3>
              <p className="font-body text-gray-400 text-sm mb-6 leading-relaxed">
                Every engineer working in your home is registered with the Gas Safe Register and
                legally qualified to carry out gas work safely.
              </p>
              <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
                <Image src="/gas-safe.jpg" alt="Gas Safe Registered" width={80} height={80} className="object-contain" />
                <div>
                  <p className="font-bold text-gray-900">Gas Safe Registered</p>
                  <p className="text-sm text-gray-600">All our engineers are fully certified</p>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-6 mt-6">
                <p className="font-body text-gray-400 text-xs mb-1">
                  Verify our registration at
                </p>
                <p className="font-heading font-bold text-brand-orange text-sm">
                  gassaferegister.co.uk
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4">
            Work With Hatfield&apos;s Best
          </h2>
          <p className="font-body text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Get in touch today for a free, no-obligation quote from our Gas Safe registered team.
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
