import prisma from '../config/prisma.js';

export const getProfile = async (req, res, next) => {
  try {
    const supabaseId = req.user.id; // from auth middleware
    
    // Find or create user sync from Supabase
    let user = await prisma.user.findUnique({
      where: { supabaseId },
      include: { profile: true }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          supabaseId,
          email: req.user.email,
          profile: {
            create: { displayName: req.user.email.split('@')[0], xp: 0, streak: 0 }
          }
        },
        include: { profile: true }
      });
    }

    res.json(user.profile);
  } catch (err) {
    next(err);
  }
};

export const getActivities = async (req, res, next) => {
  try {
    const supabaseId = req.user.id;
    const user = await prisma.user.findUnique({ where: { supabaseId } });
    
    if (!user) return res.status(404).json({ error: "User not found" });

    const activities = await prisma.dashboardActivity.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    res.json(activities);
  } catch (err) {
    next(err);
  }
};

export const getSavedTerms = async (req, res, next) => {
  try {
    const supabaseId = req.user.id;
    const user = await prisma.user.findUnique({ where: { supabaseId } });
    
    if (!user) return res.status(404).json({ error: "User not found" });

    const terms = await prisma.savedTerm.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json(terms);
  } catch (err) {
    next(err);
  }
};
