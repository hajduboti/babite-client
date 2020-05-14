import React from 'react';
// import logo from './logo.svg';
import Channels from './components/Channels';
import NavbarBabite from './components/Navbar';
import './static/css/App.css';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Provider store={store}>
      <NavbarBabite />
      <Channels />
    </Provider>
  );
}

export default App;
