import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import store, { sagaMiddleware } from './client/utils/shared/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import saga from './client/sagas/saga';
import Routes from './client/utils/shared/routes';
import * as serviceWorker from './serviceWorker';

require('./client/styles/app.scss');

let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Lato'].join(','),
    font: {
      color: '#333940',
    },
  },
  root: {
    color: '#333940',
  },
  palette: {
    tertiary: { main: '#004261' },
    primary: { main: '#0097C7' },
    secondary: { main: '#00B4D2' },
    background: { default: '#fcfcfc' },
    error: { main: '#E10C32' },
    success: { main: '#00AB84' },
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        // fill: '#00B4D2',
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: '#004261',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#004261',
        },
      },
      text: {
        color: '#1B6C92',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#ffffff',
        color: '#333940',
      },
    },
    App: {
      content: {
        padding: '0px',
      },
    },
  },
});

theme = responsiveFontSizes(theme);
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
