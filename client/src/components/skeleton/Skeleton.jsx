import React from 'react';

const Skeleton = ({ value }) => {
  const skeletonRows = Array.from({ length: value }).map((_, index) => (
    <div
      key={index}
      className="bg-gray-900 animate-pulse rounded"
      style={{ width: '170.587px', height: '255px', marginBottom: '8px' }}
    />
  ));

  return (
    <div className="grid grid-flow-col auto-cols-auto gap-2">
      {skeletonRows}
    </div>
  );
};

export default Skeleton;
