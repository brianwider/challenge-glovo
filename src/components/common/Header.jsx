import React, { Component } from "react";

class HeaderAppBar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="header-container">
                <div className="header">
                    <div className="nav-bounds col-lg-10 col-md-10 col-xs-12 col-sm-12">
                        <a className="nav-logo col-1" href="/" tabIndex={1} />
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderAppBar;
