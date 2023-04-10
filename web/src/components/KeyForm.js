import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Loader from "./Loader";
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function KeyForm() {
  const [keys, setKeys] = useState([]);
  const [fpr, setFpr] = useState("");
  const [numClients, setNumClients] = useState("");
  const [maxElements, setMaxElements] = useState("");
  const [revealIntersection, setRevealIntersection] = useState(false);

  const [loader, setLoader] = React.useState(true);
  const inputFPR = useRef(null);
  const inputMaxClients = useRef(null);
  const inputMaxElements = useRef(null);
  const inputRevealInterection = useRef(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/api/getkeys");
      const responseData = await response.json();
      setKeys(responseData.data);
      setFpr(responseData.data[0].fpr);
      setNumClients(responseData.data[0].numClientElements);
      setMaxElements(responseData.data[0].numTotalElements);
      setRevealIntersection(responseData.data[0].revealIntersection);
      setLoader(false);
    }
    fetchData();
  }, [fpr]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  function submitHandler(event) {
    event.preventDefault();

    var updateObj = {
      fpr: inputFPR.current ? inputFPR.current : fpr,
      numClientElements: inputMaxClients.current
        ? inputMaxClients.current
        : numClients,
      numTotalElements: inputMaxElements.current
        ? inputMaxClients.current
        : maxElements,
      revealIntersection:
        inputRevealInterection.current !== undefined
          ? inputRevealInterection.current
          : revealIntersection,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateObj),
    };
    fetch("http://127.0.0.1:8000/api/updatekeys", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setFpr(updateObj.fpr);
        setNumClients(updateObj.numClientElements);
        setMaxElements(updateObj.numTotalElements);
        setRevealIntersection(updateObj.revealIntersection);
      });
  }
  return loader == true ? (
    <Loader />
  ) : (
    <Box component="form" onSubmit={submitHandler}>
      <h1>Key Configuration</h1>
      <Grid container spacing={2}>
        <Grid container item xs={6} direction="column">
          <Item>
            <Stack spacing={2} sx={{ width: 400 }}>
              <InputLabel label="Outlined" variant="outlined">
                <h2>Current Key Values </h2>
              </InputLabel>
              {/* <Grid container> */}
              <InputLabel label="Outlined" variant="outlined">
                {" "}
                False Postive Rate: <b>{fpr}</b>
              </InputLabel>

              <InputLabel label="Outlined" variant="outlined">
                {" "}
                Max Number of Client Elements:<b>{numClients}</b>
              </InputLabel>

              <InputLabel label="Outlined" variant="outlined">
                {" "}
                Max number of Total Elements:<b>{maxElements}</b>
              </InputLabel>

              <InputLabel label="Outlined" variant="outlined">
                {" "}
                Reveal Intersection:
                <b>{revealIntersection ? "True" : "False"}</b>
              </InputLabel>
              {/* </Grid> */}
            </Stack>
          </Item>
        </Grid>
        <Grid container item xs={6} direction="column">
          <Item>
            <Stack spacing={2} sx={{ width: 400 }}>
              <h2>Edit Key Values</h2>

              <TextField
                id="fpr"
                label="False Positive Rate"
                variant="standard"
                onInput={(e) => (inputFPR.current = e.target.value)}
              />

              <TextField
                id="numClients"
                label="Max Number of Client Elements"
                variant="standard"
                onInput={(e) => (inputMaxClients.current = e.target.value)}
              />
              <TextField
                id="maxElements"
                label="Max number of Total Elements"
                variant="standard"
                onInput={(e) => (inputMaxElements.current = e.target.value)}
              />

              <InputLabel>Do you want to reveal intersection?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="revealIntersection"
                onChange={(e) =>
                  (inputRevealInterection.current = e.target.value)
                }
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>

              <Button type="submit">Submit</Button>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
