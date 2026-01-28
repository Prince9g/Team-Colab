import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./db/db.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
// import taskRoutes from "../routes/task.routes.js"


dotenv.config()
connectDB()


const app= express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/user',userRoutes)
//app.use('/api/task',taskRoutes)
const PORT=5000;



app.listen(PORT,console.log(`server is started on ${PORT}`));