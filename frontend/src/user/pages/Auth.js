import React, { useState, useContext } from "react";
import Card from "../../shared/UIElements/Card";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/UTIL/Validators";
import { useForm } from "../../shared/CustomHooks/Form-Hooks";
import Button from "../../shared/UIElements/Button";
import "./Auth.css";
import Input from "../../shared/UIElements/Input";
import { AuthContext } from "../../shared/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../shared/components/ImageUpload";

export const Auth = () => {
    const [error, setError] = useState();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, InputHandler, setData] = useForm(
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

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setData(
                {
                    ...formState.inputs,
                    name: undefined,
                    image: undefined,
                    phone: undefined
                },
                formState.inputs.email.isvalid && formState.inputs.password.isvalid
            );
        } else {
            setData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isvalid: false,
                    },
                    image: {
                        value: null,
                        isvalid: false,
                    },
                    phone: {
                        value: "",
                        isvalid: false
                    }
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    const loginHandler = async (event) => {
        event.preventDefault();
        if (isLoginMode) {
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
            } catch (err) {
                setError(err.message || "Login failed");
            }
        } else {
            try {
                const formData = new FormData();
                formData.append("name", formState.inputs.name.value);
                formData.append("email", formState.inputs.email.value);
                formData.append("password", formState.inputs.password.value);
                formData.append("phone", formState.inputs.phone.value);
                formData.append("image", formState.inputs.image.value);
                formData.append("isRole", "Customer");

                const response = await fetch("http://localhost:4000/api/users/signup", {
                    method: "POST",
                    body: formData,
                });

                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoginMode(true);
                navigate("/auth");
            } catch (err) {
                setError(err.message || "Something went wrong");
            }
        }
    };

    return (
        <Card className="authentication">
            <h2>User {!isLoginMode ? "Sign-Up" : "Login Required"}</h2>
            <hr />
            {error && <p className="error-text">{error}</p>}
            <form className="place-form" onSubmit={loginHandler}>
                {!isLoginMode && (
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Full Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid name!"
                        onInput={InputHandler}
                    />
                )}
                {!isLoginMode && (
                    <Input
                        id="phone"
                        element="input"
                        type="text"
                        label="Phone"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid phone number!"
                        onInput={InputHandler}
                    />
                )}
                {!isLoginMode && (
                    <ImageUpload
                        center
                        id="image"
                        onInput={InputHandler}
                        errorText="Please upload an image"
                    />
                )}
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
                    {isLoginMode ? "LOGIN" : "SIGNUP"}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </Button>
        </Card>
    );
};

export default Auth;
