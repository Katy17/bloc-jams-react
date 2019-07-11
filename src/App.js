import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    return (
      <div className="App fluid-container">
        <header>
          <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top ">
            <Link to='/' className="navbar-brand">BLOC JAMS</Link>
            <ul className="nav xxxx">
              <li className="nav-item">
                <Link to='/' className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/library' className="nav-link">Library</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
