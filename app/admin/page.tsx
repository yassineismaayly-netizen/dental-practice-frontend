"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  const ADMIN_PASSWORD = "dentora2024";

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchBookings();
  }, [authed]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const deleteBooking = async (id: string) => {
    await supabase.from("bookings").delete().eq("id", id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm space-y-5">
          <h1 className="text-2xl font-bold text-center">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setAuthed(password === ADMIN_PASSWORD)}
            className="w-full border border-primary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-400"
          />
          <button
            type="button"
            onClick={() => setAuthed(password === ADMIN_PASSWORD)}
            className="primary-btn w-full"
          >
            Login
          </button>
          {password && password !== ADMIN_PASSWORD && (
            <p className="text-red-500 text-sm text-center">Wrong password</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Bookings Dashboard</h1>
            <p className="text-gray-500 mt-1">{bookings.length} total requests</p>
          </div>
          <button
            type="button"
            onClick={() => setAuthed(false)}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {["pending", "confirmed", "cancelled"].map((s) => (
            <div key={s} className="bg-white rounded-xl p-5 border border-gray-200 text-center">
              <p className="text-2xl font-bold">{bookings.filter((b) => b.status === s).length}</p>
              <p className="text-sm text-gray-500 capitalize mt-1">{s}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {["all", "pending", "confirmed", "cancelled"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                filter === f
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-primary-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <div key={b.id} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <p className="font-bold text-lg">{b.name}</p>
                    <p className="text-gray-600 text-sm">📞 {b.phone}</p>
                    {b.service && <p className="text-gray-600 text-sm">🦷 {b.service}</p>}
                    {b.preferred_date && <p className="text-gray-600 text-sm">📅 {b.preferred_date}</p>}
                    {b.message && <p className="text-gray-500 text-sm mt-2 italic">"{b.message}"</p>}
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(b.created_at).toLocaleDateString("fr-MA", {
                        day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[b.status]}`}>
                      {b.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateStatus(b.id, "confirmed")}
                        className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(b.id, "cancelled")}
                        className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBooking(b.id)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}