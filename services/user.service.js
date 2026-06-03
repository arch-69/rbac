import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

class UserService {
  constructor({ userRepo, roleRepo }) {
    this.userRepo = userRepo;
    this.roleRepo = roleRepo;
  }

  updateRole = async (userId, roleId) => {
    if (!userId && !roleId)
      throw new ApiError(
        400,
        "Incosistent Data: no role_id and user_id provided",
      );

    try {
      const role = await this.roleRepo.findById(roleId);
      if (!role) throw new ApiError(404, "Not Found: role not found");
      const updatedData = { role: role._id };
      const response = await this.userRepo.update({ _id: userId, updatedData });
      return response;
    } catch (error) {
      throw new ApiError(500, error.message, error.errors);
    }
  };

  createRole = async ({ role, permissions }) => {
    if (!role || !permissions)
      throw new ApiError(
        400,
        "Insufficient Data: no role and permission is provided",
      );
    try {
      const isRole = await this.roleRepo.findByRole(role);
      if (isRole) throw new ApiError(409, "Already Exist: role already exist");
      const response = this.roleRepo.create({ name: role, permissions });
      return response;
    } catch (error) {
      throw new ApiError(500, error.message, error.errors);
    }
  };
}

export default UserService;
