import { Router } from "express";
import { userLogout } from "../controllers/user.controller.js";
import { addTransaction, getHistory } from "../controllers/transactions.controller.js";
import { addReminder, getReminders } from "../controllers/reminders.controller.js";
import { refreshTokens } from "../middleware/refreshToken.middleware.js"

const transactionRouter = Router();

 transactionRouter.route("/home").post(refreshTokens, addTransaction);
 transactionRouter.route("/home").get(refreshTokens, getHistory);
 transactionRouter.route("/statistics").get(refreshTokens, getHistory);
 transactionRouter.route("/history").get(refreshTokens, getHistory);
 transactionRouter.route("/reminders").post(refreshTokens, addReminder);
 transactionRouter.route("/reminders").get(refreshTokens, getReminders);
 transactionRouter.route("/logout").get(refreshTokens, userLogout);

export default transactionRouter;