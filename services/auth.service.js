import UserRepo from "../repositories/user.repo.js";
import ApiError from "../utils/ApiError.js";
import generaterApiKey from "../utils/generateApiKey.js";
import generateHash from "../utils/GenerateHash.js";

class AuthService {
  constructor({ userRepo, roleRepo }) {
    this.userRepo = userRepo;
    this.roleRepo = roleRepo;
  }

  register = async ({ name, email, password, avatar }) => {
    const user = await this.userRepo.findByEmail(email);
    let role = await this.roleRepo.findByRole("user");
    if (!role) {
      role = await this.roleRepo.create({
        name: "user",
        permissions: ["task:create", "task:update", "task:delete"],
      });
    }

    if (user) throw new ApiError(409, "User already exist");
    const userdata = {};
    if (name !== undefined) userdata.name = name;
    if (email !== undefined) userdata.email = email;
    if (password !== undefined) userdata.password = password;
    if (avatar !== undefined) userdata.avatar = avatar;
    if (role) userdata.role = await role._id;
    userdata.apiKeyHash = generateHash(generaterApiKey());

    const response = await this.userRepo.create(userdata);

    return response;
  };
}

export default AuthService;
