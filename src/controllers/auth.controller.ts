import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'

const userRepo = AppDataSource.getRepository(User)

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body

  try {
    const existingUser = await userRepo.findOne({ where: { email } })

    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = userRepo.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    })

    await userRepo.save(newUser)

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Registration error', error })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await userRepo.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user.id)

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Login error', error })
  }
}
