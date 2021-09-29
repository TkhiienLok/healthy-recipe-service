import React, { Component } from "react";

import Header from "../header";
import RandomRecipe from "../random-recipe";
import RecipesPage from "../recipes-page";
import ErrorIndicator from "../error-indicator";
import RecipeSearch from "../recipe-search";
import "./app.css";

export default class App extends Component {
  state = {
    showRandomRecipe: true,
    chosenRecipe: null,
    chosenSearchText: null,
    hasError: false,
    searchKeyWordsString: "healthy",
  };

  onRecipeClicked = (idx, searchText) => {
    this.setState({
      chosenRecipe: null,
    });
    this.setState({
      chosenRecipe: idx,
      chosenSearchText: searchText,
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  toggleRandomRecipe = () => {
    this.setState((state) => {
      return {
        showRandomRecipe: !state.showRandomRecipe,
      };
    });
  };

  onSearchSubmit = (term) => {
    this.setState({ searchKeyWordsString: term });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const recipe = this.state.showRandomRecipe ? (
      <RandomRecipe onItemSelected={this.onRecipeClicked} />
    ) : null;

    return (
      <div className="app-content">
        <Header />
        {recipe}
        <button
          className="toggle-recipe btn btn-outline-secondary btn-lg"
          onClick={this.toggleRandomRecipe}
        >
          {this.state.showRandomRecipe
            ? "Hide Random Recipe"
            : "Show Random Recipe"}
        </button>
        <RecipeSearch onSearchSubmit={this.onSearchSubmit} />
        <RecipesPage
          searchString={this.state.searchKeyWordsString}
          recipeIdx={this.state.chosenRecipe}
          chosenSearchText={this.state.chosenSearchText}
        />
      </div>
    );
  }
}
