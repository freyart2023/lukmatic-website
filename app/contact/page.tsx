"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { CONTACT, SERVICES } from "@/lib/constants";

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Form data:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden">
        <Image src="/van.png" alt="LukMaTic Van" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-heading font-black text-5xl">Contact Us</h1>
          <p className="text-xl mt-2 text-gray-200">Get a free no-obligation quote today</p>
        </motion.div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form — spans 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="font-heading font-black text-2xl text-brand-black mb-2">
                Request a Free Quote
              </h2>
              <p className="font-body text-gray-500 text-sm mb-8">
                Fill in the form below and we&apos;ll get back to you within 2 hours.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={56} className="text-green-500 mb-4" />
                  <h3 className="font-heading font-bold text-xl text-brand-black mb-2">
                    Message Sent!
                  </h3>
                  <p className="font-body text-gray-600 text-sm mb-6">
                    Thank you for getting in touch. We&apos;ll call you back within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-brand-orange text-white font-heading font-bold px-6 py-3 rounded text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-heading font-semibold text-sm text-brand-black mb-1.5 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        {...register("name", { required: "Name is required" })}
                        className="w-full border border-gray-300 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-orange transition-colors"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="font-heading font-semibold text-sm text-brand-black mb-1.5 block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="07XXX XXXXXX"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9\s+()-]{7,20}$/,
                            message: "Please enter a valid phone number",
                          },
                        })}
                        className="w-full border border-gray-300 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-orange transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="font-heading font-semibold text-sm text-brand-black mb-1.5 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className="w-full border border-gray-300 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-heading font-semibold text-sm text-brand-black mb-1.5 block">
                      Service Required *
                    </label>
                    <select
                      {...register("service", { required: "Please select a service" })}
                      className="w-full border border-gray-300 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-orange transition-colors bg-white"
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                      <option value="emergency">Emergency Callout</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-heading font-semibold text-sm text-brand-black mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your job — property type, what's needed, any urgency..."
                      {...register("message")}
                      className="w-full border border-gray-300 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-orange text-white font-heading font-bold py-4 rounded text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send My Request"}
                  </button>

                  <p className="font-body text-gray-400 text-xs text-center">
                    We&apos;ll respond within 2 hours. No spam, ever.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Sidebar — spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Engineer photo */}
              <div className="relative h-56 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/plumber-smile.png"
                  alt="Lucas — LukMaTic lead engineer"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="font-heading font-bold text-white text-sm">Lucas</p>
                  <p className="font-body text-brand-orange text-xs font-semibold">Lead Engineer &amp; Founder</p>
                </div>
              </div>

              {/* Contact details */}
              <div className="bg-white rounded-xl shadow-md p-7">
                <h3 className="font-heading font-bold text-lg text-brand-black mb-5">
                  Contact Details
                </h3>
                <ul className="space-y-5">
                  <li>
                    <a
                      href={`tel:${CONTACT.phoneTel}`}
                      className="flex items-start gap-4 group"
                    >
                      <div className="bg-brand-orange/10 p-2.5 rounded-lg shrink-0">
                        <Phone size={20} className="text-brand-orange" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-brand-black group-hover:text-brand-orange transition-colors">
                          {CONTACT.phone}
                        </p>
                        <p className="font-body text-gray-500 text-xs">Call or text anytime</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="flex items-start gap-4 group"
                    >
                      <div className="bg-brand-orange/10 p-2.5 rounded-lg shrink-0">
                        <Mail size={20} className="text-brand-orange" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-brand-black group-hover:text-brand-orange transition-colors">
                          {CONTACT.email}
                        </p>
                        <p className="font-body text-gray-500 text-xs">We reply within 2 hours</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-brand-orange/10 p-2.5 rounded-lg shrink-0">
                      <MapPin size={20} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm text-brand-black">
                        {CONTACT.address}
                      </p>
                      <p className="font-body text-gray-500 text-xs">
                        Covering all of Hertfordshire
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Opening hours */}
              <div className="bg-white rounded-xl shadow-md p-7">
                <h3 className="font-heading font-bold text-lg text-brand-black mb-5 flex items-center gap-2">
                  <Clock size={18} className="text-brand-orange" />
                  Opening Hours
                </h3>
                <ul className="space-y-3 font-body text-sm">
                  <li className="flex justify-between text-gray-700">
                    <span>Monday – Friday</span>
                    <span className="font-semibold">7:00am – 7:00pm</span>
                  </li>
                  <li className="flex justify-between text-gray-700">
                    <span>Saturday</span>
                    <span className="font-semibold">8:00am – 5:00pm</span>
                  </li>
                  <li className="flex justify-between text-gray-700">
                    <span>Sunday</span>
                    <span className="font-semibold text-brand-orange">Emergencies Only</span>
                  </li>
                </ul>
              </div>

              {/* Emergency box */}
              <div className="bg-brand-black rounded-xl p-7 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={20} className="text-brand-orange" />
                  <h3 className="font-heading font-bold text-lg">Emergency Callout?</h3>
                </div>
                <p className="font-body text-gray-400 text-sm mb-5 leading-relaxed">
                  No heating? Burst pipe? We respond 24/7 — day or night, including weekends and
                  bank holidays.
                </p>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="flex items-center justify-center gap-2 bg-brand-orange text-white font-heading font-bold px-5 py-3 rounded text-sm uppercase tracking-wide hover:bg-orange-600 transition-colors w-full"
                >
                  <Phone size={16} />
                  Call Now — {CONTACT.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
