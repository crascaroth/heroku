import { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { userRouter } from "./Routes/userRouter"
import { appointmentRouter } from "./Routes/appointmentRouter"
import { reportRouter } from "./Routes/reportRouter"
import express from "express"

dotenv.config()
const app: Express = express()
app.use(express.json())
app.use(cors())

app.listen(5432, () => {
    console.log("Server running on port 3003")
})

app.use("/user", userRouter);
app.use("/appointment", appointmentRouter);
app.use("/report", reportRouter);
