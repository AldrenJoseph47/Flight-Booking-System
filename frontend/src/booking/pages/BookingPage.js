import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingPage.css'; // Ensure this is the correct path to your CSS file

const PassengerCard = ({ passenger }) => {
    return (
        <div className="passenger-card">
            <h3 className="passenger-name">{passenger.name}</h3>
            <p><strong>Age:</strong> {passenger.age}</p>
            <p><strong>Phone:</strong> {passenger.phone}</p>
            <p><strong>ID Name:</strong> {passenger.idName}</p>
            <p><strong>ID Number:</strong> {passenger.idNumber}</p>
            <p><strong>Seat Class:</strong> {passenger.seatClass}</p>
            <p><strong>Food Preference:</strong> {passenger.food}</p>
            <p><strong>Passenger Type:</strong> {passenger.type}</p>
        </div>
    );
};

const BookingPage = () => {
    const { flightId } = useParams();
    const navigate = useNavigate();
    const [passengers, setPassengers] = useState([]);
    const [newPassenger, setNewPassenger] = useState({
        name: '',
        age: '',
        phone: '',
        idName: '',
        idNumber: '',
        seatClass: 'Economy',
        food: 'No',
        type: 'Normal',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPassenger({ ...newPassenger, [name]: value });
    };

    const handleAddPassenger = async (e) => {
        e.preventDefault();
        try {
            // Check if the passenger already exists
            const existingResponse = await fetch(`http://localhost:4000/api/passengers/id/${newPassenger.idNumber}`);
            const existingPassengers = await existingResponse.json();
    
            if (existingResponse.ok && existingPassengers.length > 0) {
                const existingPassenger = existingPassengers[0]; // Get the first passenger

                console.log(existingPassenger._id)
                // Update the existing passenger with new data
                const updateResponse = await fetch(`http://localhost:4000/api/passengers/${existingPassenger._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPassenger),
                });
    
                if (!updateResponse.ok) {
                    throw new Error('Failed to update passenger');
                } else {
                    // Update state with the modified passenger data
                    setPassengers((prevPassengers) =>
                        prevPassengers.map((passenger) =>
                            passenger.idNumber === newPassenger.idNumber ? newPassenger : passenger
                        )
                    );
                }
            } else {
                // Add new passenger if it doesn't exist
                const response = await fetch('http://localhost:4000/api/passengers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPassenger),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to add passenger');
                } else {
                    const data = await response.json();
                    setPassengers((prevPassengers) => [...prevPassengers, data.passenger]);
                }
            }
    
            // Reset the new passenger state
            setNewPassenger({ name: '', age: '', phone: '', idName: '', idNumber: '', seatClass: 'Economy', food: 'No', type: 'Normal' });
        } catch (error) {
            console.error('Error adding/updating passenger:', error);
        }
    };
    

    const handleSubmit = () => {
        navigate('/booking/details', { state: { passengers, flightId } });
    };

    return (
        <div className="booking-container">
            <h1 className="booking-title">Booking Details for Flight ID: {flightId}</h1>
            <div className="booking-content">
                <form className="passenger-form" onSubmit={handleAddPassenger}>
                    <input name="name" value={newPassenger.name} onChange={handleInputChange} placeholder="Name" required className="form-input" />
                    <input name="age" value={newPassenger.age} onChange={handleInputChange} placeholder="Age" required className="form-input" />
                    <input name="phone" value={newPassenger.phone} onChange={handleInputChange} placeholder="Phone" required className="form-input" />
                    <input name="idName" value={newPassenger.idName} onChange={handleInputChange} placeholder="ID Name" required className="form-input" />
                    <input name="idNumber" value={newPassenger.idNumber} onChange={handleInputChange} placeholder="ID Number" required className="form-input" />
                    <select name="seatClass" value={newPassenger.seatClass} onChange={handleInputChange} className="form-select">
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                        <option value="First">First</option>
                    </select>
                    <select name="food" value={newPassenger.food} onChange={handleInputChange} className="form-select">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <select name="type" value={newPassenger.type} onChange={handleInputChange} className="form-select">
                        <option value="Normal">Normal</option>
                        <option value="Student">Student</option>
                        <option value="Senior Citizen">Senior Citizen</option>
                        <option value="Disabled">Disabled</option>
                        <option value="Army">Army</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                    <button type="submit" className="add-passenger-button">Add Passenger</button>
                </form>
                <div className="passengers-container">
                    <h2 className="passengers-title">Added Passengers</h2>
                    {passengers.map((passenger, index) => (
                        <PassengerCard key={index} passenger={passenger} />
                    ))}
                </div>
            </div>
            <button onClick={handleSubmit} className="proceed-button">Proceed to Next Page</button>
        </div>
    );
};

export default BookingPage;
