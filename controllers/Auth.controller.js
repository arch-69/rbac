import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

class Auth {
  constructor({ authService }) {
    this.authService = authService;
  }

  register = AsyncHandler(async (req, res) => {
    console.log("Registration Controller Request Body: ", req.body);
    const response = await this.authService.register(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "User Registration Successfully!!", response));
  });

  login = AsyncHandler(async (req, res) => {});
  refresh = AsyncHandler(async (req, res) => {});
  logout = AsyncHandler(async (req, res) => {});
}

export default Auth;
