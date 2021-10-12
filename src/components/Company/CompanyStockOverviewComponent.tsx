import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { getCompanyStockTypes, getCompanyStockMarkets } from "apis";
import { Tab, Tabs } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ExchangeType, CompanyType, StockType } from "utils/types";
export type PriceType = {
  id: number;
  price: number;
  exchange: ExchangeType;
  company: CompanyType;
  stockType: StockType;
};

export const CompanyStockOverviewComponent = ({ id, name }: CompanyType) => {
  const { data: stockTypes } = useQuery([`get-company-stocktypes`, id], () =>
    getCompanyStockTypes(id)
  );
  const tabIds = stockTypes?.map((s: StockType) => s.id) || [];
  const [selectedTab, setSelectedTab] = useState<number>(1);
  useEffect(() => {
    if (!tabIds.includes(selectedTab) && tabIds.length > 0) {
      setSelectedTab(tabIds[0]);
    }
  }, [selectedTab, tabIds]);
  const {
    data: markets,
    error,
  }: { data?: Array<PriceType>; error: any } = useQuery(
    [`get-stock-markets`, id, selectedTab],
    () => getCompanyStockMarkets(id, selectedTab)
  );
  return (
    <Card color="primary">
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {name}
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => {
            setSelectedTab(newValue);
          }}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          {stockTypes?.map((stockType: StockType) => {
            return (
              <Tab
                label={stockType.name}
                value={stockType.id}
                key={stockType.id}
              />
            );
          })}
        </Tabs>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {markets?.map((market) => (
                <TableRow
                  key={market.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{market.exchange.name}</TableCell>
                  <TableCell align="right">$ {market.price}</TableCell>
                </TableRow>
              ))}
              {error && (
                <TableRow>
                  <TableCell>{error.message}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
