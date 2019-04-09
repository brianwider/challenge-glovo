import React, { Component } from "react";
import { isOpen, getNextOpenTime } from "../../services/dateService";

class Store extends Component {
    state = {
        item: this.props.item,
        link: ""
    };

    getTags() {
        return this.state.item.tags.map((tag, index) => (
            <span key={index} className="tag-block">
                {tag}
            </span>
        ));
    }

    getStoreStatus() {
        const { schedule } = this.state.item;
        let text = "",
            textClass = "";
        if (schedule.length > 0) {
            if (isOpen(schedule)) {
                textClass = "open";
                text = "Open right now";
            } else {
                textClass = "next-to-open";
                text = getNextOpenTime(schedule);
            }
        } else {
            text = "Permanently Closed";
            textClass = "closed";
        }

        return (
            <div className={`hours ${textClass}`}>
                <i className={`nav-icon-clock ${textClass}`} />
                <span className="hours-label">{text}</span>
            </div>
        );
    }

    render() {
        return (
            <div className="store-container row">
                <div className="info-container row">
                    <div className="title">{this.state.item.name}</div>
                    <div className="description">
                        {this.state.item.description}
                    </div>
                    <div className="tags">{this.getTags()}</div>
                    {this.getStoreStatus()}
                </div>
            </div>
        );
    }
}

export default Store;
