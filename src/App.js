// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import logo from './logo.svg';
import './App.css';
import ToDoComponent from './ToDoComponent';
import ToDoFormComponent from './ToDoFormComponent';
import { useAuth0 } from '@auth0/auth0-react';
import config from '../config';



// Auth0 configuration
const domain = config.domain; // Replace with your Auth0 domain
const clientId = config.clientId; // Replace with your Auth0 client ID

function App() {  


  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <AuthButton />
        </header>
      </div>
    </Auth0Provider>
  );
}

// AuthButton component to render login/logout button based on authentication status
const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return isAuthenticated ? (
    <div>
              <ToDoComponent  />
              <ToDoFormComponent />
            
    <button onClick={() => logout({ returnTo: "http://localhost:3001" })}>Log Out</button>
    </div>
  ) : (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  );
};

export default App;
