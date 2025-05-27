import React from "react";
import { IconButton } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const SearchBar = React.memo(({ disabled, imageDescription, onChange }) => {
  return (
    <>
      <div className="search-box">
        <input
          required
          className="search-input"
          label="Search"
          disabled={disabled}
          value={imageDescription}
          onChange={(e) => {
            onChange(e);
          }}
        />
        <IconButton disabled={disabled} aria-label="search" type="submit">
          <AutoFixHighIcon className="search-button" />
        </IconButton>
      </div>
    </>
  );
});

export default SearchBar;
