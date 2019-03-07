import {appStyles, drawerWidth, theme} from './helpers/styles/styles';
import React from 'react';
import * as PropTypes from 'prop-types';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './components/Navigator/Navigator';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import LoginDialog from './components/LoginDialog/LoginDialog';
import {SnackbarProvider, withSnackbar} from 'notistack';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser, toggleSidebar} from './redux/actions/login-actions';

function App({classes, loggedIn, mobileOpen}) {
  // const accessToken = user ? user.accessToken : undefined;

  const updateUserData = userData => {
    this.props.loginUser(userData);
  };

  console.log(loggedIn);
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

const mapStateToProps = (state /*, ownProps*/) => {
  console.log(state);
  return {
    user: state.user,
    loggedIn: state.loggedIn,
    mobileOpen: state.mobileOpen
  };
};

const mapDispatchToProps = {toggleSidebar, loginUser};

export default withStyles(appStyles)(
  withSnackbar(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  )
);
