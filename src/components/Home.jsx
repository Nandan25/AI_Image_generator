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
    generateImage(imageDescription, setIsLoading).then((response) => {
      setResponseText(response[0]);
      setImageUrl(response[1]);
    });
  };

  useEffect(() => {}, [imageUrl]);
  return (
    <div className="App">
      <div>
        <input
          disabled={isLoading ? true : false}
          type="text"
          value={imageDescription}
          onChange={(e) => {
            e.preventDefault();
            setImageDescription(e.target.value);
          }}
        />
        <button
          disabled={isLoading ? true : false}
          onClick={() => handleSubmit()}
        >
          Generate
        </button>
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
