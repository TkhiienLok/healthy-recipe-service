import React, { Component } from 'react';

import './recipe-details.css';

export default class RecipeDetails extends Component {

  render() {
    return (
      <div className="recipe-details card">
        <div className="recipe-image-wrapper">
          <a target="_blank" rel="noopener noreferrer" href="https://www.chowhound.com/recipes/healthy-blueberry-smoothie-31683">
          <img className="recipe-image"
            src="https://www.edamam.com/web-img/836/836057a76c3163f22a6822d714695f2c.gif" 
            alt="dish look"/>
          </a>
        </div>

        <div className="card-body">
          <h4>Healthy Blueberry Smoothie</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Calories</span>
              <span>213 | 100g</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diet Labels</span>
              <ul>
                <li>Balanced</li>
                <li>Low-Sodium</li>
              </ul>
            </li>
            <li className="list-group-item">
              <span className="term">Ingredients</span>
              <ul>
                <li>1/2 cup milk</li>
                <li>1/2 cup plain yogurt</li>
                <li>1 cup blueberries, fresh or frozen</li>
                <li>1/2 ripe banana</li>
                <li>1/2 cup fresh spinach leaves</li>
                <li>1/8 teaspoon ground nutmeg</li>
                <li>1 teaspoon honey, or to taste</li>
                <li>1 cup ice cubes</li>
              </ul>
            </li>
            <li className="list-group-item">
              <a target="_blank" rel="noopener noreferrer" href="https://www.chowhound.com/recipes/healthy-blueberry-smoothie-31683">Go to website</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
