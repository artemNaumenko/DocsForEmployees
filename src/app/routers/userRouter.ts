import {Router} from "express"
import {
    addUserController,
    checkIfUserExistController, deleteUserController,
    getAllUsersExceptMeController, getUsersDoNotHaveAccessToFileController, getUsersHaveAccessToFileController,
    loginController, revokeAccessToFileController
} from "../controllers/userController";
import {isAuthorized} from "../middlewares/isAuthotized";
import {hasRole} from "../middlewares/hasRole"

export const router: Router = Router();

router.post("/login", loginController)

router.get("/getAllUsersExceptMe", isAuthorized, hasRole("ADMIN"), getAllUsersExceptMeController)
router.post("/addNewUser", isAuthorized, hasRole("ADMIN"), addUserController)
router.get("/checkIfUserExists", isAuthorized, hasRole("ADMIN"), checkIfUserExistController)

router.get("/getUsersHaveAccessToFile", isAuthorized, hasRole("ADMIN"), getUsersHaveAccessToFileController)
router.get("/getUsersDoNotHaveAccessToFile", isAuthorized, hasRole("ADMIN"), getUsersDoNotHaveAccessToFileController)

router.delete("/revokeAccessToFile", isAuthorized, hasRole("ADMIN"), revokeAccessToFileController)

router.delete("/deleteUser", isAuthorized, hasRole("ADMIN"), deleteUserController)

