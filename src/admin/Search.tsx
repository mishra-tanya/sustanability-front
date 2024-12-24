// components/Search.tsx
import React, { useState } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchProps<T> {
  data: T[];
  searchKeys: string[];
  onSearch: (filteredData: T[]) => void;
}

const SearchData: React.FC<SearchProps<any>> = ({ data, searchKeys, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filteredData = data.filter((item) =>
      searchKeys.some((key) =>
        item[key] && item[key].toString().toLowerCase().includes(term.toLowerCase())
      )
    );

    onSearch(filteredData);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        size="small"
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
      />
    </Box>
  );
};

export default SearchData;
