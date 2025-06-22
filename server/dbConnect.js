import mongoose from "mongoose";
function dbConnect() {
  mongoose
    .connect(
      "mongodb+srv://shijushijas157:I5Qt4ApziFPRt7t9@cluster0.dweziwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((result) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("data base error \n" + err);
    });
}
export default dbConnect;