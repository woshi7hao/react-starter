import React, { Component } from 'react';
import 'Style/common.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        {this.props.children}
      </div>
      );
  }
}

export default Home;