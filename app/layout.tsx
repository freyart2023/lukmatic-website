import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TawkChat from "@/components/TawkChat";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

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
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        {/* Marks that scripting runs, so motion only hides what a script will show. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preload" href="/fonts/epilogue-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <TawkChat />
        <WhatsAppButton />
      </body>
    </html>
  );
}
