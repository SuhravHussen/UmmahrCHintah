import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/layout/root/Navigation";
import Footer from "@/components/layout/root/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarClient from "@/components/NprogressProvider";
import { Suspense } from "react";
import ScrollProgressProvider from "@/components/ScrollProgressProvider";

export const metadata: Metadata = {
  title: "ঊম্মাহর চিন্তাহ",
  description:
    "এই ওয়েবসাইটের মূল উদ্দেশ্য হলো বিভিন্ন ইসলামিক লেখকের লেখাগুলোকে এক প্ল্যাটফর্মে নিয়ে আসা, যাতে পাঠকরা সহজেই লেখাগুলো খুঁজে পেতে এবং পড়তে পারেন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <ThemeProvider attribute="class">
            <Toaster />
            <Suspense fallback={<div></div>}>
              <ProgressBarClient />
              <ScrollProgressProvider />
            </Suspense>
            <main className="max-w-5xl mx-auto p-4">
              <Navigation />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
