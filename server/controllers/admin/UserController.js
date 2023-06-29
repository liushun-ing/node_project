const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");
const CommonConstants = require("../../util/CommonConstants");
const ResponseUtil = require("../../util/ResponseUtil");

const UserController = {
  login: async (req, res) => {
    const result = await UserService.login(req.body);
    if (result.length === 0) {
      res.send(ResponseUtil.generateError(null, "用户名密码不匹配"));
    } else {
      const token = JWT.generate(
        {
          _id: result[0]._id,
          username: result[0].username,
        },
        CommonConstants.ExpireTime
      );
      res.header("Authorization", token);
      res.send(
        ResponseUtil.generateSuccess({
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0,
          introduction: result[0].introduction,
          avatar: result[0].avatar,
          role: result[0].role,
        })
      );
    }
  },
  upload: async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = JWT.verify(token);
    const avatar = req.file ? `/avatar_uploads/${req.file.filename}` : "";
    const { username, gender, introduction } = req.body;
    const result = await UserService.upload({
      _id: payload._id,
      username,
      introduction,
      gender: Number(gender),
      avatar,
    });
    if (result.modifiedCount === 1) {
      avatar
        ? res.send(
            ResponseUtil.generateSuccess({
              username,
              introduction,
              gender: Number(gender),
              avatar,
            })
          )
        : res.send(
            ResponseUtil.generateSuccess({
              username,
              introduction,
              gender: Number(gender),
            })
          );
    } else {
      res.send(ResponseUtil.generateError());
    }
  },
  add: async (req, res) => {
    const avatar = req.file ? `/avatar_uploads/${req.file.filename}` : "";
    const { username, gender, introduction, role, password } = req.body;
    const result = await UserService.add({
      username,
      introduction,
      gender: Number(gender),
      role: Number(role),
      password,
      avatar,
    });
    if (result) {
      res.send(ResponseUtil.generateSuccess());
    } else {
      res.send(ResponseUtil.generateError());
    }
  },
  getList: async (req, res) => {
    const result = await UserService.getList(req.params);
    res.send(ResponseUtil.generateSuccess(result));
  },
  deleteUser: async (req, res) => {
    const result = await UserService.deleteUser(req.params.id)
    if (result.deletedCount === 1) {
      res.send(ResponseUtil.generateSuccess());
    } else {
      res.send(ResponseUtil.generateError());
    }
  },
  editUser: async (req, res) => {
    const result = await UserService.editUser(req.params.id, req.body)
    if (result.modifiedCount === 1) {
      res.send(ResponseUtil.generateSuccess());
    } else {
      res.send(ResponseUtil.generateError());
    }
  }
};

module.exports = UserController;
