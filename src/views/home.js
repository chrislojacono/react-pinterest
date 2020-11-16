import React from 'react';
import Boards from './boards';
import Auth from '../components/Auth';

export default function Home(props) {
  const loadComponent = () => {
    let component = '';
    if (props.user) {
      component = <Boards />;
    } else {
      component = <Auth />;
    }
    return component;
  };
  return (
    <div>
      <h1>Home Page</h1>
      {loadComponent()}
    </div>
  );
}
