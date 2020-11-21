import React from 'react';

export default function PublicPinCard({ pinData }) {
  return (
    <div className='card m-2 grow'>
      <a href={pinData.website}>
      <div className="img-container card-body" style={{ backgroundImage: `url(${pinData.imageUrl})` }}>
      <h3 className='card-title grow'>{pinData.name}</h3>
    </div>
      </a>

        <p className='card-text'>
          {pinData.description}
        </p>
      </div>
  );
}
