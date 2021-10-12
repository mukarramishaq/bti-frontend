import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getExchanges, getExchangePrices } from "apis";
import { useQuery } from "react-query";
import { ExchangeType, PriceType } from "utils/types";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import formatDate from "date-fns/format";
export const ExchangesOverview = () => {
  const { data: exchanges }: { data?: ExchangeType[] } = useQuery(
    `get-exchanges`,
    getExchanges
  );
  const exchangeIds = exchanges?.map((e) => e.id) || [];
  const [selectedExchange, setSelectedExchange] = useState<number>(0);
  const { data: prices }: { data?: PriceType[] } = useQuery(
    [`get-exchange-prices`, selectedExchange],
    () => getExchangePrices(selectedExchange)
  );
  /**
   * if no or wrong exchange is selected
   * then fall back to first exchange
   */
  useEffect(() => {
    if (!exchangeIds.includes(selectedExchange) && exchangeIds.length > 0) {
      setSelectedExchange(exchangeIds[0]);
    }
  }, [selectedExchange, exchangeIds]);

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
        Market Overview
      </Typography>
      <TableContainer component={Paper}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedExchange}
          label="Exchange"
          onChange={(e) => setSelectedExchange(+e.target.value)}
        >
          {exchanges?.map((exchange) => {
            return (
              <MenuItem value={exchange.id} key={exchange.id}>
                {exchange.name}
              </MenuItem>
            );
          })}
        </Select>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Company</TableCell>
              <TableCell align="left">Stock Type</TableCell>
              <TableCell align="left">Date Time</TableCell>
              <TableCell align="left">Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prices?.map((price) => {
              const priceDate = new Date(price.createdAt);
              return (
                <TableRow
                  key={price.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{price.company.name}</TableCell>
                  <TableCell align="left">{price.stockType.name}</TableCell>
                  <TableCell align="left">
                    {formatDate(priceDate, "yyyy-MM-dd hh:mm aa")}
                  </TableCell>
                  <TableCell align="left">{price.price}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
