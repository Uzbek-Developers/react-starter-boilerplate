import React from "react";
import ReactDom from "react-dom";
import App from "./App"
import { HashRouter as Router, Link } from 'react-router-dom'


ReactDom.render(
    <Router>
        <App />
    </Router>
    , document.getElementById("app"))