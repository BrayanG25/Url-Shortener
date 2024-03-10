import { Router } from 'express';
import { redirectOriginalUrl } from '../Controllers/u.controller.js';

const router = Router();

router.get('/:shortenedCode', redirectOriginalUrl);

export default router;
