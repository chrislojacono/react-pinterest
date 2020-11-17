import React from 'react';
import { getAllPins } from '../helpers/data/pinData';
import PinCard from '../components/Cards/PinCard';

class PublicPins extends React.Component {
  state = {
    publicPins: [],
  };

  componentDidMount() {
    getAllPins().then((response) => {
      response.forEach((pin) => {
        if (pin.private === false) {
          this.setState({
            publicPins: this.state.publicPins.concat(pin),
          });
        }
      });
    });
  }

  render() {
    const { publicPins } = this.state;
    return (
      <div className='d-flex flex-row flex-wrap container'>
        {publicPins.map((pin) => (
          <PinCard key={pin.firebaseKey} pinData={pin} />
        ))}
      </div>
    );
  }
}

export default PublicPins;
