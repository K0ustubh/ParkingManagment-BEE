import logo from './logo.svg';
import Navbar from './Components/Navbar';
import Login from'./Components/Login';
import Signup from './Components/SignUp';
import Footer from './Components/Footer';
import ParkingSpace from './Components/ParkingSpace';
//import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Login />
      <Signup />  
      <ParkingSpace /> 
      <Footer />
    </div>
  );
}

export default App;