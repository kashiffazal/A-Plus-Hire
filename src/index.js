import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import './css/index.css';
import './css/antd-custom.css';
import App from './component/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const primaryColor = '#cc0033';
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        // algorithm: theme.darkAlgorithm,
        // algorithm: theme.compactAlgorithm,
        token: {
          colorPrimary: primaryColor,
          colorPrimaryHover: '#ad4b63',
          colorPrimaryTransparent: primaryColor + '9e',
          colorSecondary: '#06b0d8',
          accentColor1: '#ff3a6b',
          accentColor1Hover: '#ad4b63',
          bgPrimary: '#fff3f6',
          bgColor: '#f0f1f5',
          bgAccent: '#ffdce5',
          borderPrimary: '#cc0033',
          borderColor: '#d1d6e0',
          borderRadius: '4px',
          //@The height of the basic controls such as buttons and input boxes in Ant Design	
          controlHeight: 35,
          controlHeightLG: 43.75,
          controlHeightSM: 26.25,
          controlHeightXS: 17.5
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
