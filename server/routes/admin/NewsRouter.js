var express = require("express");
const NewsController = require("../../controllers/admin/NewsController");
const multer = require("multer");
const upload = multer({ dest: "public/news_uploads/" });
var NewsRouter = express.Router();

NewsRouter.post(
  "/adminapi/news/add",
  upload.single("file"),
  NewsController.add
);
NewsRouter.post(
  "/adminapi/news/list",
  upload.single("file"),
  NewsController.editNews
);
NewsRouter.get("/adminapi/news/list", NewsController.getList);
NewsRouter.get("/adminapi/news/list/:id", NewsController.getList);
NewsRouter.put("/adminapi/news/publish", NewsController.publish);
NewsRouter.delete("/adminapi/news/list/:id", NewsController.deleteNews);
// NewsRouter.put("/adminapi/user/list/:id", NewsController.editNews);

module.exports = NewsRouter;
