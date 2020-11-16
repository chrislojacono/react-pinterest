import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from '../views/home';
import BoardForm from '../views/boardForm';
import Boards from '../views/boards';
import PinDetails from '../views/pinDetails';
import PinForm from '../views/pinForm';
import Pins from '../views/pins';
import SingleBoard from '../views/singleBoard';

export default function Routes({ user }) {
  return (
      <Switch>
        <Route exact path='/' component={() => <Home user={user} />} />
        <Route exact path='/boards' component={() => <Boards user={user} />} />
        <Route exact path='/boards/:id' component={(props) => <SingleBoard user={user} {...props}/>} />
        <Route exact path='/pins' component={() => <Pins user={user} />} />
        <Route exact path='/boardForm' component={() => <BoardForm user={user} />} />
        <Route exact path='/pinDetails' component={() => <PinDetails user={user} />} />
        <Route exact path='/pinForm' component={() => <PinForm user={user} />} />
        <Route exact path='/singleBoard' component={() => <SingleBoard user={user} />} />
        <Route component={() => <Home user={user} />} />
      </Switch>
  );
}
