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

 
//User
/**
* @swagger
* components:
*  schemas:
*    Course:
*       type: object
*       properties:
*           uid:
*               type: string
*               description: the user UID
*           displayName:
*               type: string
*               description: the user Display Name
*           email:
*               type: string
*               description: the user Email
*           phoneNumber:
*               type: string
*               description: the user Phone Number
*           photoURL:
*               type: string
*               description: the user Photo URL
*           lang:
*               type: string
*               description: the user laguage selected
*           state:
*               type: string
*               description: the user state (Initial - Remove - Suspend)
*           registrationToken:
*               type: string
*               description: the user IMEI
*           notificationSettings:
*               type: object
*               description: the user notifications setting 
*               properties:
*                   likes:
*                       type: boolean
*                   tags:
*                       type: boolean
*                   comments:
*                       type: boolean
*                   newPost:
*                       type: boolean
*           usersHidden:
*               type: array
*               description: Array of users object
*       required:
*           - uid
*           - displayName
*           - email
*       example:
*           uid: LOEz6fWwF6bQmnp0Ixspo9KcMSr1
*           displayName: Alan Kay
*           email: alan@mail.com   
*           photoURL: https://www.example.com/image.jpg
*           phoneNumber: +549113230323
*           lang: HE
*           state: Initial
*           registrationToken : XXXX
*           usersHidden : [{ uid: XXX , displayName : John L , email: john@gmail.com }]
*           notificationSettings:
*               likes : true
*               tags: false
*               comments: true
*               newPost: true
*
*/

 /**
  * @swagger
  * tags:
  *   name: Collections
  *   description: The courses managing API
  */

  router.get("/:collectionId/items", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);
  router.post("/:collectionId/items", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);
  router.post("/:collectionId/items/limit/:limit", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);
  router.post("/:collectionId/items/limit/:limit/offset/:offset", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);
  router.post("/:collectionId/items/offset/:offset", routeHelper.ensureJson, cacheHelper.checkCache, collectionApiController.getAllItems);

  module.exports = router;
