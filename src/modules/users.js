import { UsersModel } from "../models/users";

let UserModule = {
  async getById(id) {
    let user = UsersModel.filter((user) => {
      return user.id == id;
    });
    if (user.length <= 0) return null;
    return user[0];
  },
};

export { UserModule };
