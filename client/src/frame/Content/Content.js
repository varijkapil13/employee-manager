import React from 'react';
import Paper from '@material-ui/core/Paper';
import Users from '../../application/Users/Users';
import {Route, Switch} from 'react-router-dom';
import Holidays from '../../application/Holidays/Holidays';
import Leaves from '../../application/Leaves/Leaves';

const Content = () => {
  // const {classes} = props;

  return (
    <Paper>
      <Switch>
        <Route exact path={'/'} component={Users} />
        <Route exact path={'/holidays'} component={Holidays} />
        <Route exact path={'/leaves'} component={Leaves} />
        <Route path={'/users'} component={Users} />
      </Switch>
    </Paper>
  );
};

export default Content;
