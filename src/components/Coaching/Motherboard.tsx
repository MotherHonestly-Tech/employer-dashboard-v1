import React from 'react';
import ReactDOM from 'react-dom';

import { load } from 'web-component-load';

const Motherboard = () => {
  React.useEffect(() => {
    load('http://localhost:4200');
  }, []);
  return (
    <div>
      {/* @ts-ignore */}
      <angular-component />
    </div>
  );
};

export default Motherboard;
