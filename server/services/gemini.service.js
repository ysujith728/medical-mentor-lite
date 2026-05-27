import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { redis } from '../config/redis.js';
import crypto from 'crypto';

dotenv.config();

let ai = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  console.log("Gemini AI initialized successfully in service layer.");
} else {
  console.warn("No GEMINI_API_KEY found. Falling back to mock responses.");
}

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours

// Helper to generate a cache key from prompt
const getCacheKey = (prompt) => {
  return 'ai_cache:' + crypto.createHash('md5').update(prompt).digest('hex');
};

export const generateJSONResponse = async (prompt, fallbackMock) => {
  // Check Redis Cache first
  if (redis) {
    try {
      const cacheKey = getCacheKey(prompt);
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log("Cache hit for AI response");
        // If upstash returns stringified object, parse it. If it auto-parses, just return it.
        return typeof cached === 'string' ? JSON.parse(cached) : cached;
      }
    } catch (e) {
      console.error("Redis Cache Error:", e);
    }
  }

  // Hit Gemini API if not cached
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
      
      let text = response.text || '';
      text = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const result = JSON.parse(text);

      // Save to cache
      if (redis) {
        try {
          const cacheKey = getCacheKey(prompt);
          await redis.set(cacheKey, JSON.stringify(result), { ex: CACHE_TTL_SECONDS });
        } catch (e) {
          console.error("Redis Cache Set Error:", e);
        }
      }

      return result;
    } catch (e) {
      console.error("AI Generation Error:", e.message || e);
      return fallbackMock;
    }
  }

  return fallbackMock;
};
