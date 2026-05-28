import prisma from '../config/prisma.js';

export const getProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user.prismaId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: req.user.prismaId },
      include: { profile: true }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
        ...user.profile,
        role: user.role
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
