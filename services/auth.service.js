import UserRepo from "../repositories/user.repo.js";
import ApiError from "../utils/ApiError.js";

class AuthService {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  register = async ({ name, email, password, avatar }) => {
    const user = await this.userRepo.findByEmail(email);

    if (user) throw new ApiError(409, "User already exist");
    const userdata = {};
    if (name !== undefined) userdata.name = name;
    if (email !== undefined) userdata.email = email;
    if (password !== undefined) userdata.password = password;
    if (avatar !== undefined) userdata.avatar = avatar;

    const response = await this.userRepo.create(userdata);

    return response;
  };
}

export default AuthService;
