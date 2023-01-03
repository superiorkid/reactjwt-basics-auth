import UserModels from "./user.models";
import bcrypt, {hash} from 'bcrypt'

export const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body

        // check if username or email exists
        const usernameExists = await UserModels.findOne({username})
        const emailExists = await UserModels.findOne({email})

        if (emailExists || usernameExists) {
            res.status(200).json({
                message: "Username or Email already registered.",
                success: false
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
        res.status(200).json({
            message: "User created successfully",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            success: false
        })
    }
}

export const signin = async (req, res) => {
    try {

    } catch (error) {

    }
}