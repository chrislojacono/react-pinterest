import React from 'react';
import { getSinglePin } from '../helpers/data/pinData';
import { getBoardPins, getSingleBoard } from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinCard';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';
import PinForm from '../components/Forms/PinForm';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    // 1. Pull boardId from URL params
    const boardId = this.props.match.params.id;
    // 2. Make a call to the API that gets the board info
    this.getBoardInfo(boardId);
    // 3. Make a call to the API that returns the pins associated with this board and set to state.
    this.getPins(boardId).then((resp) => this.setState({ pins: resp }));
    // because we did a promise.all, the response will not resolve until all the promises are completed
  }

  getPins = (boardId) => (
    getBoardPins(boardId).then((response) => {
      // an array that holds all of the calls to get the pin information
      const pinArray = [];
      response.forEach((item) => {
        // pushing a function that returns a promise into the pinArray
        pinArray.push(getSinglePin(item.pinId));
      });
      // returning an array of all the fullfilled promises
      return Promise.all([...pinArray]);
    }))

    getBoardInfo = (boardId) => {
      getSingleBoard(boardId).then((response) => {
        this.setState({
          board: response,
        });
      });
    }

    render() {
      const { pins, board } = this.state;
      const renderPins = () => (
      // 4. map over the pins in state
        pins.map((pin) => <PinsCard key={pin.firebaseKey} pinData={pin}/>)
      );
      // 5. Render the pins on the DOM
      return (
      <div>
        <AppModal
          title={'Update Board'}
          btnColor={'danger'}
          buttonLabel={'Update Board'}
          icon={'fa-plus-circle'}
        >
          {Object.keys(board).length && (
            <BoardForm board={board} onUpdate={this.getBoardInfo} />
          )}
        </AppModal>
        <AppModal
          title={'Add Pin'}
          btnColor={'success'}
          buttonLabel={'Add Pin'}
          icon={'fa-plus-circle'}
        >
          <PinForm boardId={this.props.match.params.id} onUpdate={this.getPins}/>
        </AppModal>
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap container'>{renderPins()}</div>
      </div>
      );
    }
}
