import React, {PropTypes, Component } from 'react';

class Son extends Component {

    static defaultProps = {
      name: 'C'
    };

    static propTypes = {
      name: PropTypes.string
    };


    constructor(props) {
      super(props);
      console.log("---------我是Son，我在构造---------");
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log("should son update?");
      return true;
    }

    componentWillReceiveProps(nextProps) {
      console.log('---Son WillReceiveProps---');
    }

    componentWillMount() {
      console.log('Son WillMount！');
    }

    componentDidMount() {
      console.log('-----------Son DidMount！--------');
    }

    componentWillUpdate() {
      console.log('Son WillUpdate');
    }

    componentDidUpdate() {
      console.log('-----Son DidUpdate！-----');
    }

    componentWillUnmount() {
      console.log('-----Son WillUnMount！------');
    }

    render() {
      console.log('Son render!');
      return (
        <div className="Son">
          <div>I am Son {this.props.name}</div>
        </div>
      );
    }
}

module.exports = Son;

