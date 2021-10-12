import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useQuery } from "react-query";
import { getCompanies } from "apis";
import { CompanyStockOverviewComponent } from "./CompanyStockOverviewComponent";
import { Box, Typography } from "@mui/material";

export const CompaniesOverview = () => {
  const { data } = useQuery("get-companies", getCompanies);

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
        Company Stock Overview
      </Typography>
      <Grid
        container={true}
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {data?.map((company: any, i: number) => {
          return (
            <Grid item key={i}>
              <CompanyStockOverviewComponent key={i} {...company} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
  // return <></>
};
