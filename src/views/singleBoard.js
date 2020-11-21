import React from 'react';
import { getSinglePin, deletePin, deletePinsOfBoards } from '../helpers/data/pinData';
import { getBoardPins, getSingleBoard } from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinCard';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    const boardId = this.props.match.params.id;

    this.getBoardInfo(boardId);
    this.getPins(boardId).then((resp) => this.setState({
      pins: resp,
    }));
  }

  getPins = (boardId) => (
    getBoardPins(boardId).then((response) => {
      const pinArray = [];
      response.forEach((item) => {
        pinArray.push(getSinglePin(item.pinId));
      });
      return Promise.all([...pinArray]);
    }))

    getBoardInfo = (boardId) => {
      getSingleBoard(boardId).then((response) => {
        this.setState({
          board: response,
        });
      });
    }

    deletePin = (firebaseKey) => {
      deletePin(firebaseKey);
      getBoardPins(this.state.board.firebaseKey).then((response) => {
        response.forEach((item) => {
          const newArray = Object.values(item);
          if (newArray.includes(firebaseKey)) {
            deletePinsOfBoards(item.firebaseKey);
          }
        });
      });
    }

    render() {
      const { pins, board } = this.state;
      const renderPins = () => (
        pins.map((pin) => <PinsCard key={pin.firebaseKey} onUpdate={this.getPins} deletePin={this.deletePin} pinData={pin}/>)
      );

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
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap container'>{renderPins()}</div>
      </div>
      );
    }
}
