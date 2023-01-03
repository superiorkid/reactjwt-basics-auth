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
*   code: 200
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
    try {
        const {username, email, password} = req.body

        // check username exists
        const usernameExists = await UserModels.findOne({username})
        if (usernameExists) {
            return res.status(409).json({
                status: "CONFLICT",
                code: 409,
                data: {
                    message: "Username already registered",
                }
            })
        }

        // check email exists
        const emailExists = await UserModels.findOne({email})
        if (emailExists) {
            return res.status(409).json({
                status: "CONFLICT",
                code: 409,
                data: {
                    message: "Email already registered",
                }
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
            data: {
                message: "User created successfully",
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "INTERNAL SERVER ERROR",
            code: 500,
            data: {
                message: "Error creating user",
            }
        })
    }
}

export const signin = async (req, res) => {
    try {
        const {email, password} = req.body

        // check if user exists
        const user = await UserModels.findOne({email})
        if (!user) {
            return res.status(404).json({
                status: "NOT FOUND",
                code: 404,
                data: {
                    message: "User does not exists"
                }
            })
        }

        // load and compare hash password from database
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                status: "UNAUTHORIZED",
                code: 401,
                data: {
                    message: "Password is incorrect"
                }
            })
        }

        // generate tokens expire in one day
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {
            expiresIn: "1d"
        })

        res.status(200).json({
            status: "OK",
            code: 200,
            data: {
                message: "Logged in successfully",
                token
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            status: "INTERNAL SERVER ERROR",
            data: {
                message: "Error logging in"
            }
        })
    }
}