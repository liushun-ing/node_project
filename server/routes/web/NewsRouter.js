var express = require("express");
const NewsController = require("../../controllers/web/NewsController");
var WebNewsRouter = express.Router();

WebNewsRouter.get("/webapi/news/list", NewsController.getList);
WebNewsRouter.get("/webapi/news/toplist", NewsController.getTopList);
WebNewsRouter.get("/webapi/news/list/:id", NewsController.getList);

module.exports = WebNewsRouter;
