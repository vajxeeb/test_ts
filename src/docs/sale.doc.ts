
/**
 * @swagger
 * tags:
 *  name: Sale
 *  description: Sale Resource
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   sale:
 *    type: object
 *    required:
 *      - product_id
 *      - price
 *      - quantity
 *    properties:
 *     product_id:
 *      type: string
 *      description: The product id
 *     price:
 *      type: string
 *      description: The product price
 *     quantity:
 *      type: integer
 *      description: The quantity
 *    example:
 *       [
 *        {
 *          product_id: 1,
 *          price: 10000,
 *          quantity: 10
 *        }
 *       ]
 */

 //<==========ADD==================>

/**
 * @swagger
 * /api/sale/add:
 *  post:
 *   summary: Add sale
 *   tags: [Sale]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/sale'
 *   responses:
 *    200:
 *       description: Success
 *    401:
 *       description: Unauthorise
 *    500:
 *       description: Some server error
 */
 