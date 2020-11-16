import React from 'react';
import { Link } from 'react-router-dom';

export default function PinCard({ pinData }) {
  return (
    <div className='card m-2'>
      <img className='card-img-top' src={pinData.imgUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pinData.name}</h5>
        <p className='card-text'>
          {pinData.description}
        </p>
        <Link className='btn btn-primary' to={`/pin-edit/${pinData.firebaseKey}`}>
          Edit Pin
        </Link>
      </div>
    </div>
  );
}
