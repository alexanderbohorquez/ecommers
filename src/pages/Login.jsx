import React from "react";
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/form.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submit = data => {
        console.log(data);
        axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
        .then(resp => {
            localStorage.setItem("token", resp.data.token);
            navigate("/");
        })
        .catch(error => {
            console.error(error);
            if (error.response && error.response.status === 401) {
                toast.error("WRONG USER OR PASSWORD ");
            }
        });
    };

    return (
        <main>
            <Form onSubmit={handleSubmit(submit)}>
                <h1>LOGIN</h1>
                <h5 className="text-center">Test Data</h5> 
                <ListGroup className="mb-4" style={{ backgroundColor: "#D8F5FD" }}>
                    <ListGroup.Item className="border-0 text-center" style={{ backgroundColor: "#D8F5FD" }}>john@gmail.com - john1234</ListGroup.Item>
                    <ListGroup.Item className="border-0 text-center" style={{ backgroundColor: "#D8F5FD" }}>frankiero@gmail.com - frank1234</ListGroup.Item>
                </ListGroup>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    {...register("email")}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    {...register("password")}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <ToastContainer />
        </main>
    );
}

export default Login;
