'use client';

import "@/app/global.css";

import { NavLinks } from "./components/nav-links";
import { Header } from "./components/header";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [expenses, setExpenses] = useState<any[]>([]);
  const [income, setIncome] = useState<any[]>([]);
  
  const handleAddExpense = (expense: any) => {
    setExpenses(prev => [expense, ...prev]);
  };
  const handleAddIncome = (income: any) => {
    setIncome(prev => [income, ...prev]);
  };

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
