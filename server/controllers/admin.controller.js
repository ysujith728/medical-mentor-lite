import prisma from '../config/prisma.js';

export const getOverviewMetrics = async (req, res, next) => {
  try {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.userProfile.count({
      where: { lastActive: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
    });

    const aiMetrics = await prisma.aiUsageLog.aggregate({
      _sum: { tokensInput: true, tokensOutput: true },
      _avg: { responseTimeMs: true }
    });

    const searchLogs = await prisma.searchLog.groupBy({
      by: ['searchTerm'],
      _count: { searchTerm: true },
      orderBy: { _count: { searchTerm: 'desc' } },
      take: 5
    });

    res.json({
      totalUsers,
      activeUsers,
      totalTokens: (aiMetrics._sum.tokensInput || 0) + (aiMetrics._sum.tokensOutput || 0),
      avgLatency: aiMetrics._avg.responseTimeMs || 0,
      topSearches: searchLogs
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        _count: {
          select: { aiUsageLogs: true, searchLogs: true }
        }
      },
      take: 100,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getAiAnalytics = async (req, res, next) => {
  try {
    const usageByDate = await prisma.$queryRaw`
      SELECT DATE("createdAt") as date, SUM("tokensInput" + "tokensOutput") as tokens
      FROM "AiUsageLog"
      GROUP BY DATE("createdAt")
      ORDER BY date DESC
      LIMIT 30
    `;

    const cacheHits = await prisma.aiUsageLog.groupBy({
      by: ['cacheHit'],
      _count: { cacheHit: true }
    });

    const promptTypes = await prisma.aiUsageLog.groupBy({
      by: ['promptType'],
      _count: { promptType: true }
    });

    res.json({
      usageByDate,
      cacheStats: cacheHits,
      promptStats: promptTypes
    });
  } catch (err) {
    next(err);
  }
};

export const getSearchAnalytics = async (req, res, next) => {
  try {
    const trending = await prisma.searchLog.groupBy({
      by: ['searchTerm'],
      _count: { searchTerm: true },
      orderBy: { _count: { searchTerm: 'desc' } },
      take: 20
    });

    res.json({ trending });
  } catch (err) {
    next(err);
  }
};
