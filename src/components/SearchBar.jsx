import { IconButton } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

function SearchBar({ disabled, imageDescription, onChange }) {
  return (
    <>
      <div className="search-box">
        <input
          required
          className="search-input"
          label="Search"
          placeholder="Briefly describe the image you want to search"
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
}

export default SearchBar;
