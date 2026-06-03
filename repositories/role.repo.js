import Role from "../models/role.model.js";

class RoleRepo {
  findById = (_id) => Role.findById(_id);
  findByRole = (role) => Role.findOne({ name: role });
  findAllRole = () => Role.find();
  create = (role) => Role.create(role);
  updateRole = (_id, updatedRole) =>
    Role.findByIdAndUpdate(_id, updatedRole, { returnDocument: "after" });
}

export default RoleRepo;
