import { Router } from "express"
import { signUp, signIn } from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 *   tags:
 *     name: Auth
 *     description: User authentification
 */

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Registring a new user
 *     tags: [Auth]
 *     description: Creates a new user in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Pupkin"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "pupkin@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "vasypupkin"
 *               role:
 *                 type: string
 *                 default: user
 *                 example: user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user: 
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67fe5f67a91106d0985d57f9"
 *                     username:
 *                       type: string
 *                       example: Pupkin
 *                     email:
 *                       type: string
 *                       example: "pupkin@email.com"
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string 
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 */
router.post("/sign-up", signUp)

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: User authentification
 *     tags: [Auth]
 *     description: Checks user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username
 *                 example: "Pupkin"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password
 *                 example: "vasyapupkin"
 *     responses:
 *       200:
 *         description: Authentification successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successfull
 *       400:
 *         description: Authentification failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username or password is incorrect
 */
router.post("/sign-in", signIn)

export default router;
