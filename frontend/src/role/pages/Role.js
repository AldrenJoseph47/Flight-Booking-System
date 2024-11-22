import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import RoleList from '../components/RoleList';


const Roles = () => {
    
    const [loadedRoles, setLoadedRoles] = useState();
    const [error,setError] = useState();
    useEffect(() => {
        // here we need to implement the logic to fire API
        const sendRequest = async() =>{
            try{        // to fire an api we have fetch or axios
                const response = await fetch('http://localhost:4000/api/roles/');
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedRoles(responseData.roles)
            }
            catch(err){
                setError(err.message)
            }
        }
        sendRequest();
    },[]);
    return(
        <div>
            {loadedRoles && <RoleList items={loadedRoles}/>}
            {error && <div>{error}</div>}
        </div>
    )
}

export default Roles;
// Coding standards keep components simple as possible