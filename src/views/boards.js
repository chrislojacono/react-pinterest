import React from 'react';
import boardData from '../helpers/data/boardData';
import BoardCard from '../components/Cards/BoardCard';

class Boards extends React.Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    boardData.getBoards().then((response) => {
      this.setState({
        boards: response,
      });
    });
  }

  deleteBoard = (firebasekey) => {
    boardData.deleteBoard(firebasekey);
    this.state.boards.splice(0, 1);
  }

  render() {
    const { boards } = this.state;
    return (
      <div className='d-flex flex-row flex-wrap'>
        {boards.map((board) => (
          <BoardCard key={board.firebaseKey} boardData={board} boardDataFunc={this.deleteBoard} />
        ))}
      </div>
    );
  }
}

export default Boards;
