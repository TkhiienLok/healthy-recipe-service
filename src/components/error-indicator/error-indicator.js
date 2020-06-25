import React from 'react';

import './error-indicator.css';
import image from './error-icon.png';


const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={image} alt="Error" className="error-icon"/>
      <span className="oops">Oops..</span>
      <span>something went wrong</span>
      <div className="author-attribute">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
};

export default ErrorIndicator;