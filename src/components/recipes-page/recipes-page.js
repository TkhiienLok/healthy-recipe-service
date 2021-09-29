import React, { Component } from "react";

import ItemList from "../item-list";
import RecipeDetails from "../recipe-details";
import ErrorIndicator from "../error-indicator";
import ToggleError from "../toggle-error";

import HealthyFoodService from "../../services/healthy-food-service";
import "./recipes-page.css";

export default class RecipesPage extends Component {
  healthyFoodService = new HealthyFoodService();

  state = {
    selectedRecipe: null,
    selectedSearchText: null,
    query: null,
    hasError: false,
    renderError: false,
  };

  onRecipeSelected = (idx, query) => {
    this.setState({
      selectedRecipe: idx,
      selectedSearchText: query,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.recipeIdx !== prevState.selectedRecipe &&
      !prevState.hasError
    ) {
      this.setState({
        selectedRecipe: this.props.recipeIdx,
        selectedSearchText: this.props.chosenSearchText,
        hasError: false,
      });
    }
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList
            onItemSelected={this.onRecipeSelected}
            getData={this.healthyFoodService.getTopHealthyRecipies}
            searchString={this.props.searchString}
            renderItem={(item) => item.title}
          />
        </div>
        <div className="col-md-6">
          <RecipeDetails
            recipeIdx={this.state.selectedRecipe}
            chosenSearchText={this.state.selectedSearchText}
          />
          {/* <ToggleError /> */}
        </div>
      </div>
    );
  }
}
