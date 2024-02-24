const express = require('express');

// helpers
const { verifyAccessToken } = require('../helpers/jwt');

// routes
const auth = require('./auth');
const product = require('./product');
const order = require('./order');

const router = express.Router();

/** 
 * @swagger
 * /api:
 *  get:
 *      summary: To test the API root
 *      description: This api is used to test the API if get method is working or not
 *      responses:
 *          200:
 *              description: To test the API root
*/
router.get('/', (req, res) => {
    res.send('welcome to the authentication API');
});

/** 
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
router.use('/auth', auth);

/** 
 * @swagger 
 *  tags:
 *    name: Product
 *    description: Product management
 * */
router.use('/product', product);

/** 
 * @swagger 
 *  tags:
 *    name: Order
 *    description: Order management
 * */
router.use('/order', verifyAccessToken, order);

module.exports = router;
