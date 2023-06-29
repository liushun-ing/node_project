var express = require("express");
const ProductController = require("../../controllers/web/ProductController");
var WebProductRouter = express.Router();

WebProductRouter.get("/webapi/product/list", ProductController.getList);
WebProductRouter.get("/webapi/product/list/:id", ProductController.getList);

module.exports = WebProductRouter;
