import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import themeInfoglobo from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeInfoglobo}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
