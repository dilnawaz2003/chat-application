import express from "express";
import userController from "../controllers/user.controller";
import { multerMemoryUpload } from "../middlewares/multer";
import authenticateUser from "../middlewares/authenticate-user";

const app = express.Router();

app.post("/signup", multerMemoryUpload.single("avatar"), userController.signUp);
app.post("/login", userController.signUp);
app.post("/me", authenticateUser, userController.signUp);
export default app;
