import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Home from '../views/home';
import BoardForm from '../views/boardForm';
import Boards from '../views/boards';
import PinDetails from '../views/pinDetails';
import PinForm from '../views/pinForm';
import Pins from '../views/pins';
import SingleBoard from '../views/singleBoard';

export default function Routes({ authed }) {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={() => <Home authed={authed} />} />
        <Route exact path='/boards' component={() => <Boards authed={authed} />} />
        <Route exact path='/pins' component={() => <Pins authed={authed} />} />
        <Route exact path='/boardForm' component={() => <BoardForm authed={authed} />} />
        <Route exact path='/pinDetails' component={() => <PinDetails authed={authed} />} />
        <Route exact path='/pinForm' component={() => <PinForm authed={authed} />} />
        <Route exact path='/singleBoard' component={() => <SingleBoard authed={authed} />} />
        <Route component={() => <Home authed={authed} />} />
      </Switch>
    </Router>
  );
}
