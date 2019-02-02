import {appStyles, drawerWidth, theme} from './helpers/styles/styles';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './components/Navigator/Navigator';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import LoginDialog from './components/LoginDialog/LoginDialog';
import {SnackbarProvider, withSnackbar} from 'notistack';

function App(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userData, setUserData] = useState(undefined);
  const {classes} = props;

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <div className={classes.root}>
          <CssBaseline />
          {/*show login screen when the user is not logged in*/}
          {userData || <LoginDialog />}
          {/*When the user has been logged in show the app*/}
          {userData && (
            <>
              <nav className={classes.drawer}>
                <Hidden smUp implementation="js">
                  <Navigator
                    PaperProps={{style: {width: drawerWidth}}}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(!mobileOpen)}
                  />
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Navigator PaperProps={{style: {width: drawerWidth}}} />
                </Hidden>
              </nav>
              <div className={classes.appContent}>
                <Header onDrawerToggle={() => setMobileOpen(!mobileOpen)} />
                <main className={classes.mainContent}>
                  <Content />
                </main>
              </div>
            </>
          )}
        </div>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(appStyles)(withSnackbar(App));
