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
        <Route exact path='/boards' component={Boards} />
        <Route exact path='/pins' component={Pins} />
        <Route exact path='/boardForm' component={BoardForm} />
        <Route exact path='/pinDetails' component={PinDetails} />
        <Route exact path='/pinForm' component={PinForm} />
        <Route exact path='/singleBoard' component={SingleBoard} />
        <Route component={() => <Home authed={authed} />} />
      </Switch>
    </Router>
  );
}
