
/**
 * @swagger
 * tags:
 *  name: Role
 *  description: Role Resource
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   role:
 *    type: object
 *    required:
 *      - role_name
 *    properties:
 *     role_name:
 *      type: string
 *      description: The role name
 *    example:
 *      username: admin
 */

 //<==========ADD==================>

/**
 * @swagger
 * /api/role/add:
 *  post:
 *   summary: Add Role
 *   tags: [Role]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/role'
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
 * /api/role/update:
 *  post:
 *   summary: Update User
 *   tags: [Role]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/role'
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

 //<==========DELETE==================>
/**
 * @swagger
 * /api/role/delete:
 *  post:
 *   summary: Delete Role
 *   tags: [Role]
 *   parameters:
 *    - in: query
 *      name: id
 *      schema:
 *       type: integer
 *      require: true
 *      description: The role id
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

//<============GET ALL USER ==========>
/**
 * @swagger
 * /api/role/getall:
 *  post:
 *   summary: Get all user
 *   tags: [Role]
 *   responses:
 *    200:
 *       description: OK
 *    401:
 *       description: Unauthorization
 *    500:
 *       description: Some server error
 */