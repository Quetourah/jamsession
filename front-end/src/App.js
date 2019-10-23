import React from 'react';
import Dance from './images/dance.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.js';
import Signup from './components/Signup.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
          
        <Login/>
      </header>
        <div className="container">
        <div className="row">
        <div className="col col-lg-8">
  <img src={Dance} className="img-respomsive App-logo" alt="logo" />
        </div>
        <div className=" col">
        <Signup />
        </div>
        </div>
        </div>
        
      
    </div>
  );
}

export default App;
