'use client';

import Link from 'next/link';
import { DollarSign, PlusCircle, Target, TrendingUp } from "lucide-react";
import { AreaChart } from '@/app/components/area-chart';
import { BarChart } from '@/app/components/bar-chart';
import { PieChart } from '@/app/components/pie-chart';
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import Transaction from '@/app/lib/models/Transaction';

interface DashboardProps {
  recentTransactions: Transaction[];
  categoryData: Array<{name: string, value: number, color: string}>;
  weeklySpending: Array<{day: string, amount: number}>;
  monthlyTrends: Array<{month: string, income: number, expenses: number, savings: number}>;
  summaryStats: {
    totalExpenses: number;
    totalIncome: number;
    savings: number;
    transactionCount: number;
  };
}

export function Dashboard({ 
  recentTransactions, 
  categoryData, 
  weeklySpending, 
  monthlyTrends, 
  summaryStats 
}: DashboardProps) {
    const { totalExpenses, savings } = summaryStats;
    const savingsGoal = 5000.00; // TODO: Make this dynamic
    const savingsProgress = (savings / savingsGoal) * 100;

    return (
        <div className="space-y-6 pb-20">
            <div className="text-center py-4">
                <h2 className="text-2xl font-bold">Welcome back! 👋</h2>
                <p className="text-muted-foreground">Here's your financial overview for October 2024</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="pb-1">
                        <CardTitle className="text-sm">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">${totalExpenses.toFixed(2)}</span>
                        <TrendingUp className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Expenses</p>
                    </CardContent>
                </Card>
            
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Available</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">${savings.toFixed(2)}</span>
                        <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Remaining</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <Link href="/add" className="flex flex-row items-center justify-center h-12 px-4 py-2 has-[>svg]:px-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Transaction
                </Link>
                <Link href="/advisor" className="flex flex-row items-center justify-center h-12 border bg-background text-foreground hover:bg-accent hover:text-accent-foreground rounded-md">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    AI Insights
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Savings Goal
                    </CardTitle>
                    <CardDescription>Your progress towards $5,000 goal</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>${savings.toFixed(2)} / ${savingsGoal.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                    <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(savingsProgress, 100)}%` }}
                    />
                    </div>
                    <p className="text-sm text-muted-foreground">
                    {savingsProgress >= 100 
                        ? "🎉 Goal achieved! Consider setting a new target."
                        : `${(100 - savingsProgress).toFixed(1)}% remaining to reach your goal`
                    }
                    </p>
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Where your money goes this month</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="h-48">
                    <PieChart data={categoryData} />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                        />
                        <span className="text-xs text-muted-foreground capitalize">{category.name}</span>
                        <span className="text-xs font-medium ml-auto">${category.value.toFixed(2)}</span>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>This Week's Spending</CardTitle>
                    <CardDescription>
                        Daily spending breakdown
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-48">
                        <BarChart data={weeklySpending} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>10-Month Financial Trend</CardTitle>
                    <CardDescription>
                        Income vs Expenses vs Savings (Jan-Oct 2024)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-48">
                        <AreaChart data={monthlyTrends} />
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-2" />
                        <span className="text-xs text-muted-foreground">
                            Income
                        </span>
                        </div>
                        <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-1" />
                        <span className="text-xs text-muted-foreground">
                            Expenses
                        </span>
                        </div>
                        <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-4" />
                        <span className="text-xs text-muted-foreground">
                            Savings
                        </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                        Your latest financial activity
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentTransactions.map((transaction) => (
                        <div
                        key={transaction.id}
                        className="flex items-center justify-between"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                <p className="font-medium">
                                    {transaction.description}
                                </p>
                                <Badge
                                    variant="secondary"
                                    className="text-xs capitalize"
                                >
                                    {transaction.category}
                                </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                {transaction.date.toString()}
                                </p>
                            </div>
                            <div
                                className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                            >
                                {transaction.type === "income" ? "+" : "-"}$
                                {Math.abs(transaction.amount).toFixed(2)}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-start">
                        <Link href="/history" className="text-sm text-primary hover:underline">View All Transactions</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}