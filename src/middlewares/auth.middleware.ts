import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import dotenv from 'dotenv'

dotenv.config()

// Extends the request interface to add userId
interface AuthRequest extends Request {
  userId?: number
}

/* Middleware to authenticate users by JWT */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the token from headers Authorization: "Bearer <token>"
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  // If no token is provided, respond with 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Token missing' })
  }

  try {
    // Verify and decode the token
    const decoded = verifyToken(token)
    
    // Attach the user ID to the request object for later use
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}
