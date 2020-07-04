import React, { Component } from 'react';
import HealthyFoodService from '../../services/healthy-food-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './random-recipe.css';


export default class RandomRecipe extends Component {
  healthyFoodService = new HealthyFoodService();

  state = {
    recipe: {},
    quantity: 100,
    unit: 'g',
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.updateRecipe();
    this.interval = setInterval(this.updateRecipe, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onRecipeLoaded = (recipe) => {
    this.setState({
      recipe,
      loading: false,
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updateRecipe = () => {
    const randomRecipeNumber = Math.floor(Math.random() * 10);
    this.healthyFoodService.getHealtyRecipe(randomRecipeNumber)
      .then(this.onRecipeLoaded)
      .catch(this.onError)
  }

  render() {
    const { recipe, quantity, unit, loading, error } = this.state;
    
    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading && !error? <Spinner /> : null;
    const content = hasData ? <RecipeView
                                recipe={recipe}
                                quantity={quantity}
                                unit={unit}
                                onItemSelected={this.props.onItemSelected}/>
                                : null;
    return (
      <React.Fragment>
        <div className="random-recipe jumbotron rounded">
          {errorMessage}
          {spinner}
          {content}
        </div>
      </React.Fragment>
    );
  }
};

const RecipeView = ({recipe, quantity, unit, onItemSelected}) => {
  const { id, title, calories, totalWeight, imageURL, diets=[], cautions=[] } = recipe;
  return (
    <React.Fragment>
      <div className="recipe-image-wrapper">
        <img src={imageURL} className="recipe-image" alt="dish look"/>
      </div>
      <div>
        <span style={ { color: '#b5f341' } }>May be you would you try this? ;)</span>
        <h4>{ title }</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Calories -</span>
            <span>{ Math.round(calories * quantity / totalWeight) } / { quantity } { unit }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diet -</span>
              {
                diets.map((diet, idx, arr) => {
                  return(<span key={diet}>{ diet } { idx < arr.length - 1 ? ',' : '' } </span>);
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
            <button onClick={() => onItemSelected(id)} className="btn btn-outline-secondary">See details</button>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};