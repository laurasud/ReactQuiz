import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.scss';
import './styles/reusable.scss'
import BrowserList from './components/BrowseList/BrowserList';
import ItemDetails from './components/ItemDetails/ItemDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={BrowserList}></Route>
          <Route path="/item/:itemId" component={ItemDetails}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
