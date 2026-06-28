import Image from "next/image";
import Link from "next/link";
import { servicesItems } from "@/data/data";

export default function Services() {
  return (
    <>
      {/* Banner */}
      <section className="relative pt-32">
        <div className="container py-16 text-center">
          <p className="subtitle">Our Services</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 max-w-2xl mx-auto">
            Advanced Dental Care for <span className="text-primary-600">Healthier Smiles</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Eget ligula pharetra vulputate ac dictumst. Lacus vitae diam.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-28">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesItems.map((service) => (
              <div
                key={service.id}
                className="border border-primary-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Icon */}
                <div className="bg-primary-100 py-8 flex items-center justify-center">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={120}
                    height={120}
                    className="mx-auto group-hover:scale-105 transition-transform"
                  />
                </div>
                {/* Content */}
                <div className="p-6 space-y-2">
                  <h3 className="card-title">{service.title}</h3>
                  <p className="text-gray-600">{service.text}</p>
                  <Link
                    href="/contact"
                    className="inline-block mt-2 text-primary-600 hover:text-primary-800 font-medium transition-colors"
                  >
                    Book Appointment →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-20 bg-primary-600 rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold max-w-md">
                Ready to Start Your Dental Journey?
              </h2>
              <p className="mt-3 opacity-90">
                Lorem ipsum dolor sit amet consectetur. Eget ligula pharetra vulputate ac dictumst.
              </p>
            </div>
            <Link href="/contact" className="shrink-0 bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-primary-100 transition-colors">
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
