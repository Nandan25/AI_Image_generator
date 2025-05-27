import { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";
import SearchBar from "./SearchBar";
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
    <>
      <div className="ai-image-generator">
        <div className="header">
          AI Image <span>generator</span>
          <ImageComponent
            isLoading={isLoading}
            imageUrl={imageUrl}
            responseText={responseText}
          />
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
        </div>
      </div>
    </>
  );
}

export default Home;
