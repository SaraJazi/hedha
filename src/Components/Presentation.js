import React, { Component } from "react";
import { Link } from "react-router-dom";
class Presentation extends Component {
    render() {
        return (
            <div>
                <div style={{width:"70%"}}>
                <p style={{marginTop:"30px", textAlign: "justify"}}>{this.props.desc}</p></div>
                <Link to={this.props.actionPage}>
                    <button className="btn btn-info">
                        {this.props.action}
                    </button>
                </Link>
            </div>
        );
    }
}

export default Presentation;