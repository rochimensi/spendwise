'use client';

import { useState } from "react";
import { ArrowLeft, Calendar, Search } from "lucide-react";
import { Card, CardHeader } from "@/app/components/ui/card";
import { CardContent, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { SelectInput } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import Link from "next/link";

interface Expense {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    type: 'expense' | 'income';
  }

export function History({  }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
  
    // Mock expense data
    const allExpenses: Expense[] = [
      { id: '1', amount: 45.99, category: 'Food & Dining', description: 'Grocery shopping at Whole Foods', date: '2025-08-27', type: 'expense' },
      { id: '2', amount: 12.50, category: 'Transportation', description: 'Bus fare downtown', date: '2025-08-26', type: 'expense' },
      { id: '3', amount: 89.00, category: 'Utilities', description: 'Monthly electricity bill', date: '2025-08-25', type: 'expense' },
      { id: '4', amount: 2600.00, category: 'Salary', description: 'Monthly salary deposit', date: '2025-08-24', type: 'income' },
      { id: '5', amount: 67.89, category: 'Entertainment', description: 'Movie tickets and popcorn', date: '2025-08-23', type: 'expense' },
      { id: '6', amount: 23.45, category: 'Food & Dining', description: 'Coffee and pastry', date: '2025-08-22', type: 'expense' },
      { id: '7', amount: 156.78, category: 'Shopping', description: 'New workout clothes', date: '2025-08-21', type: 'expense' },
      { id: '8', amount: 34.50, category: 'Transportation', description: 'Uber ride to airport', date: '2025-08-20', type: 'expense' },
      { id: '9', amount: 500.00, category: 'Freelance', description: 'Web design project payment', date: '2025-08-19', type: 'income' },
      { id: '10', amount: 78.90, category: 'Healthcare', description: 'Pharmacy prescription', date: '2025-08-18', type: 'expense' },
    ];
  
    const categories = ['All', ...new Set(allExpenses.map(e => e.category))];
  
    // Filter expenses based on search and filters
    const filteredExpenses = allExpenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;
      const matchesType = selectedType === 'All' || expense.type === selectedType.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesType;
    });
  
    // Group expenses by date
    const groupedExpenses = filteredExpenses.reduce((groups: Record<string, Expense[]>, expense) => {
      const date = expense.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense);
      return groups;
    }, {});
  
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
  
      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    };
  
    const totalExpenses = filteredExpenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
    
    const totalIncome = filteredExpenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);

    return (
        <div className="pb-20">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/" className="flex flex-row items-center justify-center transition-all h-12 px-4 py-2 has-[>svg]:px-3 text-primary hover:bg-accent hover:text-accent-foreground size-10 rounded-md">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-semibold">Transaction History</h1>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Expenses</p>
                        <p className="text-xl font-bold text-red-600">-${totalExpenses.toFixed(2)}</p>
                    </div>
                    </div>
                </CardContent>
                </Card>
                <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Income</p>
                        <p className="text-xl font-bold text-green-600">+${totalIncome.toFixed(2)}</p>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                <div className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    </div>
                    
                    {/* Category and Type filters */}
                    <div className="grid grid-cols-2 gap-4">
                        <SelectInput value={selectedCategory} onChange={(e: any) => setSelectedCategory(e.target.value)} options={categories.map((category) => ({ value: category, label: category }))}>
                            <option value="">All Categories</option>
                        </SelectInput>

                        <SelectInput value={selectedType} onChange={(e: any) => setSelectedType(e.target.value)} options={['All', 'Expense', 'Income'].map((type) => ({ value: type, label: type }))}>
                            <option value="">All Types</option>
                        </SelectInput>
                    </div>
                </div>
                </CardContent>
            </Card>

            {/* Transaction List */}
            <div className="space-y-4">
                {Object.entries(groupedExpenses)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([date, expenses]) => (
                <Card key={date}>
                    <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{formatDate(date)}</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                    {expenses.map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{expense.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                                {expense.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                                {expense.type}
                            </span>
                            </div>
                        </div>
                        <div className={`font-semibold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                        </div>
                        </div>
                    ))}
                    </CardContent>
                </Card>
                ))}
                
                {filteredExpenses.length === 0 && (
                <Card>
                    <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">No transactions found matching your criteria.</p>
                    </CardContent>
                </Card>
                )}
            </div>
        </div>
    );
}