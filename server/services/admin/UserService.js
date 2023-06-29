const UserModel = require("../../models/UserModel");

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.find({
      username,
      password,
    });
  },
  upload: async ({ _id, username, gender, introduction, avatar }) => {
    return avatar
      ? UserModel.updateOne(
          {
            _id,
          },
          {
            username,
            gender,
            introduction,
            avatar,
          }
        )
      : UserModel.updateOne(
          {
            _id,
          },
          {
            username,
            gender,
            introduction,
          }
        );
  },
  add: async ({ username, introduction, gender, role, password, avatar }) => {
    return UserModel.create({
      username,
      introduction,
      gender,
      role,
      password,
      avatar,
    });
  },
  getList: async ({ id }) => {
    return id
      ? UserModel.find({ _id: id }, [
          "username",
          "gender",
          "role",
          "introduction",
          "_id",
          "avatar",
          "password",
        ])
      : UserModel.find({}, [
          "username",
          "gender",
          "role",
          "introduction",
          "_id",
          "avatar",
        ]);
  },
  deleteUser: async (_id) => {
    return UserModel.deleteOne({
      _id,
    });
  },
  editUser: async (id, form) => {
    return UserModel.updateOne({_id: id}, {
      username: form.username,
      password: form.password,
      introduction: form.introduction,
      gender: form.gender,
      role: form.role
    })
  }
};

module.exports = UserService;
