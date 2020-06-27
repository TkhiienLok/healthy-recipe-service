import React, { Component } from 'react';

import Header from '../header';
import RandomRecipe from '../random-recipe';
import ItemList from '../item-list';
import RecipeDetails from '../recipe-details';

import './app.css';
import ErrorIndicator from '../error-indicator';

export default class App extends Component {

  state = {
    showRandomRecipe: true,
    selectedRecipe: null,
    hasError: false
  };

  onRecipeSelected = (idx) => {
    this.setState({
      selectedRecipe: null
    });
    this.setState({
      selectedRecipe: idx
    });
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  toggleRandomRecipe = () => {
    this.setState((state) => {
      return {
        showRandomRecipe: !state.showRandomRecipe
      }
    });
  };

  render() {
    if (this. state.hasError) {
      return <ErrorIndicator />;
    }
    const recipe = this.state.showRandomRecipe ?
      <RandomRecipe onItemSelected={this.onRecipeSelected}/> :
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
