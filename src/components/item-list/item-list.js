import React, { Component } from 'react';

import './item-list.css';

export default class ItemList extends Component {

  render() {
    return (
      <ul className="item-list list-group">
        <li className="list-group-item">
          Healthy Pancakes
        </li>
        <li className="list-group-item">
          Family Foodie
        </li>
        <li className="list-group-item">
          Healthy Blueberry Smoothie
        </li>
        <li className="list-group-item">
          Turkey Alfalfa Healthy Sandwich
        </li>
        <li className="list-group-item">
          Gluten-free quiche with collard greens, ham and leeks
        </li>
        <li className="list-group-item">
          Massaged Kale Salad Recipe
        </li>
      </ul>
    );
  }
}