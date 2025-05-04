import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// ROUTES IMPORTS
import userRoutes from "./routes/user.routes";
import { errorMiddleWare } from "./middlewares/error";

// APP INTIALIZATION
const app = express();
const server = http.createServer(app);

// CORS
app.use(cors());

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/user", userRoutes);

// ERROR MIDDLEWARE
app.use(errorMiddleWare);

export default server;
