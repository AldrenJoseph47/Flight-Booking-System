import React, { useEffect, useReducer } from "react";
import './Input.css';
import { validate } from "../UTIL/Validators";

const inputReducer = (state,action) =>{
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value:action.val,
                isvalid:validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched:true
            };
        default:
            return state;
    }
}

const Input = (props) => {
    
    /*It's basically a function that receives an action and can dispatch the action 
    it receives the current state and updates the current state based on the action received and returns the new state 
    Use reducer will take the new state and give it back to the component and rerender the component*/
    const [inputState,dispatch] =
    useReducer(inputReducer,{value: props.value || '' ,isvalid:props.isvalid || false ,isTouched:false});


    // to transfer value from child Input.js to parent NewPlace.js
    // we can achieve this by using callback because we cant use props 

    // here id and onInput is extracted from props
    const {id, onInput} = props;
    // value and isvalid is extracted
    const {value, isvalid} = inputState;
    // using the useEffect function to pass the values\
    useEffect(()=>{
        onInput(id,value,isvalid);
    },[id,value,isvalid,onInput]);// here when dependencies changes
    // this will trigger useEffect Function inside 

    const changeHandler = event => {
        console.log("input has been changed");
        dispatch({type:'CHANGE',val:event.target.value, validators:props.validators})
        // Now here I want to do two things store the value and validate it 
        // so here we need to handle the state. You can useReducer or useState. 
        // Lets implement useReducer
    }

    const touchhandler = () => {
        dispatch({type:'TOUCH'})}



    const element = props.element === 'input' ? (
        <input id={props.id} type={props.type} 
        placeholder={props.placeholder} onChange={changeHandler}
        onBlur={touchhandler}
        value={inputState.value}
        ></input>
    ) : (
        <textarea id={props.id} rows={props.rows || 3} 
        onChange={changeHandler}
        onBlur={touchhandler}
        value={inputState.value}
        ></textarea>
    )
    return (
        <div className={`form-control ${!inputState.isvalid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isvalid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )


}

export default Input;