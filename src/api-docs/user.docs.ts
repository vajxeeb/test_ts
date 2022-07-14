
/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Resource
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   userAddModel:
 *    type: object
 *    required:
 *      - username
 *      - password
 *      - role_id
 *    properties:
 *     username:
 *      type: string
 *      description: The username
 *     password:
 *      type: string
 *      description: The user password
 *     role_id:
 *      type: integer
 *      description: The role id
 *    example:
 *      username: admin1
 *      password: '111'
 *      role_id: 1
 */
/**
 * @swagger
 * components:
 *  schemas:
 *   userUpdateModel:
 *    type: object
 *    required:
 *      - id
 *      - username
 *      - password
 *      - role_id
 *    properties:
 *     id:
 *      type: integer
 *      description: The user id
 *     username:
 *      type: string
 *      description: The username
 *     password:
 *      type: string
 *      description: The user password
 *     role_id:
 *      type: integer
 *      description: The role id
 *    example:
 *      id: 1
 *      username: admin1
 *      password: '111'
 *      role_id: 1
 */
 //<==========ADD==================>

/**
 * @swagger
 * /api/user/add:
 *  post:
 *   summary: Add User
 *   tags: [User]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/userAddModel'
 *   responses:
 *    200:
 *       description: Success
 *    400:
 *       description: User already have in database
 *    401:
 *       description: Unauthorise
 *    500:
 *       description: Some server error
 */
 //<==========UPDATE==================>
/**
 * @swagger
 * /api/user/update:
 *  post:
 *   summary: Update User
 *   tags: [User]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/userUpdateModel'
 *   responses:
 *    200:
 *       description: Success
 *    404:
 *       description: Not found user for update
 *    401:
 *       description: Unauthorise
 *    500:
 *       description: Some server error
 */
//<============GET ALL USER ==========>
/**
 * @swagger
 * /api/user/getall:
 *  post:
 *   summary: Get all user
 *   tags: [User]
 *   responses:
 *    200:
 *       description: OK
 *    401:
 *       description: Unauthorization
 *    500:
 *       description: Some server error
 */
 //<==========DELETE==================>
/**
 * @swagger
 * /api/user/delete:
 *  post:
 *   summary: Delete User
 *   tags: [User]
 *   parameters:
 *    - in: query
 *      name: id
 *      schema:
 *       type: integer
 *      require: true
 *      description: The user id
 *   responses:
 *    200:
 *       description: Success
 *    404:
 *       description: Not found user for delete
 *    401:
 *       description: Unauthorise
 *    500:
 *       description: Some server error
 */