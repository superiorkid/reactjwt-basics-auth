import React, {useEffect} from "react";
import axios from "axios"

const Homepage = () => {
    const getUserInfo = async () => {
        try {
            const response = await axios.post("http://localhost:8001/auth/user-info", {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div>
            <h3>Homepage</h3>
        </div>
    )
}

export default Homepage