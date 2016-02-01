import React from 'react';
import { render } from 'react-dom';
import Index from './components/Index';
import Home from './components/Home';
import Dad from './components/Dad';
import Mom from './components/Mom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const Family = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={ Home }>
        <IndexRoute component={ Index } />
        <Route path="dad" component={ Dad } />
        <Route path="mom" component={ Mom } />
      </Route>
    </Router>
  );
};

render(<Family />, document.getElementById('lu-root'));