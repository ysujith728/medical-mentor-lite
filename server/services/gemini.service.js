import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { redis } from '../config/redis.js';
import crypto from 'crypto';

dotenv.config();

let ai = null;
if (process.env.GROQ_API_KEY) {
  ai = new Groq({ apiKey: process.env.GROQ_API_KEY });
  console.log("Groq AI initialized successfully in service layer.");
} else {
  console.error("CRITICAL: No GROQ_API_KEY found. AI features will return errors.");
}

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours

// Helper to generate a cache key from prompt
const getCacheKey = (prompt) => {
  return 'ai_cache:' + crypto.createHash('md5').update(prompt).digest('hex');
};

export const generateJSONResponse = async (prompt) => {
  // Check Redis Cache first
  if (redis) {
    try {
      const cacheKey = getCacheKey(prompt);
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log("Cache hit for AI response");
        return typeof cached === 'string' ? JSON.parse(cached) : cached;
      }
    } catch (e) {
      console.error("Redis Cache Error:", e);
    }
  }

  // Hit Groq API if not cached
  if (!ai) {
    throw new Error('AI service unavailable: GROQ_API_KEY not configured.');
  }

  const completion = await ai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 1024,
    response_format: { type: "json_object" }
  });
  
  let text = completion.choices[0]?.message?.content || "";
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
};

