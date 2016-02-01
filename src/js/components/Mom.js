import React, { Component } from 'react';
import Son from './Son';

class Mom extends Component {

    constructor(props) {
      super(props);
      this.state = {
        status: '开心'
      };

      console.log("我是爸爸，我在构造");
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log(nextProps);
      console.log(nextState);
      return true;
    }

    componentWillReceiveProps(nextProps) {
      console.log(this.props);
      console.log(nextProps);
      console.log('Mom WillReceiveProps');
    }

    componentWillMount() {
      console.log('Mom WillMount！');
    }

    componentDidMount() {
      console.log('Mom DidMount！');
    }

    componentWillUpdate() {
      console.log('Mom WillUpdate');
    }

    componentDidUpdate() {
      console.log('Mom DidMount！');
    }

    componentWillUnmount() {
      console.log('Mom WillUnMount！');
    }

    render() {
      console.log('Mom Render');
      return (
        <div className="Mom">
        <div>I am Mom {this.props.name} and I am {this.state.status}</div>
        <input type="button" value="Change" onClick={() => this.setState({status: '伤心'})} />
        <div>This is my son:</div>
        <Son />
        </div>
      );
    }
}

module.exports = Mom;

