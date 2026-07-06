"use client";
import { useState } from "react";
import {
	RiPhoneLine,
	RiWhatsappLine,
	RiCloseLine,
	RiCustomerService2Line,
} from "@remixicon/react";

const PHONE = "212664037316"; 
const WHATSAPP_MSG =
	"Bonjour, je souhaite prendre un rendez-vous chez Dentora.";

export default function ContactFloat() {
	const [open, setOpen] = useState(false);

	return (
		<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
			{open && (
				<div className="flex flex-col items-end gap-2">
					<a
						href={`https://wa.me/${PHONE}?text=${encodeURIComponent(WHATSAPP_MSG)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-colors text-sm font-medium"
					>
						<RiWhatsappLine size={18} />
						WhatsApp
					</a>
					<a
						href={`tel:+${PHONE}`}
						className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-primary-700 transition-colors text-sm font-medium"
					>
						<RiPhoneLine size={18} />
						Appeler
					</a>
				</div>
			)}
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="size-14 bg-primary-500 hover:bg-primary-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
			>
				{open ? (
					<RiCloseLine size={24} />
				) : (
					<RiCustomerService2Line size={24} />
				)}
			</button>
		</div>
	);
}
