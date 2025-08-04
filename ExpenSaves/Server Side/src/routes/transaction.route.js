import { Router } from "express";
import { TokenRefresh, userLogout } from "../controllers/user.controller.js";

const transactionRouter = Router();

// transactionRouter.route("/home").post();
// transactionRouter.route("/home").get();
// transactionRouter.route("/statistics").get();
// transactionRouter.route("/history").get();
// transactionRouter.route("/reminders").post();
// transactionRouter.route("/reminders").get();
// transactionRouter.route("/logout").get(userLogout);
// transactionRouter.route("/refresh").get(TokenRefresh);

export default transactionRouter;