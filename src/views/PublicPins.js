import React from 'react';
import { getAllPins, deletePin } from '../helpers/data/pinData';
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
