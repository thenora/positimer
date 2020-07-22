import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Work from './components/Work';
import Home from './components/Home';
import Break from './components/Break';
import Stats from './components/Stats';
import About from './components/About';
import Countdown from './components/Countdown';
import Quotes from './components/Quotes';
import ShowQuote from './components/ShowQuote';
import QuoteAdmin from './components/QuoteAdmin';
import PrivacyPolicy from './components/PrivacyPolicy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notfound from './components/Notfound';
import * as workerInterval from 'worker-interval';
import './App.css';

function App() {


  return (
    <div className="App page">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/about" component={About} />
          <Route exact path="/quotes" component={Quotes} />
          <Route exact path="/admin" component={QuoteAdmin} />
          <Route exact path="/privacy" component={PrivacyPolicy} />

        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
