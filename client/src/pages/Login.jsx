import React, {Fragment, useState} from "react";
import {Container, Form, Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8001/auth/login', {
                email: user.email,
                password: user.password
            }).then((res) => {
                toast.success(res.data.message)
                navigate('/')
            }).catch((err) => {
                const {data} = err.response
                console.log(err)
                toast.error(data.message)
                setUser({email: "", password: ""})
            })
        } catch (error) {
            navigate('/500')
        }

    }



    const inputChangeHandler = (e) => {
        const {name, value} = e.target
        setUser((prevState) => ({...prevState, [name]: value}))
    }

    return (
        <Fragment>
            <Container className="w-50 p-5">
                <Card>
                    <Card.Header as="h3" className="text-center p-3">Login Form</Card.Header>
                    <Form onSubmit={onSubmitHandler}>
                        <Card.Body>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={inputChangeHandler} value={user.email} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" onChange={inputChangeHandler} value={user.password} />
                                </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" size="md">
                                    Login
                                </Button>
                            </div>
                            <div className="m-2">
                                <Card.Text>Don't Have an account? <Link to="/register">Register</Link></Card.Text>
                            </div>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        </Fragment>
    )
}

export default Login