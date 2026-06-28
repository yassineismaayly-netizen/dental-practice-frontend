import Image from "next/image";
import type { servicesCardProps } from "@/types/types";
import Link from "next/link";

export default function ServicesCard({ icon, title, text }: servicesCardProps) {
	return (
		<div className="border border-primary-200 rounded-lg overflow-hidden">
			{/* Icon */}
			<div className="bg-primary-100 py-5">
				<Image
					src={icon}
					alt={title}
					width={144}
					height={144}
					className="mx-auto"
				/>
			</div>

			{/* Content */}
			<div className="p-5 space-y-1">
				<h3 className="card-title">{title}</h3>
				<p className="mb-3.5">{text}</p>
				<Link
					href="#"
					className="text-primary-600 hover:text-primary-800 transition-colors"
				>
					Learn More
				</Link>
			</div>
		</div>
	);
}
