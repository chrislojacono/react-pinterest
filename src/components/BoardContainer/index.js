import React from 'react';
import boardData from '../../helpers/data/boardData';
import Boards from '../Boards';

class BoardContainer extends React.Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    boardData().then((response) => {
      this.setState({
        boards: response,
      });
    });
  }

  render() {
    const { boards } = this.state;
    return (
      <div className='d-flex flex-row flex-wrap'>
        {boards.map((board) => <Boards key={board.firebaseKey} boardData={board} />)}
      </div>
    );
  }
}

export default BoardContainer;
