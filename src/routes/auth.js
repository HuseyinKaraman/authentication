import { Router } from 'express';
const router = Router();

import auth from '../controllers/auth/index.js';

import { verifyAccessToken } from '../helpers/jwt.js';
import loginLimiter from "../middlewares/rate-limiter.js";

/**
 * @swagger
 * '/api/auth/register':
 *  
 *  post:
 *     summary: To register a new user
 *     description: This api is used to register a new user
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      201:
 *        description: Created
 */
router.post("/register", auth.Register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: To login a user
 *      description: This api is used to login a user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:    
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *          200:
 *              description: To login a user
 *
 */
router.post("/login", loginLimiter, auth.Login);

/**
 * @swagger
 * /api/auth/refresh_token:
 *  post:
 *      summary: To refresh access token
 *      tags: [Auth]
 *      description: This api is used to refresh access token
 *      responses:
 *          200:
 *              description: To refresh access token
 *
 */
router.post("/refresh", auth.RefreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *      summary: To logout a user
 *      tags: [Auth]
 *      description: This api is used to logout a user
 *      responses:
 *          200:
 *              description: To logout a user
 *
 */
router.post("/logout", auth.Logout);

/**
 * @swagger
 * /api/auth/me:
 *  get:
 *      summary: To get user details
 *      tags: [Auth]
 *      description: This api is used to get user details
 *      responses:
 *          200:
 *              description: To get user details
 *
 */
router.get("/me", verifyAccessToken, auth.Me);

export default router;