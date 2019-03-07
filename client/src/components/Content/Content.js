import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {contentStyles} from '../../helpers/styles/styles';
import Users from '../Users/Users';
import {Switch, Route} from 'react-router-dom';

const Content = props => {
  const {classes} = props;

  return (
    <Paper className={classes.paper}>
      <Switch>
        <Route exact path={'/'} component={Users} />
        <Route path={'/users'} component={Users} />
      </Switch>
    </Paper>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(contentStyles)(Content);
