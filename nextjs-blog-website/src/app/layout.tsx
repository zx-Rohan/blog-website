// app/layout.tsx
import Navbar from "@/app/components/layout/Navbar";
import "./globals.css";
import Footer from "@/app/components/layout/Footer";

export const metadata = {
  title: "My Blog",
  description: "A modern blog with Next.js 15+, Tailwind & Sanity.io",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}


