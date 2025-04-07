import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
  } from "recharts";
  import { ChartData } from "../interfaces";
  
  type Props = {
    data: ChartData[];
  };
  
  export default function NeoChartBars({ data }: Props) {
    return (
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 50, right: 50, left: 60, bottom: 50 }}
          barCategoryGap="10%"
          barGap={20}
        >
          <Bar dataKey="min" fill="#3B82F6" name="Min estimated Diameter (km)" />
          <Bar dataKey="max" fill="#EF4444" name="Max estimated Diameter (km)" />
          <XAxis
            type="number"
            tickFormatter={(value) => value.toFixed(1)}
            label={{
              value: "Diameter (km)",
              position: "insideBottom",
              offset: -10,
              style: { fill: "#6B7280" },
            }}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={150}
            label={{
              value: "NEO Name",
              position: "outsideLeft",
              angle: -90,
              offset: 80,
              style: { textAnchor: "middle", fill: "#6B7280" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#F9FAFB",
              borderColor: "#E5E7EB",
              color: "#1F2937",
              fontSize: "14px",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{ marginBottom: 20 }}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }