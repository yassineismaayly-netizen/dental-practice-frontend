import Image from "next/image";

export default function Cta() {
	return (
		<div className="flex flex-col sm:flex-row sm:gap-4">
			{/* Image */}
			<div>
				<Image
					src="/images/cta-img.png"
					alt="cta image"
					width={409}
					height={400}
					className="w-full h-full object-cover"
				/>
			</div>
			{/* Content */}
			<div className="bg-primary-600 text-white p-16 w-full">
				<h2 className="title max-w-xl">
					Get Started Today Virtual or In Person Appointments Available
				</h2>
				<button className="secondary-btn bg-white text-black/80 rounded-2xl hover:bg-white/90 transition-colors font-semibold mt-11 lg:mt-14">
					Book an Appointment
				</button>
			</div>
		</div>
	);
}
