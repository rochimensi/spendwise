import { PlusCircle, TrendingUp, DollarSign, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import Link from 'next/link';
import { PieChart } from '@/app/components/pie-chart';
import { BarChart } from '@/app/components/bar-chart';
import { AreaChart } from '@/app/components/area-chart';
import { Badge } from "@/app/components/ui/badge";

interface Expense {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    type: 'expense' | 'income';
  }

export function Dashboard({  }) {
    // Mock data for demonstration
    const totalExpenses = 2847.50;
    const monthlyIncome = 5200.00;
    const savings = monthlyIncome - totalExpenses;
    const savingsGoal = 3000.00;

    const savingsProgress = (savings / savingsGoal) * 100;

    const recentTransactions: Expense[] = [
        { id: '1', amount: 45.99, category: 'Food', description: 'Grocery shopping', date: '2025-08-27', type: 'expense' },
        { id: '2', amount: 12.50, category: 'Transport', description: 'Bus fare', date: '2025-08-26', type: 'expense' },
        { id: '3', amount: 89.00, category: 'Utilities', description: 'Electricity bill', date: '2025-08-25', type: 'expense' },
        { id: '4', amount: 2600.00, category: 'Salary', description: 'Monthly salary', date: '2025-08-24', type: 'income' },
      ];
    
      // Chart data
      const categoryData = [
        { name: 'Food & Dining', value: 876.50, color: 'var(--chart-1)' },
        { name: 'Transportation', value: 567.20, color: 'var(--chart-2)' },
        { name: 'Entertainment', value: 423.80, color: 'var(--chart-3)' },
        { name: 'Utilities', value: 356.00, color: 'var(--chart-4)' },
        { name: 'Shopping', value: 624.00, color: 'var(--chart-5)' },
      ];
    
      const weeklySpending = [
        { day: 'Mon', amount: 45.50 },
        { day: 'Tue', amount: 23.80 },
        { day: 'Wed', amount: 67.20 },
        { day: 'Thu', amount: 89.10 },
        { day: 'Fri', amount: 156.40 },
        { day: 'Sat', amount: 234.60 },
        { day: 'Sun', amount: 78.90 },
      ];

      const monthlyTrend = [
        { month: 'Mar', income: 5200, expenses: 2900, savings: 2300 },
        { month: 'Apr', income: 5200, expenses: 3100, savings: 2100 },
        { month: 'May', income: 5400, expenses: 2800, savings: 2600 },
        { month: 'Jun', income: 5200, expenses: 3200, savings: 2000 },
        { month: 'Jul', income: 5200, expenses: 2650, savings: 2550 },
        { month: 'Aug', income: 5200, expenses: 2847, savings: 2353 },
      ];
      
    return (
        <div className="space-y-6 pb-20">
            <div className="text-center py-4">
                <h2 className="text-2xl font-bold">Welcome back! 👋</h2>
                <p className="text-muted-foreground">Here's your financial overview for August</p>
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
            
            {/* Available */}
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
                    Add Expense
                </Link>
                <Link href="/advisor" className="flex flex-row items-center justify-center h-12 border bg-background text-foreground hover:bg-accent hover:text-accent-foreground rounded-md">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    AI Insights
                </Link>
            </div>

            {/* Savings Goal */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Savings Goal
                    </CardTitle>
                    <CardDescription>Your progress towards $3,000 goal</CardDescription>
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

            {/* Spending by Category */}
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
                        <span className="text-xs text-muted-foreground">{category.name}</span>
                        <span className="text-xs font-medium ml-auto">${category.value}</span>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>

            {/* This Week's Spending */}
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

            {/* 6-Month Financial Trend */}
            <Card>
                <CardHeader>
                    <CardTitle>6-Month Financial Trend</CardTitle>
                    <CardDescription>
                        Income vs Expenses vs Savings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-48">
                        <AreaChart data={monthlyTrend} />
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

            {/* Recent Transactions */}
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
                                    className="text-xs"
                                >
                                    {transaction.category}
                                </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                {transaction.date}
                                </p>
                            </div>
                            <div
                                className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                            >
                                {transaction.type === "income" ? "+" : "-"}$
                                {transaction.amount.toFixed(2)}
                            </div>
                        </div>
                    ))}
                    {/* View All Transactions */}
                    <div className="flex justify-start">
                        <Link href="/history" className="text-sm text-primary hover:underline">View All Transactions</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}