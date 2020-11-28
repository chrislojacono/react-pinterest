import React from 'react';
import PublicPins from './PublicPins';
import Auth from '../components/Auth';
import Loader from '../components/Loader';

export default function Home(props) {
  const loadComponent = () => {
    let component = '';
    if (props.user === null) {
      component = <Loader />;
    } else if (props.user) {
      component = <PublicPins />;
    } else {
      component = <Auth />;
    }
    return component;
  };
  return (
    <div>
      {loadComponent()}
    </div>
  );
}
