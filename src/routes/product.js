const express = require("express");
const router = express.Router();

const Product = require("../controllers/product");

const grantAccess = require("../middlewares/grantAccess");
const { verifyAccessToken } = require("../helpers/jwt");

router.post("/", verifyAccessToken, grantAccess("createAny", "product"), Product.Create);
router.get("/:product_id", Product.Get);

router.get("/", Product.GetList);
router.put("/:product_id", verifyAccessToken, grantAccess("updateAny", "product"), Product.Update);
router.delete("/:product_id", verifyAccessToken, grantAccess("deleteAny", "product"), Product.Delete);

module.exports = router;
