import React from 'react';
import { Link } from 'react-router-dom';
import AppModal from '../AppModal';
import PinForm from '../Forms/PinForm';

export default function PinCard({ pinData, deletePin, onUpdate }) {
  return (
    <div className='card m-2'>
      <a href={pinData.website}>
      <div className="img-container card-body" style={{ backgroundImage: `url(${pinData.imageUrl})` }}>
      <h3 className='card-title grow'>{pinData.name}</h3>
    </div>
      </a>

        <p className='card-text'>
          {pinData.description}
        </p>
        <AppModal buttonLabel={'Edit Pin'} btnColor={'info'} title={'Edit Pin'}>
          <PinForm pin={pinData} onUpdate={onUpdate}/>
        </AppModal>
        <button onClick={() => { deletePin(pinData.firebaseKey); } }className='btn btn-dark delete-board board-buttons'>
          <i className='far fa-trash-alt'></i> Delete Pin
        </button>
      </div>
  );
}
