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
    if (!req.user || !req.user.prismaId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const events = await prisma.analyticsEvent.findMany({
      where: { userId: req.user.prismaId },
      orderBy: { createdAt: 'desc' },
      take: 6
    });

    const activities = events.map(event => ({
      createdAt: event.createdAt,
      actionType: event.eventType,
      details: event.metadata || { topic: event.eventCategory }
    }));

    res.json(activities);
  } catch (err) {
    next(err);
  }
};

export const getSavedTerms = async (req, res, next) => {
  try {
    if (!req.user || !req.user.prismaId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const savedTerms = await prisma.savedTerm.findMany({
      where: {
        userId: req.user.prismaId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(savedTerms);
  } catch (err) {
    next(err);
  }
};

export const saveTerm = async (req, res, next) => {
  try {
    if (!req.user || !req.user.prismaId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { term, definition, pathophysiology, clinicalRelevance } = req.body;

    if (!term || !definition) {
      return res.status(400).json({
        error: "term and definition are required"
      });
    }

    const existing = await prisma.savedTerm.findFirst({
      where: {
        userId: req.user.prismaId,
        term
      }
    });

    if (existing) {
      const updated = await prisma.savedTerm.update({
        where: { id: existing.id },
        data: {
          definition,
          pathophysiology,
          clinicalRelevance
        }
      });
      return res.json(updated);
    }

    const savedTerm = await prisma.savedTerm.create({
      data: {
        userId: req.user.prismaId,
        term,
        definition,
        pathophysiology,
        clinicalRelevance
      }
    });

    res.status(201).json(savedTerm);
  } catch (err) {
    next(err);
  }
};
export const deleteSavedTerm = async (req, res, next) => {
  try {
    if (!req.user || !req.user.prismaId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;

    const savedTerm = await prisma.savedTerm.findUnique({
      where: { id }
    });

    if (!savedTerm) {
      return res.status(404).json({ error: "Saved term not found" });
    }

    if (savedTerm.userId !== req.user.prismaId) {
      return res.status(403).json({ error: "Forbidden: You do not own this saved term" });
    }

    await prisma.savedTerm.delete({
      where: { id }
    });

    res.json({ message: "Saved term deleted successfully" });
  } catch (err) {
    next(err);
  }
};
