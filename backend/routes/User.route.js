import express from 'express';
import { login, register, updateProfile } from '../controllers/Users.controllers';
import isAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile/update').post(isAuthenticated, updateProfile)

export default router;