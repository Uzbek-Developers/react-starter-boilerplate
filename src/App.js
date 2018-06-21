import React, { Component } from "react";
import "./scss/app.scss";
import "./users.html";
import RoutesComponent from "./RoutesComponent";

import { Link } from 'react-router-dom' 
export default class App extends Component {
    render() {
        return (
            <div className="main-wrapper">
               <ul>
      <li>
        <Link to="/">Bus</Link>
      </li>
      <li>
        <Link to="/quote">Cart</Link>
      </li>
    </ul>
            <RoutesComponent/>
                My first react starter.
            </div>
        )
    }
}