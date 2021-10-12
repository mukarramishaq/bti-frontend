import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { getHighestMarketPrices } from "apis";
import { CompanyType, StockType, ExchangeType } from "utils/types";
import { Box, Typography } from "@mui/material";

export type HighestPriceType = {
  id: number;
  price: number;
  company: CompanyType;
  exchange: ExchangeType;
  stockType: StockType;
};

export const HighestMarketPrices = () => {
  const {
    data: prices,
  }: { data?: HighestPriceType[] } = useQuery(`get-highest-market-prices`, () =>
    getHighestMarketPrices()
  );

  return (
    <Box
      sx={{ padding: "20px", border: "2px solid grey", borderColor: "divider" }}
    >
      <Typography
        sx={{ fontSize: 22 }}
        color="text.primary"
        gutterBottom
        fontSize="title"
      >
        Highest Market Prices
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Exchange</TableCell>
              <TableCell align="left">Company</TableCell>
              <TableCell align="left">Stock Type</TableCell>
              <TableCell align="left">Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prices?.map((price) => (
              <TableRow
                key={price.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{price.exchange.name}</TableCell>
                <TableCell align="left">{price.company.name}</TableCell>
                <TableCell align="left">{price.stockType.name}</TableCell>
                <TableCell align="left">{price.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
