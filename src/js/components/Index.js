import React, {PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Index extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
      super(props);
      console.log("--------我是Index，我在构造---------");

      this.routerWillLeave = this.routerWillLeave.bind(this);
      this.findMom = this.findMom.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("should index update?");
    return true;
  }

  componentWillReceiveProps(nextProps) {
    console.log('Index WillReceiveProps');
  }

  componentWillMount() {
    console.log('Index WillMount！');
  }

  componentDidMount() {
    console.log('---------Index DidMount！---------');
    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  routerWillLeave() {
    return window.confirm("react-router:确定要离开这个页面？");
  }

  componentWillUpdate() {
    console.log('Index WillUpdate');
  }

  componentDidUpdate() {
    console.log('Index DidUpdate！');
  }

  componentWillUnmount() {
    console.log('----------------Index WillUnMount！-----------');
    return window.confirm("unmount:确定离开？");
  }

  findMom() {
    this.context.router.push('/mom');
  }

  render() {
    console.log('Index render!');
    return (
      <div className="Index">
        <ul>
          <li><Link to='dad'>Dad</Link></li>
          <li><div className="button" onClick={this.findMom}>Mom</div></li>
          <li><Link to='son'>Son</Link></li>
        </ul>
      </div>
    );
  }

}

export default Index;
