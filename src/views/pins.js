import React from 'react';
import getUid from '../helpers/data/authData';
import { getUserPins } from '../helpers/data/pinData';
import PinCard from '../components/Cards/PinCard';

export default class Pins extends React.Component {
  state = {
    pins: [],
  };

  componentDidMount() {
    const userId = getUid();
    getUserPins(userId).then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  render() {
    const { pins } = this.state;
    return (
      <div>
        <h1>Your Pins</h1>
        <div className="d-flex flex-wrap container">
        {pins.map((pin) => <PinCard key={pin.firebaseKey} pinData={pin} />)}
        </div>

      </div>
    );
  }
}
