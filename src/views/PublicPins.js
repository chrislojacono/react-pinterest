import React from 'react';
import pinData from '../helpers/data/pinData';
import PinCard from '../components/Cards/PinCard';

class PublicPins extends React.Component {
  state = {
    publicPins: [],
  };

  componentDidMount() {
    pinData.getAllPins().then((response) => {
      response.forEach((pin) => {
        if (pin.isPrivate === false) {
          this.setState({
            publicPins: response,
          });
        }
      });
    });
  }

  render() {
    const { publicPins } = this.state;
    return (
      <div className='d-flex flex-row flex-wrap'>
        {publicPins.map((pin) => (
          <PinCard key={pin.firebaseKey} pinData={pin} />
        ))}
      </div>
    );
  }
}

export default PublicPins;
