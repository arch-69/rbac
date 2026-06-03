import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

class User {
  constructor({ userService }) {
    this.userService = userService;
  }

  createRole = AsyncHandler(async (req, res) => {
    console.log("Request Body from CREATEROLE: ", req.body);
    const response = await this.userService.createRole(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "Role created successfully!!", response));
  });
}

export default User;
