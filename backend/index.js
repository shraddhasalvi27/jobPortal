import express from "express";
import cookieParser from "cookie-parser";
// cookie parser is used when client send data in cookies like token-authentication,session ID
import cors from "cors";  
//cors are used in cross origin resource share expample one port of frontend to another port of backend
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import exp from "constants";
const app = express();
dotenv.config({});
const PORT = process.env.PORT||3001;

const __dirname = path.resolve();

// middlewares
app.use(express.json()); //parse json into js objects
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption = {
    origin: "https://hiresphere-xwm5.onrender.com",
    credentials: true
}
app.use(cors(corsOption));

//api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get('*',(_ ,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`port is running on http://localhost:${PORT}`);
});

