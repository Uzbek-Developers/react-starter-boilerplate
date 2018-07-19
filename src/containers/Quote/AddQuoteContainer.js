import React, {Component} from "react"
import {connect} from "react-redux";
import {initAction} from "../../redux/actions/appActions";

@connect(({app, storage})=>({app, storage}), {
    initAction
})
export default class AddQuuoteController extends Component {
    componentWillMount(){
        this.props.initAction();
    }
    render() {
        return (
            <div className="main-wrapper">
                Add item
            </div>
        )
    }
}