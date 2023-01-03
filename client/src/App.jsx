import React, {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
    const [message, setMessage] = useState({})

    useEffect(() => {
        const msg = async () => {
            await axios.get('http://localhost:8001').then((res) => {
                setMessage(res.data)
                console.log(message)
                console.log(typeof message)
            }).catch((err) => {
                console.log(err)
            })
        }

        msg()
    })

    return (
        <div>
            <h2>Hello from frontend</h2>
            {message.message}
        </div>
    )
}
export default App