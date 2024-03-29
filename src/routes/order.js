import { Router } from 'express';
const router = Router();

import Order from '../controllers/order/index.js';

router.post('/', Order.Create);
router.get('/', Order.List);
router.get('/my-orders', Order.GetMyOrders);

export default router;