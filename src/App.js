import React, {Component} from "react";
import "./scss/app.scss";
import "./users.html";
import RoutesComponent from "./RoutesComponent";
import {initAction} from "./redux/actions/appActions";

import {Link} from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <div className="main-wrapper">
                {this.props.children}
                <ul>
                    <li>
                        <Link to="/">Mana.uz Bosh sahifa</Link>
                    </li>
                    <li>
                        <Link to="/quote">Cart</Link>
                    </li>
                </ul>
                <RoutesComponent/>
                My first react starter for mana.uz.
            </div>
        )
    }
}