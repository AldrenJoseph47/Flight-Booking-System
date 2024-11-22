import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import UserList from '../components/UserList'; 

const Users = () => {
    
    const [loadedUsers, setLoadedUsers] = useState();
    const [error,setError] = useState();
    useEffect(() => {
        // here we need to implement the logic to fire API
        const sendRequest = async() =>{
            try{        // to fire an api we have fetch or axios
                const response = await fetch('http://localhost:4000/api/users/all/customer');
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedUsers(responseData.users)
            }
            catch(err){
                setError(err.message)
            }
        }
        sendRequest();
    },[]);
    return(
        <div>
            {loadedUsers && <UserList items={loadedUsers}/>}
            {error && <div>{error}</div>}
        </div>
    )
}

export default Users;
// Coding standards keep components simple as possible