import React from 'react';
import getUid from '../helpers/data/authData';
import { getAllUserBoards, deleteBoard, getBoardPins } from '../helpers/data/boardData';
import BoardCard from '../components/Cards/BoardCard';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';
import { deletePinsOfBoards, deletePin } from '../helpers/data/pinData';

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

  deleteBoard = (firebaseKey) => {
    deleteBoard(firebaseKey);
    getBoardPins(firebaseKey).then((response) => {
      response.forEach((item) => {
        deletePinsOfBoards(item.firebaseKey);
      });
    });
  };

  render() {
    const { boards } = this.state;
    return (
      <>
      <div className="m-1">
      <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
      <BoardForm onUpdate={this.getBoards} />
        </AppModal>
      </div>
      <div className='d-flex flex-row flex-wrap justify-content-center'>
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
