import React, { PropTypes, Component } from 'react';
import Son from './Son';

class Dad extends Component {

  static defaultProps = {
    name: 'A'
  };

  static propTypes = {
    name: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      happy: true
    };

    console.log("-----------我是Dad，我在构造------");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("-------------should Dad update?-----------");
    return true;
  }

  componentWillReceiveProps(nextProps) {
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
    console.log('-------------Dad DidUpdate！---------');
  }

  componentWillUnmount() {
    console.log('---------Dad WillUnMount！---------');
  }

  render() {
    //this.props.name = "frank";
    console.log('Dad render!');
    return (
      <div className="dad">
      <div>I am Dad {this.props.name} and I am {this.state.happy ? '开心':'伤心'}</div>
      <div className="button" onClick={(e) => {e.preventDefault(); this.setState({happy: !this.state.happy});}}>Change</div>
      <div>I have a son:</div>
      <Son/>
      <div>And another son:</div>
      <Son name="D"/>
      </div>
    );
  }
}

module.exports = Dad;

