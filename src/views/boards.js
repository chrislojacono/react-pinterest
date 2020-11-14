import React from 'react';
import boardData from '../helpers/data/boardData';
import BoardCard from '../components/Cards/BoardCard';

class Boards extends React.Component {
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
        {boards.map((board) => (
          <BoardCard key={board.firebaseKey} boardData={board} />
        ))}
      </div>
    );
  }
}

export default Boards;
