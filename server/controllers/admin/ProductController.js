const ProductService = require("../../services/admin/ProductService");
const ResponseUtil = require("../../util/ResponseUtil");
const JWT = require("../../util/JWT");

const ProductController = {
  add: async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = JWT.verify(token);
    const cover = req.file ? `/product_uploads/${req.file.filename}` : "";
    const { title, introduction, detail } = req.body;
    const result = await ProductService.add({
      title,
      introduction,
      detail,
      cover,
      createUser: payload._id
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
    const result = await ProductService.getList(req.params.id, payload._id);
    res.send(ResponseUtil.generateSuccess(result));
  },
  deleteProduct: async (req, res) => {
    const result = await ProductService.deleteProduct(req.params.id);
    if (result.deletedCount === 1) {
      res.send(ResponseUtil.generateSuccess());
    } else {
      res.send(ResponseUtil.generateError());
    }
  },
  editProduct: async (req, res) => {
    const cover = req.file ? `/product_uploads/${req.file.filename}` : "";
    const { _id, title, introduction, detail } = req.body;
    const result = await ProductService.editProduct({
      _id,
      title,
      introduction,
      detail,
      cover
    });
    if (result.modifiedCount === 1) {
      res.send(ResponseUtil.generateSuccess());
    } else {
      res.send(ResponseUtil.generateError());
    }
  },
};

module.exports = ProductController;
