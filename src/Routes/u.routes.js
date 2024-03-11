import { Router } from 'express';
import { redirectOriginalUrl } from '../Controllers/u.controller.js';

/**
    * Module for defining routes related to shortened URLs.
    * @module uRoutes
*/
const router = Router();

/**
    * Route handler for redirecting to the original URL associated with a shortened code.
    * @name GET/api/v1/u/:shortenedCode
    * @function
    * @memberof module:uRoutes
    * @param {string} shortenedCode - The shortened code corresponding to the original URL.
    * @returns {void}
*/
router.get('/:shortenedCode', redirectOriginalUrl);

export default router;
