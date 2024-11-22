import React, { useCallback, useContext, useReducer, useState } from 'react';
import './NewServiceProvider.css';
import Input from '../../shared/UIElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/UTIL/Validators';
import Button from '../../shared/UIElements/Button';
import { AuthContext } from '../../shared/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../shared/components/ImageUpload';

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};

const NewServiceProvider = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState();

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            name: { value: '', isValid: false },
            phone: { value: '', isValid: false },
            email: { value: '', isValid: false },
            password: { value: '', isValid: false },
            logo: { value: null, isValid: false },
            isRole: { value: 'Service Provider', isValid: true }
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);

    const serviceProviderSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('phone', formState.inputs.phone.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('logo', formState.inputs.logo.value);
        formData.append('isRole', formState.inputs.isRole.value);

        try {
            const response = await fetch("http://localhost:4000/api/service-provider/", {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            navigate('/');
        } catch (err) {
            setError(err.message || 'Adding Service Provider Failed');
        }
    };

    return (
        <form className='service-provider-form' onSubmit={serviceProviderSubmitHandler}>
            {error && <p className="error-text">{error}</p>}

            <Input 
                id="name" 
                element="input" 
                type="text" 
                label="Airline Name" 
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]} 
                errorText="Please enter a valid name" 
                onInput={inputHandler} 
            />

            <Input 
                id="phone" 
                element="input" 
                type="text" 
                label="Contact Info" 
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]} 
                errorText="Please enter a valid phone number" 
                onInput={inputHandler} 
            />

            <Input 
                id="email" 
                element="input" 
                type="email" 
                label="Email" 
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} 
                errorText="Please enter a valid email address" 
                onInput={inputHandler} 
            />

            <Input 
                id="password" 
                element="input" 
                type="password" 
                label="Password" 
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]} 
                errorText="Please enter a valid password (at least 6 characters)" 
                onInput={inputHandler} 
            />

            <ImageUpload 
                center 
                id="logo" 
                onInput={inputHandler} 
                errorText="Please upload a logo image"
            />

            <Button type="submit" disabled={!formState.isValid}>ADD SERVICE PROVIDER</Button>
        </form>
    );
};

export default NewServiceProvider;
