import { Router } from 'express';
import { getUrl, createUrl, updateUrl, deleteUrl } from '../Controllers/shorten.controller.js';

/**
    * Module for defining routes related to URL shortening operations.
    * @module shortenRoutes
*/
const router = Router();

/**
    * Route handler for retrieving URL records.
    * @name GET/api/v1/shorten
    * @function
    * @memberof module:shortenRoutes
    * @returns {void}
*/
router.get('/', getUrl);

/**
    * Route handler for retrieving a specific URL record by ID.
    * @name GET/api/v1/shorten/:id
    * @function
    * @memberof module:shortenRoutes
    * @param {string} id - The ID of the URL record to retrieve.
    * @returns {void}
*/
router.get('/:id', getUrl);

/**
    * Route handler for creating a new shortened URL.
    * @name POST/api/v1/shorten
    * @function
    * @memberof module:shortenRoutes
    * @returns {void}
*/
router.post('/', createUrl);

/**
    * Route handler for updating an existing URL record.
    * @name PUT/api/v1/shorten/:id
    * @function
    * @memberof module:shortenRoutes
    * @param {string} id - The ID of the URL record to update.
    * @returns {void}
*/
router.put('/:id', updateUrl);

/**
    * Route handler for partially updating an existing URL record.
    * @name PATCH/api/v1/shorten/:id
    * @function
    * @memberof module:shortenRoutes
    * @param {string} id - The ID of the URL record to update.
    * @returns {void}
*/
router.patch('/:id', updateUrl);

/**
    * Route handler for deleting an existing URL record.
    * @name DELETE/api/v1/shorten/:id
    * @function
    * @memberof module:shortenRoutes
    * @param {string} id - The ID of the URL record to delete.
    * @returns {void}
*/
router.delete('/:id', deleteUrl);

export default router;
