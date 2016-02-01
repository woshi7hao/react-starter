import React, { Component } from 'react';
import Son from './Son';

class Dad extends Component {

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
      console.log('Dad Render');
      return (
        <div className="dad">
        <div>I am Dad {this.props.name} and I am {this.state.status}</div>
        <input type="button" value="Change" onClick={() => this.setState({status: '伤心'})} />
        <div>This is my son:</div>
        <Son />
        </div>
      );
    }
}

module.exports = Dad;

