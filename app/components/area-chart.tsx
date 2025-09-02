"use client";

import { AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Area,
  ResponsiveContainer } from "recharts";

function AreaChart({data}: {data: Array<{month: string, income: number, expenses: number, savings: number}>}): React.ReactNode {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data}>
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
            stackId="1"
            stroke="var(--chart-2)"
            fill="var(--chart-2)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stackId="2"
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