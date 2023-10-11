import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';
import {Provider} from 'react-redux'
import {store} from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThirdwebProvider activeChain={ChainId.Goerli} clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}> 
    <Provider store={store}>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </Provider>
  </ThirdwebProvider> 
)