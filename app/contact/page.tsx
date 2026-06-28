"use client";
import { contactListItems, formDromdownItems, faqItems } from "@/data/data";
import React, { useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react";

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            Lorem ipsum dolor sit amet consectetur. Eget ligula pharetra vulputate ac dictumst. Lacus vitae diam.
          </p>
          <p className="text-sm mt-2 text-primary-600 font-medium">More information</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="pb-20">
        <div className="container grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="title">Get in Touch</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Eget ligula pharetra vulputate ac dictumst. Lacus vitae diam.
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
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-primary-400"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                placeholder="(123) 456-7890"
                className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Service</label>
              <div className="relative">
                <select className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white appearance-none focus:ring-2 focus:ring-primary-400">
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
                placeholder="Tell us more about your visit..."
                rows={4}
                className="w-full border border-primary-200 rounded-lg px-4 py-3 bg-white resize-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <button className="primary-btn w-full">Book Appointment</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-28 bg-primary-100/20 py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="subtitle">FAQS</p>
            <h2 className="title">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.id} className="border border-primary-200 rounded-xl overflow-hidden bg-white">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold hover:bg-primary-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.title}</span>
                  <RiArrowDownSLine
                    className={`shrink-0 text-primary-600 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-5 text-gray-600">
                    {faq.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
