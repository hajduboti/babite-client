import React from 'react';
// import logo from './logo.svg';
import Channels from './components/Channels';
import NavbarBabite from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <NavbarBabite />
      <Router>
        <Switch>
          <Route exact path="/" component={Channels}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
