import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { generateText, generateImage } from "../Helpers/Gemini_Helpers";

function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageDescription, setImageDescription] = useState("");
  const [responseText, setResponseText] = useState("");

  const resetData = () => {
    setImageDescription("");
    setResponseText("");
  };

  const handleSubmit = async () => {
    console.log(imageDescription);
    generateImage(imageDescription, setIsLoading).then((response) => {
      setResponseText(response[0]);
      setImageUrl(response[1]);
    });
  };

  useEffect(() => {}, [imageUrl]);
  return (
    <div className="App">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            required
            disabled={isLoading ? true : false}
            type="text"
            value={imageDescription}
            onChange={(e) => {
              e.preventDefault();
              setImageDescription(e.target.value);
            }}
          />
          <button type="submit" disabled={isLoading ? true : false}>
            Generate
          </button>
        </form>
      </div>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {imageUrl != "" ? (
            <>
              <img
                src={`data:image/png;base64,${imageUrl}`}
                alt="From API"
                style={{ width: "400px", height: "auto" }} // optional styling
              />{" "}
              <div>{responseText}</div>
            </>
          ) : (
            <>{responseText}</>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
