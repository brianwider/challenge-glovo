import React, { Component } from "react";
import "../../styles/components/_loader.scss";

class Loader extends Component {
    state = {};

    render() {
        return (
            <div className="loading-container">
                <img
                    className="loading-icon"
                    src={require("../../assets/glovo-loading.svg")}
                />
            </div>
        );
    }
}

export default Loader;
