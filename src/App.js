import React from "react";
// import logo from './logo.svg';
import Channels from './components/Channels';
import PageNotFound from './components/PageNotFound';
import Channel from './components/Channel';
import NavbarBabite from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';


Amplify.configure(awsmobile);



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isAuthenticated: null
    }
  }
  // This is quite horrendous. But I can see no other way.
  componentDidMount () {
    let lastLoggedUser = localStorage.getItem("CognitoIdentityServiceProvider.2un1dsdo335a6ja7l0pm0ener0.LastAuthUser")
    this.setState({ isAuthenticated: localStorage.getItem("CognitoIdentityServiceProvider.2un1dsdo335a6ja7l0pm0ener0." + lastLoggedUser + ".accessToken") });
  }
  render(){

  return (
    <Provider store={store}>
      <NavbarBabite isAuthenticated={this.state.isAuthenticated} />
      <Router>
        <Switch>
          <Route exact path="/" component={Channels}/>
          <Route component={Channel}/>
        </Switch>
      </Router>
      {/* An example of routing/paths that works. Commented for future use. */}
      {/* <Route path="/login" component={Login} /> */}
    </Provider>
  );
}
}

export default App;
