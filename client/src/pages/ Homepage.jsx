import React, {useEffect} from "react";
import axios from "axios"
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../redux/counterSlice.js";

const Homepage = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
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
            <h1>Homepage</h1>
            <hr/>
            <h4>Counter</h4>
            <button onClick={() => dispatch(increment())}>+</button>{" "}{count}{" "}<button onClick={() => dispatch(decrement())}>-</button>
        </div>
    )
}

export default Homepage