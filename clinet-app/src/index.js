import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from "./redux/store";
import 'antd-mobile'
import App from './containers/App';
import './index.css'

ReactDOM.render(
    <Provider store = {store} >
        <App/>
    </Provider>
    , document.getElementById('root'));
