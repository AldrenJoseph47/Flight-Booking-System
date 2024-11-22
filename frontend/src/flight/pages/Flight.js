import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import FlightList from '../components/FlightList'; 

const Flights = () => {
    
    const [loadedFlights, setLoadedFlights] = useState();
    const [error,setError] = useState();
    useEffect(() => {
        // here we need to implement the logic to fire API
        const sendRequest = async() =>{
            try{        // to fire an api we have fetch or axios
                const response = await fetch('http://localhost:4000/api/flights/');
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedFlights(responseData.flights)
            }
            catch(err){
                setError(err.message)
            }
        }
        sendRequest();
    },[]);
    return(
        <div>
            {loadedFlights && <FlightList items={loadedFlights}/>}
            {error && <div>{error}</div>}
        </div>
    )
}

export default Flights;
// Coding standards keep components simple as possible