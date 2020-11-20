import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardsCard({ boardData, boardDataFunc }) {
  return (
    <div className='card grow m-2'>
      <div class="img-container card-body" style={{ backgroundImage: `url(${boardData.imageUrl})` }}>
      <h3 className='card-title grow'>{boardData.name}</h3>
    </div>
      <div className="card-body">
        <p className='card-text'>{boardData.description}</p>
      </div>
      <div className='board-button'>
        <Link className='btn btn-info' to={`/boards/${boardData.firebaseKey}`}>
          {' '}
          See Pins
        </Link>
        <button onClick={() => { boardDataFunc(boardData.firebaseKey); } }className='btn btn-dark delete-board board-buttons'>
          <i className='far fa-trash-alt'></i> Delete Board
        </button>
      </div>
    </div>
  );
}
