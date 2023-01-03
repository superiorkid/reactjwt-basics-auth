import express, {Router} from "express"
import {signup, signin} from "./user.controllers";

const router = Router()

router.post('/register', signup)
router.post('/login', signin)

export default router