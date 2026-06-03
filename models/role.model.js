import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },

    permissions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Role", roleSchema);
