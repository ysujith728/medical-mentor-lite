import { generateJSONResponse } from '../services/gemini.service.js';
import axios from 'axios';
import prisma from '../config/prisma.js';

export const defineTerm = async (req, res, next) => {
  try {
    const term = req.sanitizedTerm || req.body.term;
    const userId = req.user?.id; // from requireAuth middleware

    const prompt = `You are a medical knowledge engine. Provide a detailed JSON response for the medical term "${term}". 
    Format MUST be exactly: {"definition": "...", "pathophysiology": "...", "clinicalRelevance": "...", "correctedTerm": "the correctly spelled term"}
    The content must be medically accurate, detailed (2-4 sentences each), and specific to "${term}". Do not use generic placeholder text.`;

    const fallback = {
      definition: `${term} is a medical concept. Enable AI engine for real responses.`,
      pathophysiology: `Pathophysiology of ${term}.`,
      clinicalRelevance: `Clinical relevance of ${term}.`,
      correctedTerm: term
    };

    const data = await generateJSONResponse(prompt, fallback);
    
    // Asynchronously log this activity if user is authenticated
    if (userId) {
      // Find internal user id by supabaseId
      const dbUser = await prisma.user.findUnique({ where: { supabaseId: userId } });
      if (dbUser) {
        await prisma.dashboardActivity.create({
          data: {
            userId: dbUser.id,
            actionType: 'TERM_SEARCHED',
            details: { term }
          }
        }).catch(err => console.error("Activity log error:", err));
      }
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getRelatedTerms = async (req, res, next) => {
  try {
    const term = req.sanitizedTerm || req.body.term;
    
    const prompt = `Provide exactly 6 related medical terminology concepts for "${term}". These must be real, distinct medical terms closely related to "${term}". Return JSON format: {"terms": ["Term 1", "Term 2", ...]}`;
    const fallback = {
      terms: [`${term} Basics`, `${term} Pathology`, `${term} Interventions`, `${term} Pathway`, `${term} Diagnostics`, `${term} Case Study`]
    };

    const data = await generateJSONResponse(prompt, fallback);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const generateQuiz = async (req, res, next) => {
  try {
    const { topic, difficulty, numQuestions } = req.sanitizedQuiz || req.body;
    
    const prompt = `Generate exactly ${numQuestions} UNIQUE, DISTINCT, and DIVERSE medical quiz questions on the topic "${topic}" with a difficulty level of "${difficulty}". Ensure no two questions are the same.
    Return JSON format exactly like:
    {
      "questions": [
        {
          "question": "Question text?",
          "options": [
            { "id": "A", "label": "Option 1" },
            { "id": "B", "label": "Option 2" },
            { "id": "C", "label": "Option 3" },
            { "id": "D", "label": "Option 4" }
          ],
          "correctOption": "B",
          "explanation": "Explanation text"
        }
      ]
    }`;

    const fallbackQuestions = Array(Number(numQuestions) || 5).fill(null).map((_, i) => ({
      question: `[Q${i+1} - ${difficulty}] A patient presents with symptoms associated with ${topic || 'general pathology'}?`,
      options: [
        { id: 'A', label: `Option A for variant ${i+1}` },
        { id: 'B', label: `Option B for variant ${i+1}` },
        { id: 'C', label: `Option C for variant ${i+1}` },
        { id: 'D', label: `Option D for variant ${i+1}` }
      ],
      correctOption: 'A',
      explanation: `Explanation for question ${i+1}`
    }));

    const data = await generateJSONResponse(prompt, { questions: fallbackQuestions });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getGraph = async (req, res, next) => {
  try {
    const term = req.sanitizedTerm || req.body.term;
    const prompt = `Generate a detailed, medically accurate knowledge graph for the term "${term}".
Return ONLY valid JSON in this exact format:
{
  "nodes": [
    { "id": "1", "label": "${term}", "type": "concept" },
    { "id": "2", "label": "NodeName", "type": "disease" }
  ],
  "edges": [
    { "source": "1", "target": "2", "relation": "causes" }
  ]
}
CRITICAL REQUIREMENTS:
- Generate between 8 and 15 UNIQUE nodes specific to "${term}"
- Node types must be: "disease", "symptom", "drug", or "concept"  
- Include diverse relationships: causes, treats, associated with, manifests as, prevented by, diagnosed with, etc.
- The central node (id "1") MUST be "${term}" itself`;

    const fallback = {
      nodes: [{ id: "1", label: term, type: "concept" }],
      edges: []
    };

    const data = await generateJSONResponse(prompt, fallback);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
