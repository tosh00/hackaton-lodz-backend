import express from 'express';
import controller from '../controllers/User'
import userAuthenticate from '../library/Authentication';

const router = express.Router();

router.get('/history', userAuthenticate, controller.readAll);
router.get('/solution', userAuthenticate,  controller.CCBySolution);
router.get('/cc', userAuthenticate,  controller.readUserCC);
router.post('/cc', userAuthenticate, controller.spendCC);

export = router;