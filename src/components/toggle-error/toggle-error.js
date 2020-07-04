import React, { Component } from 'react';

import './toggle-error.css';

export default class ToggleError extends Component {

  state = {
    renderError: false
  }

  render() {
    if (this.state.renderError) {
      this.foo.bar = '';
    }

    return (
      <button
        className="error-button btn btn-danger btn-lg"
        onClick={() => this.setState({renderError: true})}>
        Throw Error
      </button>
    )
  }
}