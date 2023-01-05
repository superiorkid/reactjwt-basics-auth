import UserModels from "./user.models";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

require('dotenv').config()


/*
*
* API response pattern
* ========================
*
* {
*   status: "OK",
*   code: 200,
*   message: "lorem ipsum",
*   data: {
*       username
*       email
*       token
*       etc..
*   }
* }
*
* */

export const signup = async (req, res) => {
    const {username, email, password} = req.body
    try {
        // check username exists
        const usernameExists = await UserModels.findOne({username})
        if (usernameExists) {
            return res.status(409).json({
                status: "CONFLICT",
                code: 409,
                message: "Username already registered",
            })
        }

        // check email exists
        const emailExists = await UserModels.findOne({email})
        if (emailExists) {
            return res.status(409).json({
                status: "CONFLICT",
                code: 409,
                message: "Email already registered",
            })
        }

        // generate password hash
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new UserModels( {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).json({
            status: "CREATED",
            code: 201,
            message: "User created successfully",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "INTERNAL_SERVER_ERROR",
            code: 500,
            message: "Error creating user",
        })
    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body
    try {
        // check if user exists
        const user = await UserModels.findOne({email})
        if (!user) {
            return res.status(404).json({
                status: "NOT_FOUND",
                code: 404,
                message: "User does not exists"
            })
        }

        // load and compare hash password from database
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                status: "UNAUTHORIZED",
                code: 401,
                message: "Password is incorrect"
            })
        }

        // generate tokens expire in one day
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {
            expiresIn: "1d"
        })

        res.status(200).json({
            status: "OK",
            code: 200,
            message: "Logged in successfully",
            body: {
                token
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            status: "INTERNAL_SERVER_ERROR",
            message: "Error logging in"
        })
    }
}

export const userInfo = async (req, res) => {
    try {
        const user = await UserModels.findById({_id: req.body.userId})
        if (!user) {
            return res.status(404).json({
                status: "NOT_FOUND",
                code: 404,
                message: "User does not exists"
            })
        }

        res.status(200).json({
            status: "OK",
            code: 200,
            data: {
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "INTERNAL_SERVER_ERROR",
            code: 500,
            message: "Error getting user info",
            error
        })
    }
}