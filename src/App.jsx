import React, { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { SellTicket } from './components/SellTicket';

function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/tickets/sell">Verkoop</Link>
          </li>
        </ul>
        <Switch>
          {/* <Route exact path="/" component={HomePage} /> */}
          <Route exact path="/tickets/sell" component={SellTicket} />
          {/* <Route path="/profile/:username" component={ProfileDetailPage} />
          <Route path="/feed" component={FeedPage} /> */}
        </Switch>
      </Router>
    </div>
  )
}

export default App
