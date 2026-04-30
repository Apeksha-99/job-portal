import express from 'express';
import isAuthenticated from '../middlewares/IsAuthenticated';
import { getAdminJobs, getAlljobs, getJobById, postJob } from '../controllers/Job.controllers';


const router = express.Router();

router.route('/post').post(isAuthenticated ,postJob);
router.route('/get').get(isAuthenticated, getAlljobs)
router.route('/getadminjobs').post(isAuthenticated, getAdminJobs)
router.route('/get/:id').post(isAuthenticated, getJobById)

export default router; 