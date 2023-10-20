import express from 'express';
import controller from '../controllers/LinkedApp'

const router = express.Router();

router.post('/', controller.createLinkedApp);
router.get('/:id', controller.readLinkedApp);
router.get('/', controller.readAll);
router.put('/:id', controller.updateLinkedApp)
router.delete('/:id', controller.deleteLinkedApp)

export = router;