
/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Login Resource
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Login:
 *    type: object
 *    required:
 *      - username
 *      - password
 *    properties:
 *     username:
 *      type: string
 *      description: The username
 *     password:
 *      type: string
 *      description: The user password
 *    example:
 *      username: admin1
 *      password: '111'
 */
/**
 * @swagger
 * /api/login:
 *  post:
 *   summary: Login
 *   tags: [Login]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Login'
 *   responses:
 *    200:
 *       description: Login successful
 *    401:
 *       description: Sign token failed
 *    404:
 *       description: User Not found
 *    500:
 *       description: Some server error
 */

