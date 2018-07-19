import React from "react";
import ReactDom from "react-dom";
import App from "./App"
import {HashRouter as Router, Link} from 'react-router-dom'
import {Provider} from "react-redux";

import configureStore from "./configurePersistStore"
const store = configureStore()

ReactDom.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById("app"))