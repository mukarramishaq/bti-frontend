import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useQuery } from "react-query";
import { getCompanies } from "apis/index";
import { CompanyStockOverviewComponent } from "./CompanyStockOverviewComponent";

export const CompanyStockOverviewWrapper = () => {
  const { data } = useQuery("get-companies", getCompanies);

  return (
    <Grid
      container={true}
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {data?.map((company, i) => {
        return <CompanyStockOverviewComponent key={i} {...company} />;
      })}
    </Grid>
  );
  // return <></>
};
