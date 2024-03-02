import { Router } from 'express';

// helpers
import { verifyAccessToken } from '../helpers/jwt.js';

// routes
import auth from './auth.js';
import product from './product.js';
import order from './order.js';

const router = Router();

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

export default router;