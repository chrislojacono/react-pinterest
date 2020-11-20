import React from 'react';
import { getSinglePin, deletePin, deletePinsOfBoards } from '../helpers/data/pinData';
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
    const boardId = this.props.match.params.id;

    this.getBoardInfo(boardId);
    this.getPins(boardId);
  }

  getPins = (boardId) => (
    getBoardPins(boardId).then((response) => {
      const pinArray = [];
      response.forEach((item) => {
        pinArray.push(getSinglePin(item.pinId));
      });
      Promise.all([...pinArray]).then((resp) => this.setState({
        pins: resp,
      }));
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
      // 4. map over the pins in state
        pins.map((pin) => <PinsCard key={pin.firebaseKey} onUpdate={this.getPins} deletePin={this.deletePin} pinData={pin}/>)
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
