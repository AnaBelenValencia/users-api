import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'

const userRepo = AppDataSource.getRepository(User)

/* Register user handler */
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body

  try {
    // Validates if the user is already exist in the database
    const existingUser = await userRepo.findOne({ where: { email } })

    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' })
    }

    // Hashing password to keep it in secret
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user, filling user object
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

/* Login user handler */
export const loginUser = async (req: Request, res: Response) => {
  // Getting data credentials from request
  const { email, password } = req.body

  try {
    // Get the user from database searching by email
    const user = await userRepo.findOne({ where: { email } })

    // Validate if the user exists, else returns error
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Validate the password, else reuturns error
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate a token to return it
    const token = generateToken(user.id)

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Login error', error })
  }
}
