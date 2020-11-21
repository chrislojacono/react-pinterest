import React from 'react';
import getUid from '../helpers/data/authData';
import { getUserPins, deletePin, deletePinsOfBoards } from '../helpers/data/pinData';
import { getPinsBoards } from '../helpers/data/boardData';
import PinCard from '../components/Cards/PinCard';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';

export default class Pins extends React.Component {
  state = {
    pins: [],
  };

  componentDidMount() {
    this.getPins();
  }

  deletePin = (firebaseKey) => {
    deletePin(firebaseKey);
    getPinsBoards(firebaseKey).then((response) => {
      response.forEach((item) => {
        const newArray = Object.values(item);
        if (newArray.includes(firebaseKey)) {
          deletePinsOfBoards(item.firebaseKey);
        }
      });
    });
    this.getPins();
  }

  getPins = () => {
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
        <AppModal buttonLabel={'Add A Pin'} title={'Add A Pin'}>
        <PinForm onUpdate={this.getPins}/>
        </AppModal>
        <div className="d-flex flex-wrap container">
        {pins.map((pin) => <PinCard key={pin.firebaseKey} deletePin={this.deletePin} pinData={pin} onUpdate={this.getPins}/>)}
        </div>

      </div>
    );
  }
}
