import React from "react";
import { Grid } from "@mui/material";
import Search from "../components/Search";
const Home = () => {
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item>
          <Search />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
