"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Phone } from "lucide-react";
import { CONTACT, SERVICES } from "@/lib/constants";
import HoursTable from "@/components/ui/HoursTable";
import Photo from "@/components/ui/Photo";

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
      {/* Banner */}
      <section className="banner">
        <div className="container">
          <div className="banner__grid">
            <h1>Contact Us</h1>
            <p className="lead">Get a free no-obligation quote today.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact">
            {/* Form */}
            <div className="contact__form">
              <div className="head">
                <h2>Request a Free Quote</h2>
                <p className="lead">Fill in the form below and we&apos;ll get back to you within 2 hours.</p>
              </div>

              {submitted ? (
                <div className="done" role="status">
                  <h3>Message Sent!</h3>
                  <p>Thank you for getting in touch. We&apos;ll call you back within 2 hours.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="btn btn--quiet">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
                  <div className="form__pair">
                    <div className="field">
                      <label htmlFor="f-name">Full Name *</label>
                      <input
                        id="f-name"
                        type="text"
                        autoComplete="name"
                        placeholder="John Smith"
                        aria-invalid={errors.name ? "true" : undefined}
                        aria-describedby="f-name-err"
                        {...register("name", { required: "Name is required" })}
                      />
                      <p className="field__error" id="f-name-err">{errors.name?.message}</p>
                    </div>
                    <div className="field">
                      <label htmlFor="f-phone">Phone Number *</label>
                      <input
                        id="f-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="07XXX XXXXXX"
                        aria-invalid={errors.phone ? "true" : undefined}
                        aria-describedby="f-phone-err"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9\s+()-]{7,20}$/,
                            message: "Please enter a valid phone number",
                          },
                        })}
                      />
                      <p className="field__error" id="f-phone-err">{errors.phone?.message}</p>
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="f-email">Email Address *</label>
                    <input
                      id="f-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby="f-email-err"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    <p className="field__error" id="f-email-err">{errors.email?.message}</p>
                  </div>

                  <div className="field">
                    <label htmlFor="f-service">Service Required *</label>
                    <select
                      id="f-service"
                      aria-invalid={errors.service ? "true" : undefined}
                      aria-describedby="f-service-err"
                      {...register("service", { required: "Please select a service" })}
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                      <option value="emergency">Emergency Callout</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                    <p className="field__error" id="f-service-err">{errors.service?.message}</p>
                  </div>

                  <div className="field">
                    <label htmlFor="f-message">Message</label>
                    <textarea
                      id="f-message"
                      rows={4}
                      placeholder="Tell us about your job: property type, what's needed, any urgency…"
                      {...register("message")}
                    />
                  </div>

                  <div className="actions">
                    <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting || undefined} className="btn">
                      {isSubmitting ? "Sending…" : "Send My Request"}
                    </button>
                  </div>
                  <p className="form__note">We&apos;ll respond within 2 hours. No spam, ever.</p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="contact__side">
              <figure>
                <Photo src="/plumber-smile.png" alt="Mike, LukMaTic lead engineer" width={1024} height={1024} ratio="43" position="50% 25%" />
                <figcaption className="caption">
                  <strong>Mike</strong>, Lead Engineer and Founder
                </figcaption>
              </figure>

              <ul className="details" aria-label="Contact details">
                <li>
                  <a href={`tel:${CONTACT.phoneTel}`} className="link">
                    {CONTACT.phone}
                  </a>
                  <span>Call or text anytime</span>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="link">
                    {CONTACT.email}
                  </a>
                  <span>We reply within 2 hours</span>
                </li>
                <li>
                  <strong>{CONTACT.address}</strong>
                  <span>Covering all of Hertfordshire</span>
                </li>
              </ul>

              <HoursTable />

              <div className="emergency band--ink">
                <h3>Emergency callout?</h3>
                <p>No heating? Burst pipe? We respond 24/7, day or night, including weekends and bank holidays.</p>
                <a href={`tel:${CONTACT.phoneTel}`} className="btn btn--accent">
                  <Phone className="icon" aria-hidden="true" />
                  Call {CONTACT.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
