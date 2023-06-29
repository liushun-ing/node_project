const ProductService = require("../../services/web/ProductService");
const ResponseUtil = require("../../util/ResponseUtil");

const ProductController = {
  getList: async (req, res) => {
    const result = await ProductService.getList(req.params.id);
    res.send(ResponseUtil.generateSuccess(result));
  },
};

module.exports = ProductController;
