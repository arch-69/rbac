import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db.config.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
