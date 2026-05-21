import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TawkChat from "@/components/TawkChat";

export const metadata: Metadata = {
  title: {
    default: "LukMaTic | Heating & Plumbing Specialists in Hatfield",
    template: "%s | LukMaTic Heating & Plumbing",
  },
  description:
    "LukMaTic are Hatfield's trusted Gas Safe registered heating and plumbing specialists. Boiler installation, repairs, underfloor heating and radiator services across Hertfordshire.",
  keywords: [
    "heating engineer Hatfield",
    "plumber Hatfield",
    "boiler installation Hertfordshire",
    "gas safe engineer",
    "underfloor heating Hatfield",
    "emergency plumber Hatfield",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white">
        <Header />
        <main className="pt-[82px] sm:pt-[90px] lg:pt-[108px]">{children}</main>
        <Footer />
        <TawkChat />
      </body>
    </html>
  );
}
