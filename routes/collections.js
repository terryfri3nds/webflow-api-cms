var express = require("express");
var router = express.Router();
var collectionApiController = require("../controllers/collections");
var routeHelper = require('../helpers/routeHelper');
var cacheHelper = require('../helpers/cacheHelper');
/**
 * @swagger
 *  components:
 *  responses:
 *   UnauthorizedError:
 *     description: Access token is missing or invalid
 */

 /**
  * @swagger
  * tags:
  *   name: Collections
  *   description: The collections managing API
  */


  /**
  * @swagger
  * /api/{nameQuery}/{collectionId}/items:
  *   get:
  *     summary: Get items by collection
  *     tags: [Collections]
  *     parameters:
  *       - in: header
  *         name: token
  *         schema:
  *           type: string
  *         required: true
  *         description: The token api
  *       - in: path
  *         name: nameQuery
  *         schema:
  *           type: string
  *         required: true
  *         description: The fantasy name of query
  *       - in: path
  *         name: collectionId
  *         schema:
  *           type: string
  *         required: true
  *         description: The ID of collection
  *     requestBody:
  *        required: false
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                query:
  *                  type: string
  *                  description: Array of object
  *     responses:
  *       200:
  *         description: The user description by token
  *         content:
  *           application/json:
  *            schema:
  *              type: object
  *              properties:
  *                query:
  *                  type: string
  *                  description: Array of object
  *       401:
  *         $ref: '#/components/responses/UnauthorizedError'
  *       404:
  *         description: The users was not founds
  *       500:
  *         description: Some server error
  */ 
  router.get("/:collectionId/items", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);
  router.post("/:collectionId/items", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);
  router.post("/:collectionId/items/limit/:limit", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);
  router.post("/:collectionId/items/limit/:limit/offset/:offset", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);
  router.post("/:collectionId/items/offset/:offset", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);

  module.exports = router;
