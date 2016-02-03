import React, { PropTypes, Component } from 'react';
import Son from './Son';

class Mom extends Component {

  static defaultProps = {
    name: 'Mom'
  };

  static propTypes = {
    name: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      happy: true
    };

    console.log("----------我是Mom，我在构造-------");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("should mom update?");
    return true;
  }

  componentWillReceiveProps(nextProps) {
    console.log('Mom WillReceiveProps');
  }

  componentWillMount() {
    console.log('Mom WillMount！');
  }

  componentDidMount() {
    console.log('---------Mom DidMount！-----------');
  }

  componentWillUpdate() {
    console.log('Mom WillUpdate');
  }

  componentDidUpdate() {
    console.log('-----------Mom DidUpdate！---------');
  }

  componentWillUnmount() {
    console.log('Mom WillUnMount！');
  }

  render() {
    console.log('Mom render!');
    return (
      <div className="Mom">
      <div>I am Mom {this.props.name} and I am {this.state.happy ? '开心':'伤心'}</div>
      <div className="button" onClick={(e) => {e.preventDefault(); this.setState({happy: !this.state.happy});}}>Change</div>
      <div>I have a son:</div>
      <Son/>
      </div>
    );
  }
}

module.exports = Mom;

