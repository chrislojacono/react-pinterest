import React from 'react';
import { getAllPins, deletePin, deletePinsOfBoards } from '../helpers/data/pinData';
import { getPinsBoards } from '../helpers/data/boardData';
import PinCard from '../components/Cards/PinCard';
import PublicPinCard from '../components/Cards/PublicPinCard';

class PublicPins extends React.Component {
  state = {
    publicPins: [],
  };

  componentDidMount() {
    this.getThePins();
  }

  getThePins = () => {
    this.setState({
      publicPins: [],
    });
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
    }).then(() => this.setState({
      publicPins: [],
    }));
    this.getThePins();
  }

  render() {
    const { publicPins } = this.state;
    return (
      <div className='d-flex flex-row flex-wrap container'>
        {publicPins.map((pin) => (
          <PublicPinCard key={pin.firebaseKey} pinData={pin} />
        ))}
      </div>
    );
  }
}

export default PublicPins;
