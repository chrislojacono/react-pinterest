import React from 'react';
import { getAllPins, deletePin, deletePinsOfBoards } from '../helpers/data/pinData';
import { getPinsBoards } from '../helpers/data/boardData';
import PinCard from '../components/Cards/PinCard';

class PublicPins extends React.Component {
  state = {
    publicPins: [],
  };

  componentDidMount() {
    getAllPins().then((response) => {
      response.forEach((pin) => {
        if (pin.private === false || pin.private === 'false') {
          this.setState({
            publicPins: this.state.publicPins.concat(pin),
          });
        }
      });
    });
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
  }

  render() {
    const { publicPins } = this.state;
    return (
      <div className='d-flex flex-row flex-wrap container'>
        {publicPins.map((pin) => (
          <PinCard key={pin.firebaseKey} deletePin={this.deletePin} pinData={pin} />
        ))}
      </div>
    );
  }
}

export default PublicPins;
