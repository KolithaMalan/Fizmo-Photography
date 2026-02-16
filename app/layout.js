import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LayoutAnimations from "@/components/LayoutAnimations";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Fizmo Photography | Events • Graduations • Weddings • Birthdays",
  description: "Let your feelings shine through every frame. Professional photography services for Events, Graduations, Weddings, and Birthdays by Fizmo Photography.",
  keywords: "photography, wedding photography, event photography, graduation photography, birthday photography, Sri Lanka photographer",
  openGraph: {
    title: "Fizmo Photography",
    description: "Let your feelings shine through every frame",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable} suppressHydrationWarning>
        <LayoutAnimations />
        <Header />
        <main style={{ paddingTop: '73px', minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
