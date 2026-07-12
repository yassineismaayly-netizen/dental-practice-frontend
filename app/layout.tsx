import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFloat from "@/components/ContactFloat";

const dmSans = DM_Sans({
  variable: "--font-dmSans-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Dentora | Expert Dental Care & Cosmetic Dentistry",
  description: "Experience exceptional dental care with modern cosmetic treatments and advanced procedures designed for your comfort and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={dmSans.className}
      >
        <Header />
        <main className="min-h-screen" >{children}</main>
        <Footer />
      <ContactFloat />
      </body>
    </html>
  );
}
