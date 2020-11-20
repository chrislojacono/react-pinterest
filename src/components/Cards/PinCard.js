import React from 'react';
import { Link } from 'react-router-dom';

export default function PinCard({ pinData, deletePin }) {
  return (
    <div className='card m-2'>
      <div className="img-container card-body" style={{ backgroundImage: `url(${pinData.imageUrl})` }}>
      <h3 className='card-title grow'>{pinData.name}</h3>
    </div>
        <p className='card-text'>
          {pinData.description}
        </p>
        <Link className='btn btn-primary' to={`/pin-edit/${pinData.firebaseKey}`}>
          Edit Pin
        </Link>
        <button onClick={() => { deletePin(pinData.firebaseKey); } }className='btn btn-dark delete-board board-buttons'>
          <i className='far fa-trash-alt'></i> Delete Pin
        </button>
      </div>
  );
}
