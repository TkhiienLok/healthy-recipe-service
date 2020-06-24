import React from 'react';

import Header from '../header';
import RandomRecipe from '../random-recipe';
import ItemList from '../item-list';
import RecipeDetails from '../recipe-details';

import './app.css';

const App = () => {
  return (
    <div className='app-content'>
      <Header />
      <RandomRecipe />
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList/>
        </div>
        <div className="col-md-6">
          <RecipeDetails />
        </div>
      </div>
    </div>
  );
};

export default App;