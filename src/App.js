import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Board from './components/Board';
import Clock from './components/Clock';
import TicTacToe from './components/TicTacToe';
import List from './components/List';
import Counter from './components/Counter';
import './styles/App.css'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Board</Link>
            </li>
            <li>
              <Link to="/tictactoe/">TicTacToe</Link>
            </li>
            <li>
              <Link to="/clock/">Clock</Link>
            </li>
            <li>
              <Link to="/list/">List</Link>
            </li>
            <li>
              <Link to="/counter/">Counter</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Board} />
        <Route path="/tictactoe/" component={TicTacToe} />
        <Route path="/clock/" component={Clock} />
        <Route path="/list/" component={List} />
        <Route path="/counter/" component={Counter}/>
      </div>
    </Router>
  );
}

export default App;
