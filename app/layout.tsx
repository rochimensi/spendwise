'use client';

import "@/app/global.css";
import { Header } from "@/app/components/header";
import { NavLinks } from "@/app/components/nav-links";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen bg-background">
          <Header/>
          <div className="px-4 py-6">
            {children}
          </div>
          <NavLinks/>
        </div>
      </body>
    </html>
  );
}
