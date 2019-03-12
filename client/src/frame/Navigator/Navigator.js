import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import {navigatorStyles} from '../../helpers/styles/styles';
import {Link} from 'react-router-dom';

const categories = [
  {
    id: 'Administration',
    children: [
      {id: 'Home', link: '/', icon: <HomeIcon />, active: true},
      {id: 'Holidays', link: '/holidays', icon: <PeopleIcon />},
      {id: 'Leaves', link: '/leaves', icon: <PeopleIcon />}
    ]
  },
  {
    id: 'Settings',
    children: [
      {id: 'Profile', link: '/profile', icon: <PeopleIcon />},
      {id: 'Users', link: '/users', icon: <PeopleIcon />},
      {id: 'Logout', link: '/logout', icon: <PeopleIcon />}
    ]
  }
];

/**
 *
 * @param url : String - url of the window
 * @param link : String - the link of the item to be checked
 * @returns {boolean} - true/false if the link is active or not
 */
const isLinkActive = (url, link) => {
  const splitUrl = url.split('/');
  link = link.substring(0, 1) === '/' ? link.substring(1, link.length) : link;
  return splitUrl[splitUrl.length - 1] === link;
};

const Navigator = props => {
  const {classes, ...other} = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>Employee Manager</ListItem>
        {categories.map(({id, children}) => (
          <React.Fragment key={id}>
            <ListItem className={classNames(classes.item, classes.itemCategory)}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary
                }}>
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({id: childId, link, icon, active}) => (
              <Link to={link} className={''}>
                <ListItem
                  button
                  dense
                  key={childId}
                  className={classNames(classes.item, classes.itemActionable, isLinkActive(window.location.href, link) && classes.itemActiveItem)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      textDense: classes.textDense
                    }}>
                    {childId}{' '}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(navigatorStyles)(Navigator);
