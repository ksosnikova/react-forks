import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import Results from './pages/Results/Results';
import Search from './pages/Search/Search';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/search'>
          <Search />
          </Route>
          <Route path='/results'>
        <Results />
        </Route>
      <Redirect to='/search' />
      </Switch>
   </Router>
  );
}

export default App;
