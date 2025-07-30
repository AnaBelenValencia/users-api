import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source'
import { User } from '../models/user.model'

const userRepo = AppDataSource.getRepository(User)

interface AuthRequest extends Request {
  userId?: number
}

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userRepo.findOneBy({ id: req.userId })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { password, ...userWithoutPassword } = user
    res.status(200).json(userWithoutPassword)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error })
  }
}

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  const { firstName, lastName } = req.body

  try {
    const user = await userRepo.findOneBy({ id: req.userId })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName

    await userRepo.save(user)

    const { password, ...updatedUser } = user
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error })
  }
}

export const listUsers = async (_req: AuthRequest, res: Response) => {
  try {
    const users = await userRepo.find()

    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest)

    res.status(200).json(usersWithoutPasswords)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error })
  }
}
