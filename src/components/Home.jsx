import { useEffect, useState } from "react";
import { CircularProgress, TextField, Button } from "@mui/material";
import SearchBar from "./SearchBar";
import { generateText, generateImage } from "../Helpers/Gemini_Helpers";
import { isEmpty } from "lodash";

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
    <>
      <div className="ai-image-generator">
        <div className="header">
          AI Image <span>generator</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <SearchBar
              disabled={isLoading ? true : false}
              value={imageDescription}
              onChange={(e) => {
                e.preventDefault();
                setImageDescription(e.target.value);
              }}
            />
          </form>
          <div className="img-loading">
            {isLoading ? (
              <div className="loader">
                <CircularProgress />
              </div>
            ) : (
              <div className="image">
                {!isEmpty(imageUrl) ? (
                  <>
                    <div>
                      <img
                        src={`data:image/png;base64,${imageUrl}`}
                        alt="From API"
                        style={{ width: "400px", height: "auto" }} // optional styling
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {!isEmpty(responseText) ? (
                  <div className="image-text">{responseText}</div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
