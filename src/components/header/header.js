import React from 'react';

import './header.css';

const Header = () => {
  return(
    <div className="header d-flex">
      <h3>Find a delicious food here</h3>
      <ul className="d-flex">
        <li><a href="#">Search</a></li>
        <li><a href="#">Recipies</a></li>
      </ul>
    </div>
  )
};

export default Header;