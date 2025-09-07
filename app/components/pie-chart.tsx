"use client";

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer } from "recharts";

function PieChart({data}: {data: Array<{name: string, value: number, color: string}>}): React.ReactNode {
  return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
  );
}

export { PieChart };