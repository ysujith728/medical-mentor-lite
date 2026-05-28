import prisma from '../config/prisma.js';

export const promoteToAdmin = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;
    
    // Verify invite code
    const validCode = process.env.ADMIN_INVITE_CODE;
    if (!validCode || inviteCode !== validCode) {
      return res.status(403).json({ error: 'Invalid or missing admin invite code' });
    }

    // Ensure user is authenticated via requireAuth
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Promote user in Prisma
    const updatedUser = await prisma.user.update({
      where: { supabaseId: req.user.id },
      data: { role: 'ADMIN' },
      select: { id: true, email: true, role: true }
    });

    res.json({ message: 'Successfully promoted to ADMIN', user: updatedUser });
  } catch (err) {
    next(err);
  }
};
