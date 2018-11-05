import React, { Component } from 'react';
import './App.css';

import LaptopList from './LaptopList';
import Navigation from './Navigation';
import FilterBar from './FilterBar';

class App extends Component {
  
  render() {
    return (
      <div>
        <Navigation />
        <FilterBar />
      </div>
    );
  }
}

export default App;
