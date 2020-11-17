import React from 'react';
import getUid from '../helpers/data/authData';
import boardData from '../helpers/data/boardData';
import BoardCard from '../components/Cards/BoardCard';
import BoardForm from '../components/Forms/BoardForm';

class Boards extends React.Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    boardData.getAllUserBoards(currentUserId).then((response) => {
      this.setState(
        {
          boards: response,
        },
      );
    });
  };

  deleteBoard = (firebasekey) => {
    boardData.deleteBoard(firebasekey);
  };

  render() {
    const { boards } = this.state;
    return (
      <div className='d-flex flex-row flex-wrap'>
        <BoardForm onUpdate={this.getBoards} />
        {boards.map((board) => (
          <BoardCard
            key={board.firebaseKey}
            boardData={board}
            boardDataFunc={this.deleteBoard}
          />
        ))}
      </div>
    );
  }
}

export default Boards;
