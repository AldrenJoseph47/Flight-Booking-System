import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import ServiceProviderList from '../components/ServiceProviderList'; 

const ServiceProvider = () => {
    
    const [loadedServiceProvider, setLoadedServiceProvider] = useState();
    const [error,setError] = useState();
    useEffect(() => {
        // here we need to implement the logic to fire API
        const sendRequest = async() =>{
            try{        // to fire an api we have fetch or axios
                const response = await fetch('http://localhost:4000/api/service-provider');
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedServiceProvider(responseData.serviceProviders)
            }
            catch(err){
                setError(err.message)
            }
        }
        sendRequest();
    },[]);
    return(
        <div>
            {loadedServiceProvider && <ServiceProviderList items={loadedServiceProvider}/>}
            {error && <div>{error}</div>}
        </div>
    )
}

export default ServiceProvider;
// Coding standards keep components simple as possible