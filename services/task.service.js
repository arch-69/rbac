import ApiError from "../utils/ApiError.js";

class TaskService {
  constructor({ taskRepo }) {
    this.taskRepo = taskRepo;
  }

  async create({ title, description, _id }) {
    if (!title || !_id)
      throw new ApiError(400, "Insufficient Data: title is required");

    try {
      let task = {};
      task.title = title;
      if (description != undefined) task.description = description;
      task.createdBy = _id;
      const response = this.taskRepo.create(task);
      return response;
    } catch (error) {
      throw new ApiError(500, error.message, error.errors);
    }
  }
}

export default TaskService;
