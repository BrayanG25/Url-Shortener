import { Router } from 'express';
import { getUrl, createUrl, updateUrl, deleteUrl } from '../Controllers/shorten.controller.js';

const router = Router();

router.get('/', getUrl);
router.get('/:id', getUrl);
router.post('/', createUrl);
router.put('/:id', updateUrl);
router.patch('/:id', updateUrl);
router.delete('/:id', deleteUrl);

export default router;
