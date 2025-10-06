const authService = require('../services/AuthService');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

class AuthController {
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful with auth token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 code:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: Login successful
   *                 data:
   *                   type: object
   *                   properties:
   *                     user:
   *                       $ref: '#/components/schemas/User'
   *                     token:
   *                       type: string
   *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *       401:
   *         description: Invalid credentials
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const authData = await authService.authenticateUser(email, password);
      // 200 OK - Standard response for successful HTTP requests
      return res.status(200).json({ 
        success: true, 
        data: authData,
        code: 200,
        message: 'Login successful'
      });
    } catch (error) {
      // 401 Unauthorized - Authentication is required and has failed or not been provided
      return res.status(401).json({ 
        success: false, 
        message: error.message,
        code: 401,
        error: 'Unauthorized'
      });
    }
  }

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: User's name
   *               email:
   *                 type: string
   *                 description: User's email address
   *               password:
   *                 type: string
   *                 description: User's password
   *               role:
   *                 type: string
   *                 description: User's role (e.g., admin, user)
   *     responses:
   *       201:
   *         description: User registered successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 code:
   *                   type: integer
   *                   example: 201
   *                 message:
   *                   type: string
   *                   example: User registered successfully
   *                 data:
   *                   type: object
   *                   properties:
   *                     user:
   *                       $ref: '#/components/schemas/User'
   *                     token:
   *                       type: string
   *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *       400:
   *         description: Bad request, invalid data.
   */
  async register(req, res) {
    try {
      const userData = req.body;
      const authData = await authService.registerUser(userData);
      // 201 Created - The request has been fulfilled, resulting in the creation of a new resource
      return res.status(201).json({ 
        success: true, 
        data: authData,
        code: 201,
        message: 'User registered successfully'
      });
    } catch (error) {
      // 400 Bad Request - The server cannot process the request due to client error
      return res.status(400).json({ 
        success: false, 
        message: error.message,
        code: 400,
        error: 'Bad Request'
      });
    }
  }
}

module.exports = new AuthController();