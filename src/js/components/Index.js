import React, { Component } from 'react';
import { Link } from 'react-router';

class Index extends Component {

  render() {
    return (
      <div className="Index">
        <ul>
          <li><Link to='dad'>Dad</Link></li>
          <li><Link to='mom'>Mom</Link></li>
        </ul>
      </div>
    );
  }

}

export default Index;
