import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function test() {
    console.log("Testing API KEY length:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    try {
        console.log("Calling Gemini...");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "What is the medical definition of Heart Attack? Return JSON.",
            config: {
                responseMimeType: "application/json",
            }
        });
        console.log("Response:", response);
        console.log("Text:", response.text);
    } catch (e) {
        console.error("AI Error occurred:", e);
    }
}
test();
