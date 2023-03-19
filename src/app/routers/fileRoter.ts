import {Router} from "express"
import {
    addPermissionToFileController,
    deleteFideController,
    getAllAvailableFilesController,
    getAllFilesController, getFilesUserDoesNotHaveAccessController,
    getFilesUserHasAccessController,
    getLinkOfFileByNameController,
    markAsReadController,
    postFileController
} from "../controllers/fileController";
import bodyParser from "body-parser";
import {isAuthorized} from "../middlewares/isAuthotized";
import {hasRole} from "../middlewares/hasRole";

export const router: Router = Router();
const byteParser = bodyParser.raw({ limit: '50mb'})

router.post("/postFile", byteParser, isAuthorized, hasRole("ADMIN"), postFileController)
router.get("/getLinkOfFile", isAuthorized, getLinkOfFileByNameController)
router.get("/getAllAvailableFiles", isAuthorized, getAllAvailableFilesController)
router.get("/getAllFiles", isAuthorized, hasRole("ADMIN"), getAllFilesController)

router.get("/getFilesUserHaveAccess", isAuthorized, hasRole("ADMIN"), getFilesUserHasAccessController)
router.get("/getFilesUserDoNotHaveAccess", isAuthorized, hasRole("ADMIN"), getFilesUserDoesNotHaveAccessController)

router.post("/addAccess", isAuthorized, hasRole("ADMIN"), addPermissionToFileController)
router.patch("/markAsRead", isAuthorized, markAsReadController)

router.delete("/deleteFile", isAuthorized, hasRole("ADMIN"), deleteFideController)

