import React, { useState, useContext } from "react";
import Card from "../../shared/UIElements/Card";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../shared/UTIL/Validators";
import { useForm } from "../../shared/CustomHooks/Form-Hooks";
import Button from "../../shared/UIElements/Button";
import "./Auth.css";
import Input from "../../shared/UIElements/Input";
import { AuthContext } from "../../shared/Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminAuth = () => {
    const [error, setError] = useState();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [formState, InputHandler] = useForm(
        {
            email: {
                value: "",
                isvalid: false,
            },
            password: {
                value: "",
                isvalid: false,
            }
        },
        false
    );

    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            auth.login(responseData.user.id);
            navigate("/");
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <Card className="authentication">
            <h2>Admin Login</h2>
            <hr />
            {error && <p className="error-text">{error}</p>}
            <form className="place-form" onSubmit={loginHandler}>
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address!"
                    onInput={InputHandler}
                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password with a minimum of 6 characters!"
                    onInput={InputHandler}
                />
                <Button type="submit" disabled={!formState.isvalid}>
                    LOGIN
                </Button>
            </form>
        </Card>
    );
};

export default AdminAuth;
