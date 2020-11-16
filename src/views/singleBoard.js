import React from 'react';
import getPin from '../helpers/data/pinData';
import boardData from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinCard';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    // 0. Make a call to the API that gets the board info
    const boardId = this.props.match.params.id;
    boardData.getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });

    // 1. Make a call to the API that returns the pins associated with this board and set to state.
    this.getPins(boardId)
      // because we did a promise.all, the response will not resolve until all the promises are completed
      .then((resp) => (
        this.setState({ pins: resp })
      ));
  }

  getPins = (boardId) => (
    boardData.getBoardPins(boardId).then((response) => {
      console.warn('Board Pin response', response);
      // an array that holds all of the calls to get the pin information
      const pinArray = [];
      response.forEach((item) => {
        console.warn('pin response', item);
        // pushing a function that returns a promise into the pinArray
        pinArray.push(getPin.getPin(item.pinId));
      });
      // returning an array of all the fullfilled promises
      return Promise.all([...pinArray]);
    })
  )

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      pins.map((pin) => (
         <PinsCard key={pin.firebaseKey} pin={pin} />
      ))
    );

    // 3. Render the pins on the DOM
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
