import React from "react";
// import logo from './logo.svg';
import Channels from './components/Channels';
import PageNotFound from './components/PageNotFound';
import Channel from './components/Channel';
import EditProgramme from './components/EditProgramme';
import NavbarBabite from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';


Amplify.configure(awsmobile);



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isAuthenticated: null,
        username: null
    }
  }
  // This is quite horrendous. But I can see no other way.
  componentDidMount () {
    let lastLoggedUser = localStorage.getItem("CognitoIdentityServiceProvider.2un1dsdo335a6ja7l0pm0ener0.LastAuthUser")
    this.setState({ isAuthenticated: localStorage.getItem("CognitoIdentityServiceProvider.2un1dsdo335a6ja7l0pm0ener0." + lastLoggedUser + ".accessToken"), username: lastLoggedUser });
  }
  render(){

  return (
    <BrowserRouter>
    <Provider store={store}>
      <NavbarBabite isAuthenticated={this.state.isAuthenticated} username={this.state.username} />
      {/* Maybe this can be transferred to a router component which we can declare here */}
        <Switch>
          <Route exact path="/" component={Channels}/>
          <Route exact path={`/${this.state.username}/programmes`} component={EditProgramme}/>
        </Switch>
      {/* An example of routing/paths that works. Commented for future use. */}
      {/* <Route path="/login" component={Login} /> */}
    </Provider>
    </BrowserRouter>

  );
}
}

export default App;
