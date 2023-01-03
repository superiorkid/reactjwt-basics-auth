import express from 'express'

const app = express()
const PORT = 8001

app.get('/', (req,res) => {
    res.send("hello from backend")
})

app.listen(PORT, () => {
    console.log("server started on port 8001")
})