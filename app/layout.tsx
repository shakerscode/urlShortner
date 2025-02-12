import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Import Poppins fonts
const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Thin.woff", weight: "100" },
    { path: "./fonts/Poppins-ExtraLight.woff", weight: "200" },
    { path: "./fonts/Poppins-Light.woff", weight: "300" },
    { path: "./fonts/Poppins-Regular.woff", weight: "400" },
    { path: "./fonts/Poppins-Medium.woff", weight: "500" },
    { path: "./fonts/Poppins-SemiBold.woff", weight: "600" },
    { path: "./fonts/Poppins-Bold.woff", weight: "700" },
    { path: "./fonts/Poppins-ExtraBold.woff", weight: "800" },
    { path: "./fonts/Poppins-Black.woff", weight: "900" },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Go Link",
  description: "Your one only url shortener",
  icons: {
    icon: "/link-logo.svg",
    shortcut: "/link-logo.svg",
    apple: "/link-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <title>Monthly Stats</title>

      <head></head>
      <body className={`${poppins.variable} antialiased`}>
        <Header />
        <main className="max-w-[1064px] mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
