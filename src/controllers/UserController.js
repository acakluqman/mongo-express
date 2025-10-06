const userService = require('../services/UserService');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user management
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the user
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password (hashed)
 *         role:
 *           type: string
 *           description: User's role (e.g., admin, user)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when user was last updated
 *       example:
 *         _id: 60d21b4667d0d8992e610c85
 *         name: John Doe
 *         email: john@example.com
 *         role: user
 *         createdAt: 2021-06-22T10:00:00.000Z
 *         updatedAt: 2021-06-22T10:00:00.000Z
 */

class UserController {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Return all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Returns a list of users
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
   *                   example: Users retrieved successfully
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   */
  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      // 200 OK - Standard response for successful HTTP requests
      return res.status(200).json({ 
        success: true, 
        data: users,
        code: 200,
        message: 'Users retrieved successfully'
      });
    } catch (error) {
      // 500 Internal Server Error - The server encountered an unexpected condition
      return res.status(500).json({ 
        success: false, 
        message: error.message,
        code: 500,
        error: 'Internal Server Error'
      });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: User ID
   *     responses:
   *       200:
   *         description: Returns the user with the specified ID.
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
   *                   example: User retrieved successfully
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found.
   */
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      // 200 OK - Standard response for successful HTTP requests
      return res.status(200).json({ 
        success: true, 
        data: user,
        code: 200,
        message: 'User retrieved successfully'
      });
    } catch (error) {
      // 404 Not Found - The requested resource could not be found
      return res.status(404).json({ 
        success: false, 
        message: error.message,
        code: 404,
        error: 'User Not Found'
      });
    }
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
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
   *                 description: User's password (hashed)
   *               role:
   *                 type: string
   *                 description: User's role (e.g., admin, user)
   *     responses:
   *       201:
   *         description: User created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request, invalid data.
   */
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      // 201 Created - The request has been fulfilled, resulting in the creation of a new resource
      return res.status(201).json({ 
        success: true, 
        data: user,
        code: 201,
        message: 'User created successfully'
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

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: User ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: User updated successfully.
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
   *                   example: User updated successfully
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request, invalid data.
   *       404:
   *         description: User not found.
   */
  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      // 200 OK - Standard response for successful HTTP requests
      return res.status(200).json({ 
        success: true, 
        data: user,
        code: 200,
        message: 'User updated successfully'
      });
    } catch (error) {
      if (error.message === 'User not found') {
        // 404 Not Found - The requested resource could not be found
        return res.status(404).json({ 
          success: false, 
          message: error.message,
          code: 404,
          error: 'User Not Found'
        });
      }
      // 400 Bad Request - The server cannot process the request due to client error
      return res.status(400).json({ 
        success: false, 
        message: error.message,
        code: 400,
        error: 'Bad Request'
      });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: User ID
   *     responses:
   *       200:
   *         description: User deleted successfully.
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
   *                   example: User deleted successfully
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found.
   */
  async deleteUser(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      // 200 OK - Standard response for successful HTTP requests
      return res.status(200).json({ 
        success: true, 
        data: {},
        code: 200,
        message: 'User deleted successfully'
      });
    } catch (error) {
      // 404 Not Found - The requested resource could not be found
      return res.status(404).json({ 
        success: false, 
        message: error.message,
        code: 404,
        error: 'User Not Found'
      });
    }
  }


}

module.exports = new UserController();