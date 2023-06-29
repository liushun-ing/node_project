const NewsService = require("../../services/web/NewsService");
const ResponseUtil = require("../../util/ResponseUtil");

const NewsController = {
  getList: async (req, res) => {
    const result = await NewsService.getList(req.params.id);
    res.send(ResponseUtil.generateSuccess(result));
  },
  getTopList: async (req, res) => {
    const result = await NewsService.getTopList(req.params.limit);
    res.send(ResponseUtil.generateSuccess(result));
  }
};

module.exports = NewsController;
