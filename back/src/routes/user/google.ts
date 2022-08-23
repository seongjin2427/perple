import { Router } from "express";
import { getGoogleCode, getGoogleToken } from "@/src/controllers/user/google";

const router = Router();

router.get('/', getGoogleCode);
router.get('/callback', getGoogleToken);


export default router;