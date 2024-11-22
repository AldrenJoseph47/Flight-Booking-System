import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import MainNavigation from './shared/Navigation/MainNavigation';
import { AuthContext } from './shared/Context/AuthContext';
import { useCallback, useState } from 'react';

import Users from './user/pages/Users';
import HomePage from './shared/pages/Homepage';
import Auth from './user/pages/Auth';
import ServiceAuth from './serviceprovider/pages/Auth';
import ServiceProvider from './serviceprovider/pages/ServiceProvider';
import AdminAuth from './admin/pages/Auth';
import Admins from './admin/pages/Admin';
import Roles from './role/pages/Role';
import NewSeatClass from './seatClass/pages/NewSeatClass';
import NewFlight from './flight/pages/NewFlight';
import NewAdmin from './admin/pages/NewAdmin';
import NewServiceProvider from './serviceprovider/pages/NewServiceProvider';
import SeatClass from './seatClass/pages/SeatClass';
import Flights from './flight/pages/Flight';

import BookingFlights from './booking/pages/Bookings';
import BookingPage from './booking/pages/BookingPage';
import BookingDetails from './booking/pages/BookingDetails';
import PaymentPage from './payment/pages/Payment';

function App() {

  // To handle isLoggedIn and isLoggedOut, creating a useState function
  const[isLoggedIn,setIsLoggedIn] = useState(false);
  const[userId,setUserId] = useState();

  const login = useCallback((uid)=>{
    setIsLoggedIn(true);
    setUserId(uid);
  },[])
  const logout = useCallback(()=>{
    setIsLoggedIn(false);
    setUserId(null);

  },[])

  let routes;
  if(isLoggedIn){
    routes=(
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="*" element={<Navigate to="/"/>}></Route>

        <Route path="/roles" element={<Roles/>}></Route>

        <Route path="/admins" element={<Admins/>}></Route>
        <Route path="/serviceproviders" element={<ServiceProvider/>}></Route>
        <Route path="/customer" element={<Users/>}></Route>

        <Route path="/seatclasses" element={<SeatClass/>}></Route>
        <Route path="/flight" element={<Flights/>}></Route>

        <Route path="/booking" element={<BookingFlights/>}></Route>

        
        <Route path="/booking/:flightId" element={<BookingPage/>}></Route>

        <Route path="/booking/details" element={<BookingDetails/>}></Route>

        <Route path="/payment/:bookingId" element={<PaymentPage/>}></Route>


        

        <Route path="/admin/new" element={<NewAdmin/>}></Route>\
        <Route path="/serviceprovider/new" element={<NewServiceProvider/>}></Route>

        <Route path="/seatclass/new" element={<NewSeatClass/>}></Route>
        <Route path="/flight/new" element={<NewFlight/>}></Route>


      </Routes>
    );
  }else{
    routes=(<Routes>

      <Route path="/" element={<HomePage/>}></Route>
      <Route path="*" element={<Navigate to="/auth"/>}></Route>
      <Route path="/auth" element={<Auth/>}></Route> 
      <Route path="/serviceauth" element={<ServiceAuth/>}></Route> 
      <Route path="/adminauth" element={<AdminAuth/>}></Route> 

    </Routes>);
  }

  // Step:2 Inorder to use AuthContext we Wrap the parts of 
  // Our Application that should be able to Use It
  return (
    // Every selectors or components can have access to content 
    // providers also take a value which binds or changes the initial values Created inside the context
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,login:login,logout:logout,userId:userId}}>

      {/* When the value changes inside the provider those compound which lesson, or use the context value, will rerender */}

    <Router>
      <MainNavigation/>
      <main>
        {routes}
      </main>
    </Router>
    </AuthContext.Provider>
  
  );
}

export default App;
