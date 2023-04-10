import React from "react";
import { FormControl } from "@mui/material";
import { Grid } from "@mui/material";
import KeyForm from "../components/KeyForm";

const Keys = () => {
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <KeyForm />
      </Grid>
    </div>
  );
};

export default Keys;
