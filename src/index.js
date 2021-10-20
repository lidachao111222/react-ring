import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements as defineNftRing } from './ring';
import { ChainId, DAppProvider } from '@usedapp/core';

const config = {
    readOnlyChainId: ChainId.Rinkeby,
    readOnlyUrls: {
        [ChainId.Rinkeby]: 'https://kovan.infura.io/v3/0d5c59884b174b8e878c0789b6daf2d1',
    },
}


ReactDOM.render(
    <React.StrictMode >
        <DAppProvider config={config}>
            <App />
        </DAppProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

defineNftRing();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();