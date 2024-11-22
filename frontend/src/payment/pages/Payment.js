import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
    const { bookingId } = useParams(); // Retrieve booking ID from URL
    const [paymentMethod, setPaymentMethod] = useState('Card'); // Default to 'Card'
    const [ticketPrice, setTicketPrice] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const paymentMethods = ['Card', 'UPI', 'Net Banking']; // Payment methods array

    // Fetch booking details
    useEffect(() => {
        const fetchBookingDetails = async () => {
            console.log("hi")
            try {
                const response = await fetch(`http://localhost:4000/api/bookings/${bookingId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch booking details.');
                }
                const data = await response.json();
                setTicketPrice(data.booking.totalPrice); // Set the ticket price from booking details
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages

        try {
            const response = await fetch('http://localhost:5000/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify({ bookingId, paymentMethod }), // Send booking ID and payment method
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Payment processing failed, please try again.');
            }

            const data = await response.json(); // Parse the JSON response
            setSuccessMessage('Payment confirmed! Your payment ID is: ' + data.payment._id);
        } catch (err) {
            setError(err.message); // Set error message for display
        }
    };

    return (
        <div>
            <h1>Payment Page</h1>
            <p>Your booking ID is: {bookingId}</p>
            <p>Ticket Price: ₹{ticketPrice.toFixed(2)}</p> {/* Display the ticket price */}
            <form onSubmit={handlePayment}>
                <div>
                    <label htmlFor="paymentMethod">Payment Method:</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method
                    >
                        {paymentMethods.map((method) => (
                            <option key={method} value={method}>
                                {method}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Confirm Payment</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default PaymentPage;
