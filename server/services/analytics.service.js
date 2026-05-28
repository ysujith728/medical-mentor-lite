import prisma from '../config/prisma.js';

/**
 * Tracks a generic analytics event asynchronously without blocking the request.
 */
export const trackEvent = (userId, eventType, eventCategory, metadata = {}) => {
  setImmediate(async () => {
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId,
          eventType,
          eventCategory,
          metadata
        }
      });
    } catch (err) {
      console.error("[Analytics Error] trackEvent failed:", err);
    }
  });
};

/**
 * Logs AI token usage and performance metrics.
 */
export const logAiUsage = (userId, promptType, tokensInput, tokensOutput, responseTimeMs, cacheHit = false) => {
  setImmediate(async () => {
    try {
      await prisma.aiUsageLog.create({
        data: {
          userId,
          promptType,
          tokensInput,
          tokensOutput,
          responseTimeMs,
          cacheHit
        }
      });
    } catch (err) {
      console.error("[Analytics Error] logAiUsage failed:", err);
    }
  });
};

/**
 * Logs user search activity.
 */
export const logSearch = (userId, searchTerm, searchCategory, resultsCount = 0) => {
  setImmediate(async () => {
    try {
      await prisma.searchLog.create({
        data: {
          userId,
          searchTerm,
          searchCategory,
          resultsCount
        }
      });
    } catch (err) {
      console.error("[Analytics Error] logSearch failed:", err);
    }
  });
};

/**
 * Logs system metrics asynchronously.
 */
export const logSystemMetric = (metricName, metricValue) => {
  setImmediate(async () => {
    try {
      await prisma.systemMetric.create({
        data: {
          metricName,
          metricValue
        }
      });
    } catch (err) {
      console.error("[Analytics Error] logSystemMetric failed:", err);
    }
  });
};
