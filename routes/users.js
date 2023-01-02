var express = require("express");
var router = express.Router();
var usersApiController = require("../../controllers/api/users");
var routeHelper = require('../../helpers/routeHelper');
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
*    User:
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
  *   name: Users
  *   description: The users managing API
  */

 
 /**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get the user by token
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token user
 *     responses:
 *       200:
 *         description: The user description by token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: The users was not founds
 *       500:
 *         description: Some server error
 */ 
router.get("/me", routeHelper.ensureJson, usersApiController.getByToken);

  /**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Get the user by uid
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token user
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user uid
 *     responses:
 *       200:
 *         description: The user description by uid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: The users was not found
*       500:
 *         description: Some server error
 */ 
router.get("/:uid", routeHelper.ensureJson, usersApiController.getById);


  

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                registrationToken:
 *                  type: string
 *                  description: the device registration Token  
 *     responses:
 *       200:
 *         description: new user registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Some server error
 */
router.post("/register", routeHelper.ensureJson,  usersApiController.register);



/**
 * @swagger
 * /api/users/verifiedsms:
 *   post:
 *     summary: Register verified sms en true by token
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token user
 *     responses:
 *       200:
 *         description: The verifiedsms succefully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: The users was not founds
 *       500:
 *         description: Some server error
 */ 
router.post("/verifiedsms", routeHelper.ensureJson, usersApiController.verifiedSms);


/**
 * @swagger
 * /api/users/upload:
 *   post:
 *     summary: Upload picture by token
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token user
 *     requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *           required: true
 *           schema:
 *              type: object
 *              properties:
 *                  picture:
 *                      type: string
 *                      format: binary
 *     responses:
 *       200:
 *         description: The  upload picture succefully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: The user was not founds
 *       500:
 *         description: Some server error
 */ 


router.post("/upload", routeHelper.ensureMultipart, usersApiController.upload);


/**
 * @swagger
 * /api/users/update/{uid}:
 *  patch:
 *    summary: Update the user by the uid
 *    tags: [Users]
 *    parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token user
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user uid
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.patch("/update/:uid", routeHelper.ensureJson, usersApiController.update);



 /**
 * @swagger
 * /api/users/hideUser:
 *  post:
 *    summary: Hide user
 *    tags: [Users]
 *    parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token user
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                uidUserHide:
 *                  type: string
 *                  description: the user uid to hide 
 *    responses:
 *      200:
 *        description: The user was successfully hidden
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.post("/hideUser", routeHelper.ensureJson, usersApiController.hideUser);


 /**
 * @swagger
 * /api/users/showUser:
 *  post:
 *    summary: Show user
 *    tags: [Users]
 *    parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token user
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                uidUserShow:
 *                  type: string
 *                  description: the user uid to show 
 *    responses:
 *      200:
 *        description: The user was successfully hidden
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.post("/showUser", routeHelper.ensureJson, usersApiController.showUser);


module.exports = router;
