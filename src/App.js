import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Quotes from './components/Quotes';
import QuoteAdmin from './components/QuoteAdmin';
import PrivacyPolicy from './components/PrivacyPolicy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notfound from './components/Notfound';
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
          <Route component={Notfound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
