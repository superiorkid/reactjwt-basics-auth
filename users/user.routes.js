import express, {Router} from "express"
import {signup} from "./user.controllers";

const router = Router()

router.post('/register', signup)

export default router