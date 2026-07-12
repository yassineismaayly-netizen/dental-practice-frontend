"use client";
import { contactListItems, formDromdownItems, faqItems } from "@/data/data";
import React, { useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    preferred_date: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return;
    setLoading(true);
    const { error } = await supabase.from("bookings").insert([{ ...form, status: "pending" }]);
    setLoading(false);
    if (!error) {
      setSuccess(true);
      setForm({ name: "", phone: "", service: "", preferred_date: "", message: "" });
    }
  };

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16">
        <div className="container text-center max-w-2xl mx-auto">
          <p className="subtitle">Contact Us</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            Book an <span className="text-primary-600">Appointment</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Eget ligula pharetra vulputate ac dictumst.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="pb-20">
        <div className="container grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="title">Get in Touch</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Eget ligula pharetra vulputate ac dictumst.
            </p>
            <div className="space-y-4 mt-6">
              {contactListItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="size-11 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="bg-primary-100/30 border border-primary-200 rounded-2xl p-8 space-y-5">
            <h2 className="card-title">Book an Appointment</h2>

            {success && (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                ✅ Demande envoyée ! Nous vous contacterons bientôt.
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+212 6XX XXX XXX"
                  className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-primary-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Preferred Date</label>
              <input
                type="date"
                name="preferred_date"
                value={form.preferred_date}
                onChange={handleChange}
                className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-primary-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Service</label>
              <div className="relative">
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white appearance-none focus:ring-2 focus:ring-primary-400"
                >
                  <option value="">Select a service</option>
                  {formDromdownItems.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
                <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us more about your visit..."
                rows={4}
                className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white resize-none focus:ring-2 focus:ring-primary-400"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="primary-btn w-full disabled:opacity-60"
            >
              {loading ? "Sending..." : "Book Appointment"}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-28 py-20 bg-primary-100/20">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="subtitle">FAQS</p>
            <h2 className="title">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.id} className="border border-primary-200 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold hover:bg-primary-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.title}</span>
                  <RiArrowDownSLine className={`shrink-0 text-primary-600 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`} />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-5 text-gray-600">{faq.text}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}