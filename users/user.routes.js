import express, {Router} from "express"
import {signup, signin, userInfo} from "./user.controllers";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router()

router.post('/register', signup)
router.post('/login', signin)
router.post('/user-info', authMiddleware, userInfo)

export default router