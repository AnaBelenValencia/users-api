import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import dotenv from 'dotenv'

dotenv.config()

interface AuthRequest extends Request {
  userId?: number
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token missing' })
  }

  try {
    const secret = process.env.JWT_SECRET as string
    const decoded = verifyToken(token)

    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}
