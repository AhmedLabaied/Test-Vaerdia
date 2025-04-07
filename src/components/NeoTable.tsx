import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  
  type Props = {
    data: any[];
  };
  
  export default function NeoTable({ data }: Props) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>NEO Name</strong></TableCell>
              <TableCell align="right"><strong>Min Diameter (km)</strong></TableCell>
              <TableCell align="right"><strong>Max Diameter (km)</strong></TableCell>
              <TableCell><strong>Orbiting Body</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((neo) => (
              <TableRow key={neo.name}>
                <TableCell>{neo.name}</TableCell>
                <TableCell align="right">{neo.min.toFixed(2)}</TableCell>
                <TableCell align="right">{neo.max.toFixed(2)}</TableCell>
                <TableCell>{neo.orbiting_body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }