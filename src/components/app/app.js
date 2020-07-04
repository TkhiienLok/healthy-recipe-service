import React, { Component } from 'react';

import Header from '../header';
import RandomRecipe from '../random-recipe';
import RecipesPage from '../recipes-page';
import ErrorIndicator from '../error-indicator';
import './app.css';

export default class App extends Component {

  state = {
    showRandomRecipe: true,
    chosenRecipe: null,
    hasError: false
  };

  onRecipeClicked = (idx) => {
    this.setState({
      chosenRecipe: null
    });
    this.setState({
      chosenRecipe: idx
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
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const recipe = this.state.showRandomRecipe ?
      <RandomRecipe onItemSelected={this.onRecipeClicked}/> :
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
        <RecipesPage recipeIdx={this.state.chosenRecipe}/>
      </div>
    );
  }
};
