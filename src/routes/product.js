import { Router } from "express";
const router = Router();

import Product from "../controllers/product/index.js";

import grantAccess from "../middlewares/grantAccess.js";
import { verifyAccessToken } from "../helpers/jwt.js";
import { upload } from "../helpers/multer.js";
// import { upload }  from "../helpers/s3.js";

/**
 * @swagger
 * '/api/product':
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: To create a new product
 *     description: This api is used to create a new product
 *     tags: [Product]
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - price
 *              - images
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              price:
 *                type: string
 *              images:
 *                type: array
 *                items:
 *                  type: file
 *     responses:
 *         201:
 *             description: To create a new product
 */
router.post("/", verifyAccessToken, grantAccess("createAny", "product"), upload, Product.Create); // with multer
// router.post("/", verifyAccessToken, grantAccess("createAny", "product"), upload, Product.CreateWithS3); // with s3
router.get("/:product_id", Product.Get);

router.get("/", Product.GetList);
router.put("/:product_id", verifyAccessToken, grantAccess("updateAny", "product"), Product.Update);
router.delete("/:product_id", verifyAccessToken, grantAccess("deleteAny", "product"), Product.Delete);

export default router;
