"use client";

import { Area, AreaChart as RechartsAreaChart, CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";

function AreaChart({data}: {data: Array<{month: string, income: number, expenses: number, savings: number}>}): React.ReactNode {
  // Ensure we have data
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
      <RechartsAreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
                fontSize: 12,
                fill: "var(--muted-foreground)",
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
                fontSize: 12,
                fill: "var(--muted-foreground)",
            }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="var(--chart-2)"
            fill="var(--chart-2)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="var(--chart-1)"
            fill="var(--chart-1)"
            fillOpacity={0.6}
          />
          <Line
            type="monotone"
            dataKey="savings"
            stroke="var(--chart-4)"
            strokeWidth={3}
          />
      </RechartsAreaChart>
  </ResponsiveContainer>
  );
}

export { AreaChart };