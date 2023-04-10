import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Loader from "./Loader";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Button, InputLabel } from "@mui/material";

export default function Search() {
  const [youtubers, setYoutubers] = useState([]);
  const [loader, setLoader] = React.useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [refresh, setrefreshState] = useState(false);
  const elementRef = useRef(null);

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
    console.log(selectedOptions);
    var output = [];
    for (var i = 0; i < selectedOptions.length; ++i)
      output.push(selectedOptions[i]["Rank"]);

    console.log(output);

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
        console.log(data);
        alert(data.data);
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
    </Box>
  );
}
