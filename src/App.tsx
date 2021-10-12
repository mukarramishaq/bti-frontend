import React from "react";
import Grid from "@mui/material/Grid";
import { QueryClient, QueryClientProvider } from "react-query";
import { CompaniesOverview } from "components/Company";
import { HighestMarketPrices } from "components/HighestPrices";
import { ExchangesOverview } from "components/Exchange";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Grid
        container={true}
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item>
          <CompaniesOverview />
        </Grid>
        <Grid item>
          <HighestMarketPrices />
        </Grid>
        <Grid item>
          <ExchangesOverview />
        </Grid>
      </Grid>
    </QueryClientProvider>
  );
}

export default App;
