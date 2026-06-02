import User from "../models/user.model.js";

class UserRepo {
  findById = (_id) => User.findById(_id);

  findByEmail = (email) => User.findOne({ email });

  findByRole = (role) => User.find({ role });

  create = (userData) => User.create(userData);

  update = ({ _id, updatedData }) => {
    const { _id: _, ...cleanData } = updatedData;

    return User.findByIdAndUpdate(
      _id,
      { $set: cleanData },
      { returnDocument: "after", runValidators: true },
    );
  };
}

export default UserRepo;
