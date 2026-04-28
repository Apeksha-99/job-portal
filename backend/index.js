import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({})
import userRoute from "./routes/User.route.js"

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsoptions = {
    origin:'http//localhost:5173',
    credentials:true
}
app.use(cors(corsoptions));

const PORT = process.env.PORT || 3000;

// API's
app.use("/api/v1/user", userRoute)

app.listen(PORT, () => {
    connectDB();
    console.log(`server running at port ${PORT}`);
});