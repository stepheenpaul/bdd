dotenv.config()

import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import path from "path"
import connectDB from "./config/db.js"

const app = express()
const PORT = process.env.PORT

// Middlewares
app.use(morgan("dev"));
connectDB();


app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("public")));

app.use(authRoutes);


app.listen(PORT, () => {
    console.log(`Listening on ${PORT} on ${process.env.NODE_ENV}`);
  });
  
  