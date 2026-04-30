import express from 'express';
import isAuthenticated from '../middlewares/IsAuthenticated';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/Company.controller';

const router = express.Router();

router.route('/register').post(isAuthenticated ,registerCompany)
router.route('/get').get(getCompany)
router.route('/get/:id').get(getCompanyById)
router.route('/update/:id').put(isAuthenticated, updateCompany)

export default router; 