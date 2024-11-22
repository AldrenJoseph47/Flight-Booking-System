import { createContext } from "react";


//STEP: 1 Create an Auth Context
export const AuthContext = createContext({

    //Based on the Functionality to Achieved Create the Fields

    isLoggedIn:false, // Initially User Not Logged In
    login: ()=>{},
    logout: ()=>{},
    // to store the userId
    userId:null
})