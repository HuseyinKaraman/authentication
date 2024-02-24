const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth");
const { verifyAccessToken } = require("../helpers/jwt");
const loginLimiter = require("../middlewares/rate-limiter");

/**
 * @swagger
 * '/api/auth/register':
 *  post:
 *     summary: To register a new user
 *     description: This api is used to register a new user
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
 *      description: This api is used to get user details
 *      responses:
 *          200:
 *              description: To get user details
 *
 */
router.get("/me", verifyAccessToken, auth.Me);

module.exports = router;
