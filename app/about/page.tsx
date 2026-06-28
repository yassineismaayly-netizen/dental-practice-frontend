import Image from "next/image";
import Link from "next/link";
import { valuesItems, teamCardItems } from "@/data/data";

export default function About() {
  return (
    <>
      {/* Banner */}
      <section className="relative pt-32">
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <Image
            src="/images/about-page-banner.png"
            alt="About Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
            <p className="text-primary-200 font-medium mb-2">About Us</p>
            <h1 className="text-3xl md:text-5xl font-bold">
              Welcome to Dentora<br />Your Trusted Partner in Dental Care
            </h1>
            <p className="mt-4 max-w-xl opacity-90">
              Lorem ipsum dolor sit amet consectetur. Eget ligula pharetra vulputate ac dictumst. Lacus vitae diam.
            </p>
            <span className="mt-4 text-sm opacity-70">Scroll down</span>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-max mx-auto">
            <Image
              src="/images/about-section-img.png"
              alt="About section"
              width={240}
              height={300}
              className="rounded-xl object-cover w-full h-full"
            />
            <div className="flex flex-col gap-4">
              <Image
                src="/images/about-section-img-2.png"
                alt="About section 2"
                width={240}
                height={140}
                className="rounded-xl object-cover w-full"
              />
              <Image
                src="/images/about-section-img-3.png"
                alt="About section 3"
                width={240}
                height={140}
                className="rounded-xl object-cover w-full"
              />
            </div>
          </div>
          {/* Content */}
          <div className="space-y-4">
            <p className="subtitle">Our Story</p>
            <h2 className="title">
              We Started with One Simple Goal: Making Our Patients Smile
            </h2>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur. Eget ligula pharetra vulputate ac dictumst. Lacus vitae diam.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Amet platea egestas aliquam habitant. Hac urna a rhoncus venenatis arcu. Felis elit posuere ornare massa pellentesque quam porta. Amet dolor nisi vehicula consectetur sed aliquet ut faucibus gravida.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="subtitle">Values</p>
            <h2 className="title">The Core Principles That Drive Everything We Do</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="border border-primary-200 rounded-xl p-6 space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="size-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="primary-btn inline-block uppercase">
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section pb-28">
        <div className="container">
          <div className="mb-14">
            <p className="subtitle">Our Team</p>
            <h2 className="title">Skilled Dentists Committed to Your Oral Health</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamCardItems.map((member) => (
              <div key={member.id} className="border border-primary-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full object-cover"
                />
                <div className="p-4 space-y-1">
                  <h3 className="card-title">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
