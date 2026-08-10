"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
	RiAddLine,
	RiPrinterLine,
	RiDeleteBinLine,
	RiCheckLine,
} from "@remixicon/react";

type FactureItem = { service: string; prix: number };

type Facture = {
	id: string;
	patient_name: string;
	phone: string;
	service: string;
	amount: number;
	status: string;
	items: FactureItem[];
	notes: string;
	created_at: string;
};

const SERVICES_PRIX: Record<string, number> = {
	"Cosmetic Dentistry": 1500,
	"Teeth Whitening": 800,
	"Dental Implants": 5000,
	Orthodontics: 3000,
	"Oral Hygiene": 300,
	"Dental Crowns & Bridges": 2500,
};

export default function Facturation() {
	const [factures, setFactures] = useState<Facture[]>([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [showDetail, setShowDetail] = useState<Facture | null>(null);
	const [adding, setAdding] = useState(false);

	const [form, setForm] = useState({
		patient_name: "",
		phone: "",
		notes: "",
	});

	const [items, setItems] = useState<FactureItem[]>([
		{ service: "Cosmetic Dentistry", prix: 1500 },
	]);

	const fetchFactures = async () => {
		setLoading(true);
		const { data } = await supabase
			.from("factures")
			.select("*")
			.order("created_at", { ascending: false });
		setFactures(data || []);
		setLoading(false);
	};

	useEffect(() => {
		fetchFactures();
	}, []);

	const addItem = () =>
		setItems([...items, { service: "Oral Hygiene", prix: 300 }]);
	const removeItem = (i: number) =>
		setItems(items.filter((_, idx) => idx !== i));
	const updateItem = (
		i: number,
		field: keyof FactureItem,
		value: string | number,
	) => {
		const updated = [...items];
		if (field === "prix") updated[i].prix = Number(value);
		else {
			updated[i].service = value as string;
			updated[i].prix = SERVICES_PRIX[value as string] || 0;
		}
		setItems(updated);
	};

	const total = items.reduce((sum, i) => sum + i.prix, 0);

	const createFacture = async () => {
		if (!form.patient_name || !form.phone || items.length === 0) return;
		setAdding(true);
		await supabase.from("factures").insert([
			{
				...form,
				items,
				amount: total,
				service: items.map((i) => i.service).join(", "),
				status: "unpaid",
			},
		]);
		setAdding(false);
		setShowModal(false);
		setForm({ patient_name: "", phone: "", notes: "" });
		setItems([{ service: "Cosmetic Dentistry", prix: 1500 }]);
		fetchFactures();
	};

	const markPaid = async (id: string) => {
		await supabase.from("factures").update({ status: "paid" }).eq("id", id);
		setFactures((prev) =>
			prev.map((f) => (f.id === id ? { ...f, status: "paid" } : f)),
		);
	};

	const deleteFacture = async (id: string) => {
		await supabase.from("factures").delete().eq("id", id);
		setFactures((prev) => prev.filter((f) => f.id !== id));
	};

	const printFacture = (f: Facture) => {
		const win = window.open("", "_blank");
		if (!win) return;
		win.document.write(`
      <html>
        <head>
          <title>Facture - ${f.patient_name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .logo { font-size: 24px; font-weight: bold; color: #5d4fff; }
            .title { font-size: 28px; font-weight: bold; margin-bottom: 30px; }
            .info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .label { color: #999; font-size: 12px; margin-bottom: 4px; }
            .value { font-weight: 600; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background: #f5f6fa; padding: 12px; text-align: left; font-size: 13px; }
            td { padding: 12px; border-bottom: 1px solid #f0f0f0; }
            .total-row { font-weight: bold; font-size: 16px; }
            .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; background: ${f.status === "paid" ? "#d1fae5" : "#fef3c7"}; color: ${f.status === "paid" ? "#065f46" : "#92400e"}; }
            .footer { margin-top: 60px; text-align: center; color: #999; font-size: 12px; }
            @media print { button { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🦷 Dentora</div>
            <div>
              <div class="label">Facture N°</div>
              <div class="value">${f.id.slice(0, 8).toUpperCase()}</div>
              <div class="label" style="margin-top:8px">Date</div>
              <div class="value">${new Date(f.created_at).toLocaleDateString("fr-MA")}</div>
            </div>
          </div>

          <div class="title">Facture</div>

          <div class="info">
            <div>
              <div class="label">Patient</div>
              <div class="value">${f.patient_name}</div>
              <div class="label" style="margin-top:8px">Téléphone</div>
              <div class="value">${f.phone}</div>
            </div>
            <div>
              <div class="label">Statut</div>
              <div class="status">${f.status === "paid" ? "Payé" : "En attente"}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th style="text-align:right">Prix (MAD)</th>
              </tr>
            </thead>
            <tbody>
              ${(f.items || [])
								.map(
									(item) => `
                <tr>
                  <td>${item.service}</td>
                  <td style="text-align:right">${item.prix.toLocaleString()} MAD</td>
                </tr>
              `,
								)
								.join("")}
              <tr class="total-row">
                <td>Total</td>
                <td style="text-align:right">${f.amount.toLocaleString()} MAD</td>
              </tr>
            </tbody>
          </table>

          ${f.notes ? `<p><strong>Notes :</strong> ${f.notes}</p>` : ""}

          <div class="footer">
            Dentora — Cabinet Dentaire • Merci de votre confiance
          </div>

          <script>window.print();</script>
        </body>
      </html>
    `);
		win.document.close();
	};

	const counts = {
		total: factures.length,
		paid: factures.filter((f) => f.status === "paid").length,
		unpaid: factures.filter((f) => f.status === "unpaid").length,
		totalAmount: factures.reduce((sum, f) => sum + f.amount, 0),
	};

	return (
		<div>
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Facturation</h1>
					<p className="text-gray-500 text-sm mt-1">
						Gérez les factures de vos patients
					</p>
				</div>
				<button
					type="button"
					onClick={() => setShowModal(true)}
					className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
				>
					<RiAddLine size={18} /> Nouvelle Facture
				</button>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-4 gap-4 mb-8">
				{[
					{
						label: "Total Factures",
						value: counts.total,
						color: "text-gray-900",
						bg: "bg-white",
					},
					{
						label: "Payées",
						value: counts.paid,
						color: "text-emerald-600",
						bg: "bg-emerald-50",
					},
					{
						label: "En attente",
						value: counts.unpaid,
						color: "text-amber-600",
						bg: "bg-amber-50",
					},
					{
						label: "Montant Total",
						value: `${counts.totalAmount.toLocaleString()} MAD`,
						color: "text-primary-600",
						bg: "bg-primary-50",
					},
				].map((s) => (
					<div
						key={s.label}
						className={`${s.bg} rounded-2xl p-5 border border-gray-100`}
					>
						<p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
						<p className="text-gray-500 text-sm mt-1">{s.label}</p>
					</div>
				))}
			</div>

			{/* Liste */}
			<div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
				{loading ? (
					<p className="text-center text-gray-400 py-20">Loading...</p>
				) : factures.length === 0 ? (
					<p className="text-center text-gray-400 py-20">Aucune facture.</p>
				) : (
					<div className="divide-y divide-gray-50">
						{factures.map((f) => (
							<div
								key={f.id}
								className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors"
							>
								<div className="flex-1 min-w-0">
									<p className="font-semibold text-gray-900">
										{f.patient_name}
									</p>
									<p className="text-xs text-gray-500 mt-0.5">
										{f.phone} • {f.service}
									</p>
									<p className="text-xs text-gray-400 mt-0.5">
										{new Date(f.created_at).toLocaleDateString("fr-MA")} • N°{" "}
										{f.id.slice(0, 8).toUpperCase()}
									</p>
								</div>
								<p className="font-bold text-gray-900 shrink-0">
									{f.amount.toLocaleString()} MAD
								</p>
								<span
									className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${f.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
								>
									{f.status === "paid" ? "Payé" : "En attente"}
								</span>
								<div className="flex items-center gap-1 shrink-0">
									<button
										type="button"
										onClick={() => printFacture(f)}
										title="Imprimer"
										className="size-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
									>
										<RiPrinterLine size={15} />
									</button>
									{f.status === "unpaid" && (
										<button
											type="button"
											onClick={() => markPaid(f.id)}
											title="Marquer payé"
											className="size-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
										>
											<RiCheckLine size={15} />
										</button>
									)}
									<button
										type="button"
										onClick={() => deleteFacture(f.id)}
										title="Supprimer"
										className="size-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"
									>
										<RiDeleteBinLine size={15} />
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Modal New Invoice */}
			{showModal && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
					<div className="bg-white rounded-2xl p-8 w-full max-w-lg space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-bold">Nouvelle Facture</h2>
							<button
								type="button"
								onClick={() => setShowModal(false)}
								className="text-gray-400 hover:text-gray-600 text-xl"
							>
								✕
							</button>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div className="space-y-1">
								<label className="text-sm font-medium">Nom Patient *</label>
								<input
									type="text"
									placeholder="John Doe"
									value={form.patient_name}
									onChange={(e) =>
										setForm({ ...form, patient_name: e.target.value })
									}
									className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400"
								/>
							</div>
							<div className="space-y-1">
								<label className="text-sm font-medium">Téléphone *</label>
								<input
									type="tel"
									placeholder="+212 6XX XXX XXX"
									value={form.phone}
									onChange={(e) => setForm({ ...form, phone: e.target.value })}
									className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400"
								/>
							</div>
						</div>

						{/* Items */}
						<div className="space-y-2">
							<label className="text-sm font-medium">Services</label>
							{items.map((item, i) => (
								<div key={i} className="flex gap-2 items-center">
									<select
										value={item.service}
										onChange={(e) => updateItem(i, "service", e.target.value)}
										className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
									>
										{Object.keys(SERVICES_PRIX).map((s) => (
											<option key={s} value={s}>
												{s}
											</option>
										))}
									</select>
									<input
										type="number"
										value={item.prix}
										onChange={(e) => updateItem(i, "prix", e.target.value)}
										className="w-28 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
										placeholder="Prix"
									/>
									<span className="text-xs text-gray-400">MAD</span>
									{items.length > 1 && (
										<button
											type="button"
											onClick={() => removeItem(i)}
											className="text-red-400 hover:text-red-600 text-lg"
										>
											✕
										</button>
									)}
								</div>
							))}
							<button
								type="button"
								onClick={addItem}
								className="text-sm text-primary-500 hover:text-primary-700 font-medium"
							>
								+ Ajouter un service
							</button>
						</div>

						<div className="bg-gray-50 rounded-xl px-4 py-3 flex justify-between font-bold">
							<span>Total</span>
							<span>{total.toLocaleString()} MAD</span>
						</div>

						<div className="space-y-1">
							<label className="text-sm font-medium">Notes</label>
							<textarea
								placeholder="Notes optionnelles..."
								value={form.notes}
								onChange={(e) => setForm({ ...form, notes: e.target.value })}
								rows={2}
								className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 resize-none"
							/>
						</div>

						<button
							type="button"
							onClick={createFacture}
							disabled={adding}
							className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
						>
							{adding ? "Création..." : "Créer la Facture"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
