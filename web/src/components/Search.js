import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Loader from "./Loader";
import { useState, useEffect } from "react";

export default function Search() {
  const [youtubers, setYoutubers] = useState([]);
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/api/getyoutubers");
      const responseData = await response.json();

      setYoutubers(responseData.data);
      setLoader(false);
    }
    fetchData();
  }, []);
  return loader == true ? (
    <Loader />
  ) : (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={youtubers}
        getOptionLabel={(option) => option.username}
        defaultValue={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Input Youtuber Name"
            placeholder="Input Youtuber Name"
          />
        )}
      />
    </Stack>
  );
}
