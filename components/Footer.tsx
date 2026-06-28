import { footerListItems } from "@/data/data";
import {
	RiFacebookFill,
	RiInstagramFill,
	RiTwitterXLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="pt-16 pb-7 bg-primary-100/30 mt-26">
			<div className="container divide-y divide-gray-300">
				{/* Footer top */}
				<div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_0.7fr_0.7fr_0.7fr] gap-12 pb-16 lg:pb-20">
					{/* Newsletter */}
					<div>
						<p className="card-title">Subscribe to our Newsletter</p>
						<p className="pt-3 mb-8">
							Lorem ipsum dolor sit amet consectetur. Eget ligula pharetra
							vulputate ac dictumst. Lacus vitae diam.
						</p>
						<div className="grid gap-2 lg:grid-cols-[1fr_0.7fr]">
							<input
								type="email"
								placeholder="Enter you Email"
								className="bg-primary-100 h-full p-4 rounded-md "
							/>
							<button className="primary-btn">Subscribe</button>
						</div>
					</div>
					{/* Footer list */}
					{footerListItems.map((item) => (
						<div key={item.id}>
							<p className="text-lg font-semibold mb-1">{item.title}</p>
							<ul className="space-y-1.5">
								{item.list.map((label, index) => (
									<li key={index}>
										<Link href="#" className="hover:underline">
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				{/* Footer bottom */}
				<div className="flex items-center gap-2 justify-between flex-wrap pt-3">
					<div className="flex items-center gap-5">
						<div>
							<Image
								src="/images/logo.png"
								alt="footer logo"
								width={167}
								height={43}
							/>
						</div>

						<div className="flex items-center gap-2">
							<a href="#" className="hover:text-primary-600 transition-colors">
								<RiFacebookFill />
							</a>
							<a href="#" className="hover:text-primary-600 transition-colors">
								<RiInstagramFill />
							</a>
							<a href="#" className="hover:text-primary-600 transition-colors">
								<RiTwitterXLine />
							</a>
						</div>
					</div>
					<p>
						&copy; {new Date().getFullYear()} 2025 Dentora.All rights Reserved
					</p>
				</div>
			</div>
		</footer>
	);
}
