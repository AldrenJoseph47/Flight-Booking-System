import React, { useCallback, useContext, useReducer, useState } from 'react';
import './NewSeatClass.css'; // Ensure to create a corresponding CSS file
import Input from '../../shared/UIElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/UTIL/Validators';
import Button from '../../shared/UIElements/Button';
import { AuthContext } from '../../shared/Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isvalid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isvalid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isvalid: action.isvalid }
                },
                isvalid: formIsValid
            };
        default:
            return state;
    }
};

const NewSeatClass = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState();

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            seatClassName: {
                value: '',
                isvalid: false
            },
            economySeats: {
                value: '',
                isvalid: false
            },
            economySeatPrice: {
                value: '',
                isvalid: false
            },
            economyFoodPrice: {
                value: '',
                isvalid: false
            },
            economyavailableSeats: {
                value: '',
                isvalid: false
            },
            businessSeats: {
                value: '',
                isvalid: false
            },
            businessSeatPrice: {
                value: '',
                isvalid: false
            },
            businessFoodPrice: {
                value: '',
                isvalid: false
            },
            businessavailableSeats: {
                value: '',
                isvalid: false
            },
            firstClassSeats: {
                value: '',
                isvalid: false
            },
            firstClassSeatPrice: {
                value: '',
                isvalid: false
            },
            firstClassFoodPrice: {
                value: '',
                isvalid: false
            },
            firstClassavailableSeats: {
                value: '',
                isvalid: false
            },
        },
        isvalid: false
    });

    const inputHandler = useCallback((id, value, isvalid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isvalid: isvalid,
            inputId: id
        });
    }, []);

    const seatClassSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                seatClassName: formState.inputs.seatClassName.value,
                economySeats: +formState.inputs.economySeats.value,
                economySeatPrice: +formState.inputs.economySeatPrice.value,
                economyFoodPrice: +formState.inputs.economyFoodPrice.value,
                economyavailableSeats: +formState.inputs.economyavailableSeats.value,
                businessSeats: +formState.inputs.businessSeats.value,
                businessSeatPrice: +formState.inputs.businessSeatPrice.value,
                businessFoodPrice: +formState.inputs.businessFoodPrice.value,
                businessavailableSeats: +formState.inputs.businessavailableSeats.value,
                firstClassSeats: +formState.inputs.firstClassSeats.value,
                firstClassSeatPrice: +formState.inputs.firstClassSeatPrice.value,
                firstClassFoodPrice: +formState.inputs.firstClassFoodPrice.value,
                firstClassavailableSeats: +formState.inputs.firstClassavailableSeats.value,
                serviceProviderId: auth.userId // Get the service provider ID from auth context
            };

            const response = await fetch("http://localhost:4000/api/seat-classes/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            console.log(responseData);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError(err.message || 'Adding Seat Class Failed');
        }
    };

    return (
        <form className='seat-class-form' onSubmit={seatClassSubmitHandler}>
            {error && <p className="error-text">{error}</p>}

            <Input id="seatClassName" element="input" type='text' label="Seat Class Name" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]} 
            errorText="Please Enter Valid Seat Class Name" onInput={inputHandler} />

            <Input id="economySeats" element="input" type='number' label="Economy Seats" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Number of Economy Seats" onInput={inputHandler} />

            <Input id="economySeatPrice" element="input" type='number' label="Economy Seat Price" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Economy Seat Price" onInput={inputHandler} />

            <Input id="economyFoodPrice" element="input" type='number' label="Economy Food Price" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Economy Food Price" onInput={inputHandler} />

            <Input id="economyavailableSeats" element="input" type='number' label="Economy Available Seats" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Number of Available Economy Seats" onInput={inputHandler} />

            <Input id="businessSeats" element="input" type='number' label="Business Seats" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Number of Business Seats" onInput={inputHandler} />

            <Input id="businessSeatPrice" element="input" type='number' label="Business Seat Price" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Business Seat Price" onInput={inputHandler} />

            <Input id="businessFoodPrice" element="input" type='number' label="Business Food Price" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Business Food Price" onInput={inputHandler} />

            <Input id="businessavailableSeats" element="input" type='number' label="Business Available Seats" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Number of Available Business Seats" onInput={inputHandler} />

            <Input id="firstClassSeats" element="input" type='number' label="First Class Seats" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Number of First Class Seats" onInput={inputHandler} />

            <Input id="firstClassSeatPrice" element="input" type='number' label="First Class Seat Price" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter First Class Seat Price" onInput={inputHandler} />

            <Input id="firstClassFoodPrice" element="input" type='number' label="First Class Food Price" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter First Class Food Price" onInput={inputHandler} />

            <Input id="firstClassavailableSeats" element="input" type='number' label="First Class Available Seats" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Number of Available First Class Seats" onInput={inputHandler} />

            <Button type="submit" disabled={!formState.isvalid}>ADD SEAT CLASS</Button>
        </form>
    );
};

export default NewSeatClass;
