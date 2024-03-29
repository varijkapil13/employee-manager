import {appStyles, drawerWidth, theme} from './helpers/styles/styles';
import React from 'react';
import * as PropTypes from 'prop-types';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './frame/Navigator/Navigator';
import Content from './frame/Content/Content';
import Header from './frame/Header/Header';
import LoginDialog from './application/LoginDialog/LoginDialog';
import {SnackbarProvider} from 'notistack';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser, toggleSidebar} from './redux/actions/login-actions';

function App({classes, loggedIn, mobileOpen}) {
  // const accessToken = user ? user.accessToken : undefined;

  const updateUserData = userData => {
    this.props.loginUser(userData);
  };

  if (!loggedIn) {
    /*show login screen when the user is not logged in*/
    return <LoginDialog callback={updateUserData} />;
  }
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <div className={classes.root}>
            <CssBaseline />

            {/*When the user has been logged in show the app*/}
            <>
              <nav className={classes.drawer}>
                <Hidden smUp implementation="js">
                  <Navigator
                    PaperProps={{style: {width: drawerWidth}}}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => this.props.toggleSidebar(!mobileOpen)}
                  />
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Navigator PaperProps={{style: {width: drawerWidth}}} />
                </Hidden>
              </nav>
              <div className={classes.appContent}>
                <Header onDrawerToggle={() => this.props.toggleSidebar(!mobileOpen)} />
                <main className={classes.mainContent}>
                  <Content />
                </main>
              </div>
            </>
          </div>
        </SnackbarProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.login.user,
    loggedIn: state.login.loggedIn,
    mobileOpen: state.login.mobileOpen
  };
};

const mapDispatchToProps = {toggleSidebar, loginUser};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(appStyles)(App));
