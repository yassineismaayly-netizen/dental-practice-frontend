import Image from "next/image";
import Link from "next/link";
import { blogPostPageItems, blogPostItems } from "@/data/data";

export default function Blog() {
  return (
    <>
      {/* Banner */}
      <section className="relative pt-32">
        <div className="relative h-[280px] md:h-[360px] w-full overflow-hidden">
          <Image
            src="/images/blog-page-banner.png"
            alt="Blog Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white text-center px-4">
            <p className="text-primary-200 font-medium mb-2">Resources</p>
            <h1 className="text-3xl md:text-5xl font-bold">
              Articles, Tips & Insights on Dental Care
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section">
        <div className="container">
          <p className="subtitle mb-2">Blog Posts</p>
          <h2 className="title mb-10">What to Expect During Your Visit?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPostPageItems.map((post) => (
              <div key={post.id} className="border border-primary-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                <div className="overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h3 className="font-bold text-base leading-snug">{post.title}</h3>
                  <Link href="#" className="text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="section pb-28">
        <div className="container">
          <p className="subtitle mb-2">Latest Articles</p>
          <h2 className="title mb-10">Stay Up to Date with Dental Health Tips</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPostItems.map((post) => (
              <div key={post.id} className="border border-primary-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                <div className="overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={400}
                    height={220}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h3 className="card-title">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.text}</p>
                  <Link href="#" className="inline-block mt-2 text-primary-600 hover:text-primary-800 font-medium transition-colors text-sm">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
