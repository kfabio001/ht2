import { Router } from 'express';
const router = Router();

import { login, register,getUser } from '../controllers/user.controller';



router.route('/registro').post(register);
router.route('/login').post(login);
router.route('/getUsuarios').get(getUser);

//import { getCart, confirmRequest, cleanCart } from '../controllers/cart.controller';
//router.route('/cart/:email').get(getCart);
//router.route('/cart').post(confirmRequest);
//router.route('/cleanCart').post(cleanCart);

export default router;