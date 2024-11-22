import React, { useCallback, useReducer, useState } from 'react';
import './NewAdmin.css'; // Ensure to create a corresponding CSS file
import Input from '../../shared/UIElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/UTIL/Validators';
import Button from '../../shared/UIElements/Button';
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

const NewAdmin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState();

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            name: { value: '', isValid: false },
            email: { value: '', isValid: false },
            phone: { value: '', isValid: false },
            isRole: { value: 'Admin', isValid: true },
            image: { value: null, isValid: false },
            password: { value: '', isValid: false }
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

    const adminSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('phone', formState.inputs.phone.value);
        formData.append('isRole', formState.inputs.isRole.value);
        formData.append('image', formState.inputs.image.value);
        formData.append('password', formState.inputs.password.value);

        try {
            const response = await fetch("http://localhost:4000/api/users/signup", {
                method: 'POST',
                body: formData
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            console.log(responseData);
            navigate('/admins');
        } catch (err) {
            console.log(err);
            setError(err.message || 'Adding Admin Failed');
        }
    };

    return (
        <form className='admin-form' onSubmit={adminSubmitHandler}>
            {error && <p className="error-text">{error}</p>}

            <Input id="name" element="input" type='text' label="Admin Name" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]} 
            errorText="Please enter a valid name" onInput={inputHandler} />

            <Input id="email" element="input" type='email' label="Email" validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} 
            errorText="Please enter a valid email" onInput={inputHandler} />

            <Input id="phone" element="input" type='text' label="Contact Info" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]} 
            errorText="Please enter a valid phone number" onInput={inputHandler} />

            <Input id="password" element="input" type="password" label="Password" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            errorText="Password must be at least 6 characters" onInput={inputHandler} />

            <ImageUpload center id="image" onInput={inputHandler} errorText="Please upload an image" />

            <Button type="submit" disabled={!formState.isValid}>ADD ADMIN</Button>
        </form>
    );
};

export default NewAdmin;
