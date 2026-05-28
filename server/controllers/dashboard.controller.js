import prisma from '../config/prisma.js';

export const getProfile = async (req, res, next) => {
  try {
    // Generate shifting dynamic data for simulation
    const timeFactor = Math.floor(Date.now() / 10000); // changes every 10 seconds
    res.json({
        displayName: "Dr. Jayesh",
        xp: 12500 + (timeFactor % 500) * 10,
        streak: 42 + (timeFactor % 3)
    });
  } catch (err) {
    next(err);
  }
};

export const getActivities = async (req, res, next) => {
  try {
    const actions = ["COMPLETED_QUIZ", "RESEARCHED_TERM", "VIEWED_ANATOMY", "EARNED_BADGE"];
    const topics = ["Neurology", "Cardiology", "Pathology", "Oncology", "Pharmacology"];
    const generateActivity = (i) => ({
        createdAt: new Date(Date.now() - Math.random() * 86400000 * i).toISOString(),
        actionType: actions[Math.floor(Math.random() * actions.length)],
        details: { topic: topics[Math.floor(Math.random() * topics.length)] }
    });
    
    // Return 6 random activities that shift slightly
    const activities = Array.from({ length: 6 }, (_, i) => generateActivity(i));
    res.json(activities);
  } catch (err) {
    next(err);
  }
};

export const getSavedTerms = async (req, res, next) => {
  try {
    const termPool = [
        { term: "Apoptosis", definition: "Programmed cell death." },
        { term: "Myocardial Infarction", definition: "Heart attack due to lack of blood flow." },
        { term: "Erythema", definition: "Redness of the skin caused by hyperemia." },
        { term: "Tachycardia", definition: "Abnormally rapid heart rate." },
        { term: "Bradycardia", definition: "Abnormally slow heart action." },
        { term: "Hemolysis", definition: "The rupture or destruction of red blood cells." }
    ];
    // Randomize the order slightly to show live updates
    const shuffled = termPool.sort(() => 0.5 - Math.random()).slice(0, 4);
    res.json(shuffled);
  } catch (err) {
    next(err);
  }
};
