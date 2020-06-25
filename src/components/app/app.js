import React, { Component } from 'react';

import Header from '../header';
import RandomRecipe from '../random-recipe';
import ItemList from '../item-list';
import RecipeDetails from '../recipe-details';

import './app.css';

export default class App extends Component {

  state = {
    showRandomRecipe: true,
    selectedRecipe: null
  };

  onRecipeSelected = (idx) => {
    this.setState({
      selectedRecipe: idx
    })
  }

  toggleRandomRecipe = () => {
    this.setState((state) => {
      return {
        showRandomRecipe: !state.showRandomRecipe
      }
    });
  };

  render() {
    const recipe = this.state.showRandomRecipe ?
      <RandomRecipe/> :
      null;

    return (
      <div className='app-content'>
        <Header />
        { recipe }
        <button
          className="toggle-recipe btn btn-outline-secondary btn-lg"
          onClick={this.toggleRandomRecipe}>
          Toggle Random Recipe
        </button>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onRecipeSelected}/>
          </div>
          <div className="col-md-6">
            <RecipeDetails recipeIdx={this.state.selectedRecipe}/>
          </div>
        </div>
      </div>
    );
  }
};
