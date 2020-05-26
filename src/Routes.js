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
// import {BrowserRouter, Route, Switch} from "react-router-dom";
// import App from "./App"

// import Login from "./components/auth/Login";
// import Channel from "./components/Channel";
// import App from "./App";

// <BrowserRouter>
//   <Switch>
//     <Route exact path="/" component={App} />
//     {/* <Route path='/services' component={ServicePage} />
//     <Route path='/products/singleproduct' component={SingleProductPage} />
//     <Route exact path='/products' component={ProductPage} /> */}
//   </Switch>
// </BrowserRouter>
