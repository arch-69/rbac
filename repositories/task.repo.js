import Task from "../models/task.model.js";

class TaskRepo {
  findById = (_id) => Task.findById(_id);

  create = (task) => Task.create(task);

  update = (_id, updatedTask) =>
    Task.findByIdAndUpdate(_id, updatedTask, {
      returnDocument: "after",
      runValidators: true,
    });

  delete = (_id) => Task.findByIdAndDelete(_id, { projection: { title: 1 } });

  findByStatus = (status) =>
    Task.find({
      status,
    });
}

export default TaskRepo;
