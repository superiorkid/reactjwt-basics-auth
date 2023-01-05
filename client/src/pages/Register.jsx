import React, {Fragment, useState} from "react";
import {Container, Form, Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8001/auth/register", {
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            }).then((res) => {
                toast.success(res.data.message)
                toast("...redirecting to login page")
                navigate('/login')
            }).catch((err) => {
                console.log(err)
                const {data} = err.response
                toast.error(data.message)
                setNewUser({username: "", email: "", password: ""})
            })
        } catch (error) {
            navigate('/500')
        }
    }

    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setNewUser((prevState) => ({...prevState, [name]: value}))
    }

    return (
        <Fragment>
            <Container className="w-50 p-5">
                <Card>
                    <Card.Header as="h3" className="text-center p-3">Register Form</Card.Header>
                    <Form onSubmit={onSubmitHandler}>
                        <Card.Body>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" name="username" value={newUser.username} onChange={onChangeHandler} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email" value={newUser.email} onChange={onChangeHandler} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={newUser.password} onChange={onChangeHandler} />
                                </Form.Group>

                        </Card.Body>
                        <Card.Footer>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" size="md">
                                    Register
                                </Button>
                            </div>
                            <div className="m-2">
                                <Card.Text>Have an account? <Link to="/login">Logged in</Link></Card.Text>
                            </div>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        </Fragment>
    )
}

export default Register