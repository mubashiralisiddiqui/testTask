import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from "./context/Auth"
import { TaskProvider } from './context/Task'
import { LocationProvider } from './context/Location'


ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}></ThemeProvider> */}
    <AuthProvider>
      <LocationProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </LocationProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
