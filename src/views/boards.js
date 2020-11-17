import React from 'react';
import getUid from '../helpers/data/authData';
import { getAllUserBoards, deleteBoard } from '../helpers/data/boardData';
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
    getAllUserBoards(currentUserId).then((response) => {
      this.setState(
        {
          boards: response,
        },
      );
    });
  };

  deleteBoard = (firebasekey) => {
    deleteBoard(firebasekey);
  };

  render() {
    const { boards } = this.state;
    return (
      <>
      <BoardForm onUpdate={this.getBoards} />
      <div className='d-flex flex-row flex-wrap'>
        {boards.map((board) => (
          <BoardCard
            key={board.firebaseKey}
            boardData={board}
            boardDataFunc={this.deleteBoard}
          />
        ))}
      </div>
      </>
    );
  }
}

export default Boards;
