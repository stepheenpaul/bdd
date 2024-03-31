import express from "express";
import { getLogout, getLogin, getLogin_post, getRegister, getRegister_post } from "../controllers/authController.js";

const router = express.Router();

router.route("/login").get(getLogin).post(getLogin_post);
router.route("/register").get(getRegister).post(getRegister_post);
router.get("/logout", getLogout);

export default router;