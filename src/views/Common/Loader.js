import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loader = () => (
  <div className="loading">{' '}<PropagateLoader color={'#165d93'} /></div>
);

export default Loader;
