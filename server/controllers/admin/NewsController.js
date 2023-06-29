const NewsService = require("../../services/admin/NewsService");
const ResponseUtil = require("../../util/ResponseUtil");
const JWT = require("../../util/JWT");

const NewsController = {
  add: async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = JWT.verify(token);
    const cover = req.file ? `/news_uploads/${req.file.filename}` : "";
    const { title, content, category, isPublish } = req.body;
    const result = await NewsService.add({
      createUser: payload._id,
      title,
      content,
      cover,
      category: Number(category),
      isPublish: Number(isPublish),
    });
    if (result) {
      res.send(ResponseUtil.generateSuccess());
    } else {
      res.send(ResponseUtil.generateError());
    }
  },
  getList: async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = JWT.verify(token);
    const result = await NewsService.getList(req.params.id, payload._id);
    res.send(ResponseUtil.generateSuccess(result));
  },
  publish: async (req, res) => {
    const result = await NewsService.publish({
      ...req.body,
      editTime: new Date(),
    });
    if (result.modifiedCount === 1) {
      res.send(ResponseUtil.generateSuccess());
    } else {
      res.send(ResponseUtil.generateError());
    }
  },
  deleteNews: async (req, res) => {
    const result = await NewsService.deleteNews(req.params.id);
    if (result.deletedCount === 1) {
      res.send(ResponseUtil.generateSuccess());
    } else {
      res.send(ResponseUtil.generateError());
    }
  },
  editNews: async (req, res) => {
    const cover = req.file ? `/news_uploads/${req.file.filename}` : "";
    const { _id, title, content, category, isPublish } = req.body;
    const result = await NewsService.editNews({
      _id,
      title,
      content,
      cover,
      category: Number(category),
      isPublish: Number(isPublish),
      editTime: new Date(),
    });
    if (result.modifiedCount === 1) {
      res.send(ResponseUtil.generateSuccess());
    } else {
      res.send(ResponseUtil.generateError());
    }
  },
};

module.exports = NewsController;
