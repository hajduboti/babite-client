import React from "react";
// import logo from './logo.svg';
import Channels from './components/Channels';
import NavbarBabite from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from "react-router-dom";
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
      {/* An example of routing/paths that works. Commented for future use. */}
      {/* <Route path="/login" component={Login} /> */}
      <NavbarBabite isAuthenticated={this.state.isAuthenticated} />
      <Channels/>
    </Provider>
  );
}
}

export default App;
