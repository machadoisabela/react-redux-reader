import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto'
import { createStore } from 'redux';
import reducer from './reducers'
import { Provider } from 'react-redux'

const store = createStore(
    reducer,
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter><App /></BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
