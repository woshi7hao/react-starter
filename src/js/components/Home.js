import React, { Component } from 'react';
import 'Style/common.css';

class Home extends Component {

  constructor(props) {
    super(props);
    console.log("---------------我是Home，我在构造-----------");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("should Home update?");
    return true;
  }

  componentWillReceiveProps(nextProps) {
    console.log('---------------Home WillReceiveProps--------------');
  }

  componentWillMount() {
    console.log('Home WillMount！');
  }

  componentDidMount() {
    console.log('----------------Home DidMount！---------------');
  }

  componentWillUpdate() {
    console.log('Home WillUpdate');
  }

  componentDidUpdate() {
    console.log('------------------Home DidUpdate！------------------');
  }

  componentWillUnmount() {
    console.log('---------------Home WillUnMount！------------');
  }

  render() {
    console.log('Home render!');
    return (
      <div className="Home">
      <h1>Home</h1>
        {this.props.children}
      </div>
      );
  }
}

export default Home;