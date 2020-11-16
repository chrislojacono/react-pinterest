import React from 'react';
import pinData from '../helpers/data/pinData';
import boardData from '../helpers/data/boardData';
import PinCard from '../components/Cards/PinCard';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    const boardId = this.props.match.params.id;
    boardData.getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });

    this.getPins(boardId)
      .then((resp) => (
        this.setState({ pins: resp })
      ));
  }

  getPins = (boardId) => (
    boardData.getBoardPins(boardId).then((response) => {
      console.warn(boardId);
      const pinArray = [];
      response.forEach((item) => {
        pinArray.push(pinData.getSinglePin(item.pinId));
      });
      return Promise.all([...pinArray]);
    })
  )

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      pins.map((pin) => (
         <PinCard key={pin.firebaseKey} pinData={pin} />
      ))
    );

    return (
      <div>
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap container'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
