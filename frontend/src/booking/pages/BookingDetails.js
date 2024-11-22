import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingDetails.css'; // Import your CSS for styling
import { AuthContext } from '../../shared/Context/AuthContext';

const BookingDetails = () => {


    const auth = useContext(AuthContext);


    const location = useLocation();
    const navigate = useNavigate();
    const { passengers, flightId } = location.state || { passengers: [], flightId: null };
    const [totalCost, setTotalCost] = useState(0);
    const [flightDetails, setFlightDetails] = useState(null); // Store flight details
    const [seatClassDetails, setSeatClassDetails] = useState(null); // Store seat class details
    const [error, setError] = useState(''); // For displaying errors
    const [selectedDate, setSelectedDate] = useState(''); // State for selected date

    useEffect(() => {
        if (flightId) {
            fetchFlightDetails(flightId); // Fetch flight details using flightId
        }
    }, [flightId]);

    const fetchFlightDetails = async (flightId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/flights/${flightId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const flightData = data.flight; // Assuming your API returns flight details like { flight: { ... } }
            setFlightDetails(flightData);
            
            if (flightData && flightData.seatModel) {
                fetchSeatClassDetails(flightData.seatModel);
            } else {
                console.error('Seat model is not available in flight details');
            }
        } catch (error) {
            console.error('Error fetching flight details:', error);
            setError('Failed to load flight details. Please try again later.'); // Set error message
        }
    };

    const fetchSeatClassDetails = async (seatModel) => {
        try {
            const response = await fetch(`http://localhost:4000/api/seat-classes/${seatModel}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setSeatClassDetails(data);
            calculateTotalCost(data);
        } catch (error) {
            console.error('Error fetching seat class details:', error);
            setError('Failed to load seat class details. Please try again later.'); // Set error message
        }
    };

    const calculateTotalCost = (seatClassDetails) => {
        let total = 0; // Initialize total cost
        const seatDetails = seatClassDetails.seatClass; // Extract the seat class object

        passengers.forEach(passenger => {
            let seatPrice = 0;
            let foodPrice = 0;
            let discount = 0;

            switch (passenger.seatClass) {
                case 'Economy':
                    seatPrice = seatDetails.economySeatPrice || 0;
                    foodPrice = passenger.food === 'Yes' ? (seatDetails.economyFoodPrice || 0) : 0;
                    if (['Student', 'Senior Citizen', 'Disabled', 'Army', 'Doctor'].includes(passenger.type)) {
                        discount = Math.min(seatPrice * 0.1, 600);
                    }
                    break;
                case 'Business':
                    seatPrice = seatDetails.businessSeatPrice || 0;
                    foodPrice = passenger.food === 'Yes' ? (seatDetails.businessFoodPrice || 0) : 0;
                    break;
                case 'First':
                    seatPrice = seatDetails.firstClassSeatPrice || 0;
                    foodPrice = passenger.food === 'Yes' ? (seatDetails.firstClassFoodPrice || 0) : 0;
                    break;
                default:
                    console.error('Invalid seat class:', passenger.seatClass);
                    return;
            }

            // Total calculation including tax and discount
            total += ((seatPrice + foodPrice) * 1.15) - discount; 
        });

        setTotalCost(total); // Set the calculated total cost
    };

    const createBooking = async () => {
        const roundedTotalCost = Math.round(totalCost * 100) / 100; // Round to two decimal places
    
        const bookingData = {
            userId: auth.userId,
            flight: flightId,
            passenger: passengers.map(p => p.id),
            totalPrice: roundedTotalCost, // Use the rounded total cost
            specificDate: selectedDate,
            bookingDate: new Date().toISOString(),
        };
    
        try {
            const response = await fetch('http://localhost:4000/api/bookings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create booking: ${errorText}`);
            }
    
            const data = await response.json();
            const bookingId = data.booking._id;
            navigate(`/payment/${bookingId}`);
        } catch (error) {
            console.error('Error creating booking:', error);
            setError('Failed to create booking. Please try again later.');
        }
    };
    

    const handleConfirmBooking = () => {
        createBooking(); // Create the booking and navigate
    };

    return (
        <div className="booking-details">
            <h1>Flight Booking Details</h1>
            {error && <p className="error">{error}</p>} {/* Display error messages */}
            {flightDetails ? (
                <>
                    <h2>Flight Number: {flightDetails.flightNumber}</h2>
                    <h3>Total Cost: ₹{totalCost.toFixed(2)}</h3>
                    
                    {/* Date Picker for Selecting Travel Date */}
                    <label htmlFor="travel-date">Select Travel Date:</label>
                    <input 
                        type="date" 
                        id="travel-date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                        required
                    />
                    
                    <button className="payment" onClick={handleConfirmBooking}>Confirm Booking</button>
                </>
            ) : (
                <p>Loading flight details...</p>
            )}
            <h3>Passengers:</h3>
            <ul>
                {passengers.map((passenger, index) => (
                    <li key={index}>{passenger.name} - {passenger.type}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookingDetails;
