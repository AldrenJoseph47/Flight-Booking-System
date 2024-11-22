import { useCallback, useReducer } from "react";

const formReducer = (state,action)=>{
    switch(action.type){
        case "INPUT_CHANGE":
            let formIsValid = true
            for (const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isvalid
                }
                else{
                    formIsValid = formIsValid && state.inputs[inputId].isvalid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId] : {value:action.value, isvalid: action.isvalid}
                },
                isvalid:formIsValid
            }
        case "SET_DATA":
            return {
                inputs: action.inputs,
                isvalid: action.formIsValid
            }
        default:
            return state;
    }
}


export const useForm = (IntialInputs, InitialFormValidity)=>{

    const [formState,dispatch]=useReducer(formReducer,{
        inputs: IntialInputs,
        isvalid: InitialFormValidity     //which stores the whole form or not 
    })

    const inputHandler = useCallback((id, value, isvalid)=>{
        dispatch({type:"INPUT_CHANGE", value:value, isvalid:isvalid, inputId:id})
    },[])

    const setFormData = useCallback((inputData, formValidity)=>{
        dispatch({type:"SET_DATA",inputs: inputData,formIsValid:formValidity})
    })

    return [formState, inputHandler, setFormData];
}




