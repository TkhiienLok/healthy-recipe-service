import React, { Component } from 'react';

import ItemList from '../item-list';
import RecipeDetails from '../recipe-details';
import ErrorIndicator from '../error-indicator';
import ToggleError from '../toggle-error';

import HealthyFoodService from '../../services/healthy-food-service';
import './recipes-page.css';

export default class RecipesPage extends Component {

  healthyFoodService = new HealthyFoodService();

  state = {
    selectedRecipe: null,
    hasError: false,
    renderError: false
  }

  onRecipeSelected = (idx) => {
    this.setState({
      selectedRecipe: idx
    });
  }


  componentDidUpdate(prevProps, prevState) {
    if ((this.props.recipeIdx !== prevState.selectedRecipe) && !prevState.hasError) {
      this.setState({ 
        selectedRecipe: this.props.recipeIdx,
        hasError: false
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
            renderItem={(item) => item.title}/>
        </div>
        <div className="col-md-6">
          <RecipeDetails recipeIdx={this.state.selectedRecipe}/>
          <ToggleError />
        </div>
      </div>
    );
  }
}