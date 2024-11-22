import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import SeatClassList from '../components/SeatClassList'; 

const SeatClass = () => {
    
    const [loadedSeatClasses, setLoadedSeatClasses] = useState();
    const [error,setError] = useState();
    useEffect(() => {
        // here we need to implement the logic to fire API
        const sendRequest = async() =>{
            try{        // to fire an api we have fetch or axios
                const response = await fetch('http://localhost:4000/api/seat-classes');
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedSeatClasses(responseData.seatClasses)
            }
            catch(err){
                setError(err.message)
            }
        }
        sendRequest();
    },[]);
    return(
        <div>
            {loadedSeatClasses && <SeatClassList items={loadedSeatClasses}/>}
            {error && <div>{error}</div>}
        </div>
    )
}

export default SeatClass;
// Coding standards keep components simple as possible