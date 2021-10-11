import React from "react";
import Grid from "@mui/material/Grid";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { CompanyStockOverviewWrapper } from "components/CompanyStockOverview";

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
        var
      >
        <Grid item>
        <CompanyStockOverviewWrapper />

        </Grid>
      </Grid>
    </QueryClientProvider>
  );
}

export default App;
