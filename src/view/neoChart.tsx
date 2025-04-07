import { useEffect, useState } from "react";
import { fetchNEOData } from "../utils/fetchNEOData.ts";
import { ChartData } from "../interfaces/index";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress
} from "@mui/material";
import NeoChartBars from "../components/NeoChartBars.tsx";
import NeoTable from "../components/NeoTable.tsx";
export default function NEOChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [filteredData, setFilteredData] = useState<ChartData[]>([]);
  const [orbitingBodies, setOrbitingBodies] = useState<string[]>([]);
  const [selectedBody, setSelectedBody] = useState<string>("All");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); 

  //fetching the data neo
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const chartData = await fetchNEOData();
      setData(chartData);
      setFilteredData(chartData);

      const bodies = Array.from(new Set(chartData.map((d) => d.orbiting_body)));
      console.log(bodies)
      setOrbitingBodies(["All", ...bodies]);
      setLoading(false);
    }
    getData();
  }, []);

  //changing the dropdown value and filtering the data 
  const handleFilterChange = (event: any) => {
    const body = event.target.value;
    setSelectedBody(body);
    if (body === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((d) => d.orbiting_body === body));
    }
  };

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-6 sm:p-10 space-y-6">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Button variant="contained" color="primary" onClick={() => setShowTable((prev) => !prev)}>
            {showTable ? "Hide Table" : "Show Table"}
          </Button>
         
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Orbiting Body</InputLabel>
            <Select value={selectedBody} label="Orbiting Body" onChange={handleFilterChange}>
              {orbitingBodies.map((body) => (
                <MenuItem key={body} value={body}>
                  {body}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         </div>
        {loading ? ( /*Loader*/
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress />
          </Box>
        ) : (

        !showTable ? (
          <NeoChartBars data={filteredData} /> /*chart bars component*/
        ) : (
          <NeoTable data={filteredData} />  /*table component*/
        )
        )}
      </div>
    </div>
  );
}