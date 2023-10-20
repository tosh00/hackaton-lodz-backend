import express from 'express';
import controller from '../controllers/Item'

const router = express.Router();

router.post('/', controller.createItem);
router.get('/:id', controller.readItem);
router.get('/', controller.readAll);
router.put('/:id', controller.updateItem)
router.delete('/:id', controller.deleteItem)

export = router;