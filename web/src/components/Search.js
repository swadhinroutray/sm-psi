import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, InputLabel } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Search() {
  const [youtubers, setYoutubers] = useState([]);
  const [loader, setLoader] = React.useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [refresh, setrefreshState] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/api/getyoutubers");
      const responseData = await response.json();

      setYoutubers(responseData.data);
      setLoader(false);
    }
    fetchData();
    setrefreshState(false);
  }, [refresh]);

  function submitHandler(event) {
    event.preventDefault();
    var output = [];
    for (var i = 0; i < selectedOptions.length; ++i)
      output.push(selectedOptions[i]["Rank"]);

    var rankObj = {
      ranks: output,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rankObj),
    };
    fetch("http://127.0.0.1:8000/api/intersection", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.data === "object") {
          let commonarray = [];
          for (let index = 0; index < data.data.length; index++) {
            var common = selectedOptions.filter((obj) => {
              return obj.Rank === data.data[index];
            });
            commonarray.push(common[0]);
          }
          const usernames = commonarray.map(function (obj) {
            return obj["username"];
          });

          toast("You have: " + usernames + " in common!");
        } else {
          toast(data.data);
        }

        setrefreshState(false);
      });
  }

  return loader == true ? (
    <Loader />
  ) : (
    <Box component="form" onSubmit={submitHandler}>
      <Stack spacing={3} sx={{ width: 500 }}>
        <InputLabel>
          <h3>Add youtubers that you want to check intersection for!</h3>
        </InputLabel>
        <Autocomplete
          multiple
          id="tags-standard"
          options={youtubers}
          getOptionLabel={(option) => option.username}
          defaultValue={[]}
          onChange={(event, newValue) => {
            setSelectedOptions(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Input Youtuber Name"
              placeholder="Input Youtuber Name"
            />
          )}
        />
        <Button type="submit">Check Intersection</Button>
      </Stack>
      <ToastContainer />
    </Box>
  );
}
