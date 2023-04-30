import React from 'react';

export default function Loading() {
  return ( 
    <div style={{ textAlign: 'center' }}>
      <div className='loading' role="status" style={{ width: 200, height: 200 }}>
        <span className="sr-only">Loading ...</span>
      </div>
    </div>
  );
};

