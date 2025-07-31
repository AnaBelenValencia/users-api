import { Router } from 'express'
import {
  getUserProfile,
  updateUserProfile,
  listUsers,
} from '../controllers/user.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User endpoints
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile for user authenticate
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get('/profile', authenticateToken, getUserProfile)

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Updating auth user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put('/profile', authenticateToken, updateUserProfile)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get user list
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User list
 */
router.get('/', authenticateToken, listUsers)

export default router
