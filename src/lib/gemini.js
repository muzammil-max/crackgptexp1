import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
// import { generateImageFromPollinations } from "./merida.js";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];
const fileManager = new GoogleAIFileManager(
  import.meta.env.VITE_GEMINI_PUBLIC_KEY
);
const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 60,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_PUBLIC_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21",
  tools: [],
  // safetySettings,
  generationConfig,
});

export default model;
