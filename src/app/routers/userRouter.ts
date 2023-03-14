import {Router} from "express"
import {addUserController, getAllUsersController, loginController} from "../controllers/userController";
import {isAuthorized} from "../middlewares/isAuthotized";
import {hasRole} from "../middlewares/hasRole"

export const router: Router = Router();

router.post("/login", loginController)

router.get("/getAllUsers", isAuthorized, hasRole("ADMIN"), getAllUsersController)
router.post("/addNewUser", isAuthorized, hasRole("ADMIN"), addUserController)