import { GEMINI_API_KEY } from "../constants";
import { isEmpty } from 'lodash';
import { GoogleGenAI, Modality } from "@google/genai";


const aiGenerator = async (model = '', text, modelConfig) => {

    const contentText = isEmpty(text) ? "Explain how AI works in a few words" : text;
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const response = await ai.models.generateContent({
        model: !isEmpty(model) ? model : "gemini-2.0-flash",
        contents: contentText,
        ...(modelConfig && (modelConfig))
    });
    // console.log(response);
    return response;

};

export const generateText = async (text = '') => {
    aiGenerator(text).then((response) => {
        // console.log(response.text);
        return response.text;
    });



};

export const generateImage = async (text = '', setIsLoading = null,) => {
    return new Promise(function (resolve, reject) {
        let imageText, image, imageConfig = {
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            }
        };
        if (setIsLoading) setIsLoading(true);
        aiGenerator("gemini-2.0-flash-preview-image-generation", text, imageConfig).then((response) => {
            // console.log(response);
            for (const part of response.candidates[0].content.parts) {
                // Based on the part type, either show the text or save the image
                if (part.text) {
                    imageText = (part.text);
                    // console.log(imageText);
                } else if (part.inlineData) {
                    image = part.inlineData.data;
                    // console.log(image);

                }
                if (setIsLoading) setIsLoading(false);
            }
            resolve([imageText, image]);
        }).catch((err) => {
            console.log(err);
        });
    });




};
