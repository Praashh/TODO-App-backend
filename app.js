import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors"

export const app = express();

config({
    path:"./data/config.env",
})

// using middle ware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  orgin:[process.env.FRONTEND_URL],
  mathods:["GET", "PUT" ,"POST", "DELETE"],
  credentials:true,
}));

app.use("/api/v1/users",userRouter);
app.use("/api/v2/task",taskRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

// Using Error Middle Ware 
app.use(errorMiddleware)