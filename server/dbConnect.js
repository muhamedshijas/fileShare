import mongoose from "mongoose";
function dbConnect() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((result) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("data base error \n" + err);
    });
}
export default dbConnect;
