import React, { Component } from 'react';

import Spinner from '../spinner';
import HealthyFoodService from '../../services/healthy-food-service';
import './item-list.css';

export default class ItemList extends Component {

  healthyFoodService = new HealthyFoodService();

  state = {
    recipeList: null
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  componentDidMount() {
    this.healthyFoodService.getTopHealthyRecipies()
      .then((recipies) => {
        this.setState({
          recipeList: recipies
        });
      })
      .catch(this.onError)
  }

  renderItems(itemsArr) {
    return itemsArr.map(({ title, calories }, idx) => {
      return(
        <li key={`${idx}-${calories}`}
        className="list-group-item"
        onClick={() => this.props.onItemSelected(idx)}>
          { title }
        </li>
      );
    });
  }

  render() {
    const { recipeList } = this.state;
    if (!recipeList) {
      return <Spinner />;
    }
    const recipies = this.renderItems(recipeList);;
    return (
      <ul className="item-list list-group">
        {recipies}
      </ul>
    );
  }
}