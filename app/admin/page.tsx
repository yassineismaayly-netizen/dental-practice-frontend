"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
	RiDashboardLine,
	RiCalendarCheckLine,
	RiLogoutBoxLine,
	RiSearchLine,
	RiCheckLine,
	RiCloseLine,
	RiDeleteBinLine,
	RiTimeLine,
	RiPhoneLine,
	RiStethoscopeLine,
} from "@remixicon/react";

type Booking = {
	id: string;
	name: string;
	phone: string;
	service: string;
	preferred_date: string;
	message: string;
	status: string;
	created_at: string;
};

const STATUS_STYLES: Record<string, string> = {
	pending: "bg-amber-100 text-amber-700",
	confirmed: "bg-emerald-100 text-emerald-700",
	cancelled: "bg-red-100 text-red-600",
};

const ADMIN_PASSWORD = "dentora2024";

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

const AVATAR_COLORS = [
	"bg-violet-500",
	"bg-blue-500",
	"bg-emerald-500",
	"bg-rose-500",
	"bg-amber-500",
	"bg-cyan-500",
];
function avatarColor(name: string) {
	return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

export default function AdminPage() {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState("all");
	const [search, setSearch] = useState("");
	const [serviceFilter, setServiceFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("");
	const [password, setPassword] = useState("");
	const [wrongPw, setWrongPw] = useState(false);
	const [newCount, setNewCount] = useState(0);
	const [authed, setAuthed] = useState(false);
	const [checking, setChecking] = useState(true);
	const isFirstFetch = useRef(true);

	// Persist login
	useEffect(() => {
		if (localStorage.getItem("dentora_admin") === "true") setAuthed(true);
		setChecking(false);
	}, []);

	const fetchBookings = async () => {
		setLoading(true);
		const { data } = await supabase
			.from("bookings")
			.select("*")
			.order("created_at", { ascending: false });
		setBookings(data || []);
		setLoading(false);
		isFirstFetch.current = false;
	};

	// Realtime + initial fetch
	useEffect(() => {
		if (!authed) return;
		fetchBookings();

		const channel = supabase
			.channel("bookings-realtime")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "bookings" },
				(payload) => {
					if (!isFirstFetch.current) {
						setBookings((prev) => [payload.new as Booking, ...prev]);
						setNewCount((prev) => prev + 1);
					}
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [authed]);

	const updateStatus = async (id: string, status: string) => {
		await supabase.from("bookings").update({ status }).eq("id", id);
		setBookings((prev) =>
			prev.map((b) => (b.id === id ? { ...b, status } : b)),
		);
	};

	const deleteBooking = async (id: string) => {
		await supabase.from("bookings").delete().eq("id", id);
		setBookings((prev) => prev.filter((b) => b.id !== id));
	};

	const exportCSV = () => {
		const headers = [
			"Name",
			"Phone",
			"Service",
			"Preferred Date",
			"Message",
			"Status",
			"Created At",
		];
		const rows = filtered.map((b) => [
			b.name,
			b.phone,
			b.service,
			b.preferred_date,
			b.message,
			b.status,
			new Date(b.created_at).toLocaleDateString("fr-MA"),
		]);
		const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleLogin = () => {
		if (password === ADMIN_PASSWORD) {
			setAuthed(true);
			localStorage.setItem("dentora_admin", "true");
			setWrongPw(false);
		} else setWrongPw(true);
	};

	const filtered = bookings
		.filter((b) => filter === "all" || b.status === filter)
		.filter((b) => serviceFilter === "all" || b.service === serviceFilter)
		.filter((b) => !dateFilter || b.preferred_date === dateFilter)
		.filter(
			(b) =>
				b.name.toLowerCase().includes(search.toLowerCase()) ||
				b.phone.includes(search),
		);

	const services = [...new Set(bookings.map((b) => b.service).filter(Boolean))];

	const counts = {
		total: bookings.length,
		pending: bookings.filter((b) => b.status === "pending").length,
		confirmed: bookings.filter((b) => b.status === "confirmed").length,
		cancelled: bookings.filter((b) => b.status === "cancelled").length,
	};

	if (checking) return null;

	if (!authed)
		return (
			<div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
				<div className="w-full max-w-sm">
					<div className="flex items-center gap-3 mb-8 justify-center">
						<div className="size-9 bg-primary-500 rounded-lg flex items-center justify-center">
							<RiStethoscopeLine size={20} className="text-white" />
						</div>
						<span className="text-white text-xl font-bold">Dentora Admin</span>
					</div>
					<div className="bg-[#1a1d27] border border-white/10 rounded-2xl p-8 space-y-4">
						<h1 className="text-white text-xl font-semibold">Sign in</h1>
						<p className="text-gray-400 text-sm">
							Enter your password to access the dashboard
						</p>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setWrongPw(false);
							}}
							onKeyDown={(e) => e.key === "Enter" && handleLogin()}
							className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
						/>
						{wrongPw && (
							<p className="text-red-400 text-sm">Incorrect password</p>
						)}
						<button
							type="button"
							onClick={handleLogin}
							className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl transition-colors"
						>
							Sign in
						</button>
					</div>
				</div>
			</div>
		);

	return (
		<div className="min-h-screen bg-[#f5f6fa] flex">
			{/* Sidebar */}
			<aside className="w-60 shrink-0 bg-[#0f1117] min-h-screen flex flex-col fixed top-0 left-0 z-40">
				<div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
					<div className="size-8 bg-primary-500 rounded-lg flex items-center justify-center">
						<RiStethoscopeLine size={18} className="text-white" />
					</div>
					<span className="text-white font-bold text-lg">Dentora</span>
				</div>
				<nav className="flex-1 px-4 py-6 space-y-1">
					<p className="text-gray-500 text-xs uppercase tracking-widest px-2 mb-3">
						General
					</p>
					<button
						type="button"
						className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary-500/10 text-primary-400 font-medium text-sm"
					>
						<RiDashboardLine size={18} /> Dashboard
					</button>
				</nav>
				<div className="px-4 py-6 border-t border-white/10">
					<button
						type="button"
						onClick={() => {
							setAuthed(false);
							localStorage.removeItem("dentora_admin");
						}}
						className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/5 text-sm transition-colors"
					>
						<RiLogoutBoxLine size={18} /> Logout
					</button>
				</div>
			</aside>

			{/* Main */}
			<main className="ml-60 flex-1 p-8">
				<div className="mb-8">
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
						{newCount > 0 && (
							<button
								type="button"
								onClick={() => setNewCount(0)}
								className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse"
							>
								+{newCount} new
							</button>
						)}
					</div>
					<p className="text-gray-500 text-sm mt-1">
						{new Date().toLocaleDateString("en-US", {
							weekday: "long",
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-4 gap-4 mb-8">
					{[
						{
							label: "Total Bookings",
							value: counts.total,
							color: "text-gray-900",
							bg: "bg-white",
						},
						{
							label: "Pending",
							value: counts.pending,
							color: "text-amber-600",
							bg: "bg-amber-50",
						},
						{
							label: "Confirmed",
							value: counts.confirmed,
							color: "text-emerald-600",
							bg: "bg-emerald-50",
						},
						{
							label: "Cancelled",
							value: counts.cancelled,
							color: "text-red-500",
							bg: "bg-red-50",
						},
					].map((s) => (
						<div
							key={s.label}
							className={`${s.bg} rounded-2xl p-5 border border-gray-100`}
						>
							<p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
							<p className="text-gray-500 text-sm mt-1">{s.label}</p>
						</div>
					))}
				</div>

				{/* Bookings */}
				<div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
					<div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 gap-4 flex-wrap">
						<div className="flex gap-2">
							{["all", "pending", "confirmed", "cancelled"].map((f) => (
								<button
									key={f}
									type="button"
									onClick={() => setFilter(f)}
									className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? "bg-primary-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}
								>
									{f}
								</button>
							))}
						</div>
						<div className="flex items-center gap-3 flex-wrap">
							<div className="relative">
								<RiSearchLine
									size={16}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								/>
								<input
									type="text"
									placeholder="Search name or phone..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 w-56"
								/>
							</div>
							<select
								value={serviceFilter}
								onChange={(e) => setServiceFilter(e.target.value)}
								className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
							>
								<option value="all">All services</option>
								{services.map((s) => (
									<option key={s} value={s}>
										{s}
									</option>
								))}
							</select>
							<input
								type="date"
								value={dateFilter}
								onChange={(e) => setDateFilter(e.target.value)}
								className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-400 text-gray-500"
							/>
							{dateFilter && (
								<button
									type="button"
									onClick={() => setDateFilter("")}
									className="text-xs text-red-400 hover:text-red-600"
								>
									Clear
								</button>
							)}
							<button
								type="button"
								onClick={exportCSV}
								className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
							>
								⬇ Export CSV
							</button>
						</div>
					</div>

					{loading ? (
						<p className="text-center text-gray-400 py-20">Loading...</p>
					) : filtered.length === 0 ? (
						<p className="text-center text-gray-400 py-20">
							No bookings found.
						</p>
					) : (
						<div className="divide-y divide-gray-50">
							{filtered.map((b) => (
								<div
									key={b.id}
									className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors"
								>
									<div
										className={`size-10 rounded-full ${avatarColor(b.name)} flex items-center justify-center text-white text-sm font-bold shrink-0`}
									>
										{getInitials(b.name)}
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-semibold text-gray-900 truncate">
											{b.name}
										</p>
										<div className="flex items-center gap-3 mt-0.5 flex-wrap">
											<span className="flex items-center gap-1 text-xs text-gray-500">
												<RiPhoneLine size={12} /> {b.phone}
											</span>
											{b.service && (
												<span className="flex items-center gap-1 text-xs text-gray-500">
													<RiStethoscopeLine size={12} /> {b.service}
												</span>
											)}
											{b.preferred_date && (
												<span className="flex items-center gap-1 text-xs text-gray-500">
													<RiCalendarCheckLine size={12} /> {b.preferred_date}
												</span>
											)}
										</div>
										{b.message && (
											<p className="text-xs text-gray-400 mt-1 truncate italic">
												"{b.message}"
											</p>
										)}
									</div>
									<div className="hidden lg:flex items-center gap-1 text-xs text-gray-400 shrink-0">
										<RiTimeLine size={12} />
										{new Date(b.created_at).toLocaleDateString("fr-MA", {
											day: "numeric",
											month: "short",
										})}
									</div>
									<span
										className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 ${STATUS_STYLES[b.status]}`}
									>
										{b.status}
									</span>
									<div className="flex items-center gap-1 shrink-0">
										<a
											href={`tel:${b.phone}`}
											className="size-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
											title="Call"
										>
											<RiPhoneLine size={15} />
										</a>
										<button
											type="button"
											onClick={() => updateStatus(b.id, "confirmed")}
											className="size-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
										>
											<RiCheckLine size={15} />
										</button>
										<button
											type="button"
											onClick={() => updateStatus(b.id, "cancelled")}
											className="size-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center justify-center transition-colors"
										>
											<RiCloseLine size={15} />
										</button>
										<button
											type="button"
											onClick={() => deleteBooking(b.id)}
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
			</main>
		</div>
	);
}
