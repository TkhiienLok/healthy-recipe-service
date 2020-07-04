import React, { Component } from 'react';

import './recipe-search.css';

export default class RecipeSearch extends Component {
  state = {
    term: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.term);
    this.setState({
      term: ''
    });
  };

  handleSearchChange = (e) => {
    this.setState({ term: e.target.value });
 }

  render() {
    return (
      <form className="item-add-form d-flex"
            onSubmit={this.onSubmit}>
        <input type="text"
                className="form-control"
                placeholder="What has to be done?"
                value={this.state.term}
                onChange={this.handleSearchChange}/>
        <button
          className="btn btn-outline-secondary add-item-button"
          type="submit"
          onClick={this.onSubmit}>
            Search
        </button>
      </form>
    );
  }
}
