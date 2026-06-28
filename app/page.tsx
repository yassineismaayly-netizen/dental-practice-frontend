import { blogSecItems, servicesSecItems } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import ServicesCard from "@/components/ServicesCard";
import Testimonials from "@/components/Testimonials";
import Cta from "@/components/Cta";
import BlogCard from "@/components/BlogCard";

export default function Home() {
	return (
		<>
			{/* Hero */}
			<section className="pt-32 relative">
				<div className="container grid gap-16 space-y-10 sm:space-y-0 lg:grid-cols-2 lg:items-end">
					{/* Content */}
					<div className="max-w-xl md:max-w-2xl lg:max-w-none my-auto pb-10">
						<p className="subtitle">Smile with Confidence</p>
						<h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold">
							HELPING YOU BRING BACK YOUR{" "}
							<span className="text-primary-600">HAPPY SMILE</span>
						</h1>
						<p className="py-[14px_32px]">
							Lorem ipsum dolor sit amet consectetur. Consequat pharetra
							ultrices scelerisque arcu lorem augue. Lacus justo euismod justo
							amet dictum vel sapien est. Imperdiet tempor.
						</p>
						{/* Wrapper */}
						<div className="flex flex-col md:flex-row gap-4">
							<Link href="/about" className="primary-btn">
								LEARN MORE
							</Link>
							<Link href="/services" className="secondary-btn">
								BROWSE SERVICES
							</Link>
						</div>
					</div>
					{/* Image */}
					<div className="relative max-w-max lg:mx-0 lg:ml-auto">
						<Image
							src="/images/hero-img.png"
							alt="Hero Image"
							width={727}
							height={787}
							className="relative z-20"
						/>
						<Image
							src="/images/hero-card.png"
							alt="Hero Card"
							width={229}
							height={109}
							className="absolute top-11 left-5 z-10 ring ring-primary-200 rounded-lg"
						/>
					</div>
				</div>
				{/* Bg clr */}
				<div className="bg-primary-100 absolute bottom-0 right-0 h-5/12 w-3/4 sm:h-1/2 lg:w-1/2 lg:h-full rounded-tl-xl lg:rounded-tl-none -z-10" />
				{/* Shape */}
				<Image
					src={"/images/shape-1.svg"}
					alt="shape"
					width={200}
					height={200}
					className="absolute top-28 -left-8 -z-10"
				></Image>
			</section>

			{/* Services */}
			<section className="section">
				<div className="container ">
					{/* Title */}
					<div className="flex gap-6 flex-wrap items-center justify-between">
						<div>
							<p className="subtitle">Services</p>
							<h2 className="title max-w-md">
								Advanced Dental Care for Healthier Smiles
							</h2>
						</div>
						<Link href={"/services"} className="primary-btn uppercase">
							View all
						</Link>
					</div>

					{/* Wrapper */}
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
						{servicesSecItems.map((item) => (
							<ServicesCard key={item.id} {...item} />
						))}
					</div>
				</div>
			</section>

			{/* About */}
			<section className="py-20 bg-primary-100/25 mt-20 relative">
				<div className="container grid gap-14 lg:grid-cols-2 lg:items-center">
					{/* content */}
					<div className="lg:order-1 space-y-1.5">
						<p className="subtitle">About Us</p>
						<h2 className="title">
							Serving Our Community with 15 Years of Experience
						</h2>
						<p className="mt-4 mb-8">
							Lorem ipsum dolor sit amet consectetur. Amet platea egestas
							aliquam habitant. Hac urna a rhoncus venenatis arcu. Felis elit
							posuere ornare massa pellentesque quam porta. Amet dolor nisi
							vehicula consectetur sed aliquet ut faucibus gravida. Ultricies a
							sem magna feugiat nisl mi a.
						</p>
						<div className="flex items-center mb-10 gap-6">
							<span className="rounded-full overflow-hidden ring ring-primary-500 aspect-square">
								<Image
									src={"/images/about-sm-img.png"}
									alt="sm image"
									width={80}
									height={80}
								/>
							</span>
							<div className="space-y-0.5">
								<h2 className="card-title">Dr. Smith Moore</h2>
								<p>Dentist at global Dentistry</p>
							</div>
						</div>
						<Link href={"/about"} className="primary-btn uppercase">
							LEARN MORE
						</Link>
					</div>
					{/* Image */}
					<div className="max-w-max mx-auto">
						<Image
							src={"/images/about-section-img.png"}
							alt="about section image"
							width={512}
							height={557}
						/>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="section">
				<Testimonials />
			</section>
			{/* Cta */}
			<section className="section">
				<Cta />
			</section>
			<section className="section">
				<div className="container">
					{/* Title */}
					<div>
						<p className="subtitle">Resources</p>
						<h2 className="title">Articles, Tips & Insights on Dental Care</h2>
					</div>
					{/* Wrapper */}
					<div className="grid mt-11 lg:mt-16 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{blogSecItems.map((item) => (
							<BlogCard key={item.id} {...item} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}
