import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import prisma from '../config/prisma.js';

dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error('CRITICAL: SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables.');
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];
    
    // Validate JWT via Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Fetch user from Prisma to get RBAC role
    let prismaUser = await prisma.user.findUnique({
      where: { supabaseId: user.id }
    });

    // If no Prisma user exists yet, create it as USER role
    if (!prismaUser) {
      prismaUser = await prisma.user.create({
        data: {
          supabaseId: user.id,
          email: user.email,
          role: 'USER',
          profile: {
            create: { displayName: user.email.split('@')[0], xp: 0, streak: 0 }
          }
        }
      });
    }

    // Attach user to request with role
    req.user = {
      ...user,
      role: prismaUser.role,
      prismaId: prismaUser.id
    };
    
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).json({ error: 'Internal server authentication error' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};
