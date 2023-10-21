import express from 'express';
import controller from '../controllers/external'
import {apiAuthenticate} from '../library/Authentication';

const router = express.Router();

router.post('/cc', apiAuthenticate, controller.addCCToUser);

export = router;