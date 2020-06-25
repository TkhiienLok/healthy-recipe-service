import React, { Component } from 'react';
import HealthyFoodService from '../../services/healthy-food-service';
import Spinner from '../spinner';
import './random-recipe.css';


export default class RandomRecipe extends Component {
  healthyFoodService = new HealthyFoodService();

  state = {
    recipe: {},
    quantity: 100,
    unit: 'g',
    loading: true
  }

  constructor() {
    super();
    this.updateRecipe();
  }

  onRecipeLoaded = (recipe) => {
    this.setState({ 
      recipe,
      loading: false
    });
  }

  updateRecipe() {
    const randomRecipeNumber = Math.floor(Math.random() * 10);
    
    this.healthyFoodService.getHealtyRecipe(randomRecipeNumber)
      .then(this.onRecipeLoaded)
  }

  render()  {
    const { recipe, quantity, unit, loading } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <RecipeView recipe={recipe} quantity={quantity} unit={unit}/>: null;
    return (
      <div className="random-recipe jumbotron rounded">
        {spinner}
        {content}
      </div>
    );
  }
};

const RecipeView = ({recipe, quantity, unit}) => {
  const { title, calories, totalWeight, nutrients={}, imageURL, diets=[], cautions=[], url } = recipe;
  return (
    <React.Fragment>
      <img src={imageURL} className="recipe-image" alt="dish look"/>
      <div>
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