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
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import {navigatorStyles} from '../../helpers/styles/styles';

const categories = [
  {
    id: 'Develop',
    children: [
      {id: 'Authentication', icon: <PeopleIcon />, active: true},
      {id: 'Database', icon: <DnsRoundedIcon />},
      {id: 'Storage', icon: <PermMediaOutlinedIcon />},
      {id: 'Hosting', icon: <PublicIcon />},
      {id: 'Functions', icon: <SettingsEthernetIcon />},
      {id: 'ML Kit', icon: <SettingsInputComponentIcon />}
    ]
  },
  {
    id: 'Quality',
    children: [{id: 'Analytics', icon: <SettingsIcon />}, {id: 'Performance', icon: <TimerIcon />}, {id: 'Test Lab', icon: <PhonelinkSetupIcon />}]
  }
];

const Navigator = props => {
  const {classes, ...other} = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>Paperbase</ListItem>
        <ListItem className={classNames(classes.item, classes.itemCategory)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary
            }}>
            Project Overview
          </ListItemText>
        </ListItem>
        {categories.map(({id, children}) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary
                }}>
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({id: childId, icon, active}) => (
              <ListItem button dense key={childId} className={classNames(classes.item, classes.itemActionable, active && classes.itemActiveItem)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                    textDense: classes.textDense
                  }}>
                  {childId}
                </ListItemText>
              </ListItem>
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
