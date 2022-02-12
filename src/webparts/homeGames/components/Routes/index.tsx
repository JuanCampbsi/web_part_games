import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

require('../../../../stylelibrary/css/global.css');
import Logon from '../Logon';
import Profile from '../Profile';
import NewGame from '../NewGame';

export function Routes(props: any){
  return (
      <Router>

          <Route path="/" exact component={Logon} />
          <Route path="/profile" component={ () => <Profile siteUrl={props.siteUrl}/> } />
          <Route path="/games/new" component={NewGame} />

      </Router>
  );
};
