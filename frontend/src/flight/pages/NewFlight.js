import React, { useCallback, useContext, useReducer, useState } from 'react';
import './NewFlight.css'; // Ensure to create a corresponding CSS file
import Input from '../../shared/UIElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/UTIL/Validators';
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

const NewFlight = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState();

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            flightNumber: {
                value: '',
                isvalid: false
            },
            origin: {
                value: '',
                isvalid: false
            },
            destination: {
                value: '',
                isvalid: false
            },
            departureTime: {
                value: '',
                isvalid: false
            },
            arrivalTime: {
                value: '',
                isvalid: false
            },
            image: {
                value: null,
                isvalid: false
            },
            duration: {
                value: '',
                isvalid: false
            },
            luggageCapacity: {
                value: '',
                isvalid: false
            },
            recurrence: {
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

    const flightSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append('airline', auth.userId.name);
        formData.append('flightNumber', formState.inputs.flightNumber.value);
        formData.append('origin', formState.inputs.origin.value);
        formData.append('destination', formState.inputs.destination.value);
        formData.append('departureTime', formState.inputs.departureTime.value);
        formData.append('arrivalTime', formState.inputs.arrivalTime.value);
        formData.append('image', formState.inputs.image.value);
        formData.append('duration', formState.inputs.duration.value);
        formData.append('luggageCapacity', formState.inputs.luggageCapacity.value);
        formData.append('recurrence', formState.inputs.recurrence.value); // Include recurrence
        formData.append('serviceProviderId', auth.userId);
    
        try {
            const response = await fetch("http://localhost:4000/api/flights/", {
                method: 'POST',
                body: formData
            });
    
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            console.log(responseData);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError(err.message || 'Adding Flight Failed');
        }
    };

    return (
        <form className='flight-form' onSubmit={flightSubmitHandler}>
            {error && <p className="error-text">{error}</p>}

            <Input id="flightNumber" element="input" type='text' label="Flight Number" validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]} 
            errorText="Please Enter Flight Number" onInput={inputHandler} />

            <Input id="origin" element="input" type='text' label="Origin" validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]} 
            errorText="Please Enter Valid Flight Origin" onInput={inputHandler} />

            <Input id="destination" element="input" type='text' label="Destination" validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]} 
            errorText="Please Enter Valid Flight Destination" onInput={inputHandler} />

            <Input id="departureTime" element="input" type="time"  label="Departure Time" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Departure Time" onInput={inputHandler} />

            <Input id="arrivalTime" element="input" type="time"  label="Arrival Time" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Arrival Time" onInput={inputHandler} />

            <ImageUpload center
                        id="image"
                        onInput={inputHandler}
                        errorText="Please upload an image"
                    />

            <Input id="duration" element="input" type='number' label="Duration (in minutes)" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Duration" onInput={inputHandler} />

            <Input id="luggageCapacity" element="input" type='text' label="Luggage Capacity" validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please Enter Luggage Capacity" onInput={inputHandler} />

            <div className="form-control">
                <label htmlFor="recurrence">Recurrence</label>
                <select 
                    id="recurrence"
                    onChange={(e) => inputHandler('recurrence', e.target.value, e.target.value !== '')}
                    value={formState.inputs.recurrence.value}
                >
                    <option value="">Select Recurrence</option>
                    <option value="daily">Daily</option>
                    <option value="weekends">Weekends Only</option>
                    <option value="weekly:All">Weekly (All Days)</option>
                    <option value="weekly:Monday">Weekly on Monday</option>
                    <option value="weekly:Tuesday">Weekly on Tuesday</option>
                    <option value="weekly:Wednesday">Weekly on Wednesday</option>
                    <option value="weekly:Thursday">Weekly on Thursday</option>
                    <option value="weekly:Friday">Weekly on Friday</option>
                </select>
                {!formState.inputs.recurrence.isvalid && <p className="error-text">Please select a recurrence option.</p>}
            </div>

            <Button type="submit" disabled={!formState.isvalid}>ADD FLIGHT</Button>
        </form>
    );
};

export default NewFlight;
