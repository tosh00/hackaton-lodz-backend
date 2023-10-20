import express from 'express';
import controller from '../controllers/User'
import userAuthenticate from '../library/Authentication';

const router = express.Router();

router.get('/cc', userAuthenticate, controller.readUserCC);
router.get('/history', controller.readAll);

export = router;