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
      .then((recipes) => {
        this.setState({
          recipeList: recipes
        });
      })
      .catch(this.onError)
  }

  renderItems(itemsArr) {
    return itemsArr.map(({ id, title, calories }) => {
      return(
        <li key={`${id}-${calories}`}
        className="list-group-item"
        onClick={() => this.props.onItemSelected(id)}>
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