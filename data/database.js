import mongoose from "mongoose";
// Data base adding here

export const connectDB = ()=>{
    mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "backendapi",
  })
  .then((c) => console.log(`DataBase Added with ${c.connection.host}`))
  .catch((e) => console.log(e));
};