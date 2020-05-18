import React, { useState } from "react";
// import logo from './logo.svg';
import Channels from './components/Channels';
import NavbarBabite from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from "react-router-dom";
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import Login from './components/auth/Login';


Amplify.configure(awsmobile);

function App() {
  return (
    <Provider store={store}>
      {/* An example of routing/paths that works. Commented for future use. */}
      <Route path="/login" component={Login} />
      <NavbarBabite />
      <Channels/>
    </Provider>
  );
}

export default App;
