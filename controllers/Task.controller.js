import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

class Task {
  constructor({ taskService }) {
    this.taskService = taskService;
  }

  createTask = AsyncHandler(async (req, res) => {
    const _id = req.user._id;
    const response = await this.taskService.create({ _id, ...req.body });
    return res
      .status(201)
      .json(new ApiResponse(201, "Task created successfully!!", response));
  });
}

export default Task;
