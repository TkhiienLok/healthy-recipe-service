import React, { Component } from 'react';

import Spinner from '../spinner';
import HealthyFoodService from '../../services/healthy-food-service';
import './recipe-details.css';

export default class RecipeDetails extends Component {

  healthyFoodService = new HealthyFoodService()

  state = {
    recipe: null,
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.updateRecipe(this.props.chosenSearchText, this.props.recipeIdx);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.recipeIdx !== prevProps.recipeIdx || this.props.chosenSearchText !== prevProps.chosenSearchText) {
      this.updateRecipe(this.props.chosenSearchText, this.props.recipeIdx);
    }
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  onRecipeLoaded = (recipe) => {
    this.setState({
      recipe,
      loading: false,
    });
  }

  updateRecipe = (term, id) => {
    if (!id) {
      return;
    }
    this.setState({
      loading: true
    });
    this.healthyFoodService
      .getHealthyRecipe(term, id)
      .then((recipe) => {
        this.setState({
          recipe,
          loading: false,
          error: false
        });
      })
      .catch(this.onError);
  }

  render() {

    if (!this.state.recipe) {
      return <span>Select a recipe from a list</span>
    }
    const { loading, error } = this.state;
    const loader = loading && !error ? <Spinner /> : null;
    const content = !loading && !error ? <RecipeDetailView recipe={this.state.recipe}/> : null;
    return (
      <div className="recipe-details card">
        { loader }
        { content }
      </div>
    )
  }
}

const RecipeDetailView = ({recipe}) => {
  const { title, calories, totalWeight, nutrients={}, imageURL, diets=[], cautions=[], url } = recipe;
  return(
    <React.Fragment>
      <div className="recipe-image-wrapper">
          <a target="_blank" rel="noopener noreferrer" href={url}>
          <img className="recipe-image"
            src={imageURL}
            alt="dish look"/>
          </a>
        </div>

        <div className="card-body">
          <h4>{title}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Calories</span>
              <span>{ Math.round(calories * 100 / totalWeight) }  | 100g</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diet -</span>
              {
                diets.map((diet, idx, arr) => {
                  return(<span key={`diet-${idx}`}>{ diet } { idx < arr.length - 1 ? ',' : '' } </span>);
                })
              }
            </li>
            { cautions.length
          ?
            (<li className="list-group-item">
              <span className="term caution">!</span>
                {
                  cautions.map((caution, idx, arr) => {
                    return(<span key={caution}>{ caution } { idx < arr.length - 1 ? ',' : '' } </span>);
                  })
                }
            </li>)
          :
            null }
            <li className="list-group-item">
              <span className="term">Ingredients: </span>
              <ul>
              {
                diets.map((ingredient, idx, arr) => {
                  return(<li key={`ingredient-${idx}`}>{ ingredient }</li>);
                })
              }
              </ul>
            </li>
            <li className="list-group-item">Nutrients:
              <ul>
                {
                  Object.keys(nutrients).map((nutrient) => {
                    return(<li key={nutrient}>{ nutrient }: { nutrients[nutrient] }</li>);
                  })
                }
              </ul>
            </li>
            <li className="list-group-item">
              <a target="_blank" rel="noopener noreferrer" href={url}>Go to website</a>
            </li>
          </ul>
        </div>
    </React.Fragment>
  );
};