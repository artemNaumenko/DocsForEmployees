import {Router} from "express"
import {getLinkOfFileByNameController, postFileController} from "../controllers/fileController";
import bodyParser from "body-parser";

export const router: Router = Router();
const byteParser = bodyParser.raw({ limit: '50mb'})

router.post("/postFile", byteParser, postFileController)
router.get("/getFile", getLinkOfFileByNameController)