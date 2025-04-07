import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { fetchNEOData } from "../utils/fetchNEOData.ts";
import { ChartData } from "../interfaces/index";


import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";

export default function NEOChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    async function getData() {
      const chartData = await fetchNEOData();
      setData(chartData);
    }
    getData();
  }, []);

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-6 sm:p-10 space-y-6">
      <Box display="flex" justifyContent="flex-start" marginTop='1%'>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowTable((prev) => !prev)}
        >
          {showTable ? "Hide Table" : "Show Table"}
        </Button>
      </Box>
      {!showTable ?
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

        :

        <TableContainer
        component={Paper}
          sx={{
            maxHeight: 500,
            maxWidth: "100%",
            overflow: "auto",
            mt: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
           >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Neo Name</strong></TableCell>
                  <TableCell align="right"><strong>Min Diameter (km)</strong></TableCell>
                  <TableCell align="right"><strong>Max Diameter (km)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((neo) => (
                  <TableRow key={neo.name}>
                    <TableCell>{neo.name}</TableCell>
                    <TableCell align="right">{neo.min.toFixed(2)}</TableCell>
                    <TableCell align="right">{neo.max.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </div>
    </div>
  );
}