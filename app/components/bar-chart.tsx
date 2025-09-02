"use client";

import { BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid, ResponsiveContainer } from "recharts";

function BarChart({data}: {data: Array<{day: string, amount: number}>}): React.ReactNode {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
        />
        <XAxis
          dataKey="day"
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
        <Bar
          dataKey="amount"
          fill="var(--chart-3)"
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
  </ResponsiveContainer>
  );
}

export { BarChart };