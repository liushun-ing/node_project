const ProductModel = require("../../models/ProductModel");

const ProductService = {
  getList: async (id) => {
    return id
      ? ProductModel.find({ _id: id })
      : ProductModel.find().sort({ editTime: -1 });
  },
};

module.exports = ProductService;
