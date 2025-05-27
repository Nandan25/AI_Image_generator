import React from "react";
import { isEmpty } from "lodash";
import { CircularProgress } from "@mui/material";

const ImageComponent = React.memo(({ isLoading, imageUrl, responseText }) => {
  return (
    <>
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
                    alt=""
                    style={{ width: "400px", height: "auto" }} // optional styling
                  />
                </div>
              </>
            ) : (
              <>
                <div className="image-instruction">
                  Briefly describe the image you wish to generate
                </div>
              </>
            )}
            {!isEmpty(responseText) ? (
              <div className="image-text">{responseText}</div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </>
  );
});
export default ImageComponent;
