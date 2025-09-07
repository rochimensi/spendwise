import { Dashboard } from "@/app/components/dashboard";
import Transaction from "@/app/lib/models/Transaction";
import { testConnection } from "@/app/lib/sequelize";

export default async function DashboardPage() {
  const isConnected = await testConnection();
  
  if (!isConnected) {
    return (
      <main className="flex h-screen flex-col p-6">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-red-600">Database Connection Error</h2>
          <p className="text-muted-foreground">Please check your database connection and try again.</p>
        </div>
      </main>
    );
  }

  try {
    const [
      recentTransactions,
      categoryData,
      weeklySpending,
      monthlyTrends,
      summaryStats
    ] = await Promise.all([
      Transaction.getAllTransactions(4),
      Transaction.getSpendingByCategory('10', '2024'),
      Transaction.getWeeklySpending('2024-10-21', '2024-10-27'),
      Transaction.getMonthlyTrends(10),
      Transaction.getSummaryStats('10', '2024')
    ]);

    const formattedCategoryData = categoryData.map((cat, index) => ({
      name: cat.name,
      value: cat.value,
      color: `var(--chart-${(index % 5) + 1})`
    }));

    const formattedWeeklySpending = weeklySpending.map(day => ({
      day: day.day,
      amount: day.amount
    }));

    const formattedMonthlyTrends = monthlyTrends.map(trend => ({
      month: trend.month,
      income: trend.income,
      expenses: trend.expenses,
      savings: trend.savings
    }));

    return (
      <main className="flex h-screen flex-col p-6">
        <Dashboard 
          recentTransactions={recentTransactions}
          categoryData={formattedCategoryData}
          weeklySpending={formattedWeeklySpending}
          monthlyTrends={formattedMonthlyTrends}
          summaryStats={summaryStats}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return (
      <main className="flex h-screen flex-col p-6">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-red-600">Error Loading Dashboard</h2>
          <p className="text-muted-foreground">There was an error loading your financial data. Please try again.</p>
        </div>
      </main>
    );
  }
}
