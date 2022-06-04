import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import './polyfill'
import { MoralisDappProvider } from "./components/MoralisDappProvider/MoralisDappProvider";

const appID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <MoralisProvider serverUrl="https://btbpgajnttxt.usemoralis.com:2053/server" appId="cg083RyJzWvVbLtyQ7WxQpfAyIICON4AN8MGSxqe">
          <MoralisDappProvider>
            <App />
          </MoralisDappProvider>
        </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
