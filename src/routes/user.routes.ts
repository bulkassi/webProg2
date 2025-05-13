import { Router } from "express"
import { getUsers, createUser, deleteUser, updateUser } from "../controllers/user.controller";
import { getAuthMiddleware } from "../middlewares/authMiddleware";
import { UserRoles } from "../models/User";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users from the database
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: "Ivan"
 *                   email:
 *                     type: string
 *                     example: "ivan@email.com"
 *                   password:
 *                     type: string
 *                     example: "ivanpassword"
 *                   _id:
 *                     type: string
 *                     example: "64f3b2c4e4b0a1d2c8e4f3b2"
 *       400:
 *         description: Error retrieving users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */
router.get("/", getAuthMiddleware([UserRoles.admin, UserRoles.moderator]), getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided username, email, and password.
 *     tags: [Users]
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
 *                 example: "Ivan"
 *               email:
 *                 type: string
 *                 example: "ivan@email.com"
 *               password:
 *                 type: string
 *                 example: "ivanpassword"
 *               _id:
 *                 type: string
 *                 example: "64f3b2c4e4b0a1d2c8e4f3b2"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "Anton"
 *                 email:
 *                   type: string
 *                   example: "anton@mail.com"
 *                 password:
 *                   type: string
 *                   example: "antonpassword"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email is required"
 *       500:
 *         description: Internal server error
 */
router.post("/", createUser);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user with the specified userId
 *     tags: [Users]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userID]
 *             properties:
 *               userID:
 *                 type: string
 *                 example: "64f3b2c4e4b0a1d2c8e4f3b2"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: "Ivan"
 *                   email:
 *                     type: string
 *                     example: "ivan@email.com"
 *                   _id:
 *                     type: string
 *                     example: "64f3b2c4e4b0a1d2c8e4f3b2"
 *       400:
 *         description: Error deleting user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */
router.delete("/", getAuthMiddleware([UserRoles.admin]), deleteUser);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update a user
 *     description: Updates user information for the specified userId
 *     tags: [Users]
 *     security: [{ bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email]
 *             properties:
 *               username:
 *                 type: string
 *                 example: "UpdatedName"
 *               email:
 *                 type: string
 *                 example: "updated@email.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "UpdatedName"
 *                 email:
 *                   type: string
 *                   example: "updated@email.com"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user not found"
 *       400:
 *         description: Error updating user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */
router.put("/", updateUser);

export default router;
