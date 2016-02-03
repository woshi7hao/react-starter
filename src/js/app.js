import React from 'react';
import { render } from 'react-dom';
import Index from './components/Index';
import Home from './components/Home';
import Dad from './components/Dad';
import Mom from './components/Mom';
import Son from './components/Son';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

const Family = () => {
  window.onbeforeunload = function() {
    return "beforeunload:确定要走？";
  };
  return (
    <Router history={browserHistory}>
      <Route path="/" component={ Home }>
        <IndexRoute component={ Index } />
        <Route path="dad" component={ Dad } />
        <Route path="mom" component={ Mom } />
        <Route path="son" component={ Son } />
      </Route>
    </Router>
  );
};

render(<Family />, document.getElementById('lu-root'));