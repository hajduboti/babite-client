import Login from "./components/auth/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from 'react';
import Channels from './components/Channels';
import PageNotFound from './components/PageNotFound';
import Channel from './components/Channel';
import Following from './components/Following';
import App from './App';

const createRoutes = () => (
  <Router>
  <App />
    <Switch>
      <Route exact path="/" component={Channels}/>
      <Route exact path="/following" component={Following}/>
      <Route component={Channel}/>
    </Switch>
  </Router>
);

export default createRoutes;
