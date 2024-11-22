import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import AdminList from '../components/AdminList'; 

const Admins = () => {
    
    const [loadedAdmins, setLoadedAdmins] = useState();
    const [error,setError] = useState();
    useEffect(() => {
        // here we need to implement the logic to fire API
        const sendRequest = async() =>{
            try{        // to fire an api we have fetch or axios
                const response = await fetch('http://localhost:4000/api/users/all/admin');
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedAdmins(responseData.users)
            }
            catch(err){
                setError(err.message)
            }
        }
        sendRequest();
    },[]);
    return(
        <div>
            {loadedAdmins && <AdminList items={loadedAdmins}/>}
            {error && <div>{error}</div>}
        </div>
    )
}

export default Admins;
// Coding standards keep components simple as possible