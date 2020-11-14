import React, { Component } from 'react';

export default class Boards extends Component {
  render() {
    const { boardData } = this.props;
    return (
      <div className='card grow'>
        <div href='#'className='see-pins'>
            <img src={boardData.imageUrl} alt="board"/>
            <h3 className='card-title grow'>{boardData.name}</h3>
        </div>
        <div>
            <p className="card-text">{boardData.description}</p>
        </div>
        <div className='board-button'>
          <button
            className='btn btn-info pin-btn see-pins board-buttons'
          >
            <i id='pin-icon' className='fas fa-map-pin'></i> Pins
          </button>
          <button
            className='btn btn-outline-warning update-board board-buttons'
          >
            Update Board
          </button>
          <button
            className='btn btn-dark delete-board board-buttons'
          >
            <i className='far fa-trash-alt'></i> Delete Board
          </button>
        </div>
      </div>
    );
  }
}
