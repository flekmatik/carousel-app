import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { Provider } from 'react-redux'
import { store } from './store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
