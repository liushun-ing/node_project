var express = require("express");
const ProductController = require("../../controllers/admin/ProductController");
const multer = require("multer");
const upload = multer({ dest: "public/product_uploads/" });
var ProductRouter = express.Router();

ProductRouter.post(
  "/adminapi/product/add",
  upload.single("file"),
  ProductController.add
);
ProductRouter.post(
  "/adminapi/product/list/",
  upload.single("file"),
  ProductController.editProduct
);
ProductRouter.get("/adminapi/product/list", ProductController.getList);
ProductRouter.get("/adminapi/product/list/:id", ProductController.getList);
ProductRouter.delete("/adminapi/product/list/:id", ProductController.deleteProduct);

module.exports = ProductRouter;
