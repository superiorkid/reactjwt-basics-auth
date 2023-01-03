import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 8001

// cors
app.use(cors())

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Hello, this is basics auth MERN stack"
    })
})

app.listen(PORT, () => {
    console.log("server started on port 8001")
})