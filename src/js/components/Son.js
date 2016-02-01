import React, { Component } from 'react';

class Son extends Component {

    constructor(props) {
      super(props);
      this.state = {
        name: '小明'
      };
      console.log("我是儿子，我在构造");
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log(nextProps);
      console.log(nextState);
      return true;
    }

    componentWillReceiveProps(nextProps) {
      console.log(this.props);
      console.log(nextProps);
      console.log('Dad WillReceiveProps');
    }

    componentWillMount() {
      console.log('Dad WillMount！');
    }

    componentDidMount() {
      console.log('Dad DidMount！');
    }

    componentWillUpdate() {
      console.log('Dad WillUpdate');
    }

    componentDidUpdate() {
      console.log('Dad DidMount！');
    }

    componentWillUnmount() {
      console.log('Dad WillUnMount！');
    }

    render() {
      return (
        <div className="Son">
          <div>I am Son {this.state.name}</div>
        </div>
      );
    }
}

module.exports = Son;

