import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source'
import { User } from '../models/user.model'

const userRepo = AppDataSource.getRepository(User)

interface AuthRequest extends Request {
  userId?: number
}
 
/* Get user profile handler */
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    // Get the user, searching by email
    const user = await userRepo.findOneBy({ id: req.userId })

    // Validate if the user exists, else returns error
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Removing password from user object and return it
    const { password, ...userWithoutPassword } = user
    res.status(200).json(userWithoutPassword)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error })
  }
}

/* Update user profile handler */
export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  // Get new user data from request
  const { firstName, lastName } = req.body

  try {
    // Get the user, searching by email
    const user = await userRepo.findOneBy({ id: req.userId })

    // Validate if the user exists, else returns error
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Filling user object to save in database
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName

    await userRepo.save(user)

    const { password, ...updatedUser } = user
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error })
  }
}

/* Get list use */
export const listUsers = async (_req: AuthRequest, res: Response) => {
  try {
    // Get user collection from database
    const users = await userRepo.find()

    // Removing password from user objects and return it
    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest)

    res.status(200).json(usersWithoutPasswords)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error })
  }
}
