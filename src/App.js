import React from 'react';
import logo from './logo.svg';
import Channels from './components/Channels';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Channels />
    </Provider>
  );
}

export default App;
