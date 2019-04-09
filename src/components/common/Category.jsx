import React, { Component } from "react";
import { isCategoryOpen } from "../../services/dateService";
import Loader from "./Loader.jsx";

class Category extends Component {
    state = {
        item: this.props.item,
        stores: [],
        link: "",
        loading: true
    };

    componentDidMount() {
        this.setState({ link: "/category/" + this.props.item.name });
        fetch(`/stores?category=${this.props.item.name}`)
            .then(res => res.json())
            .then(response => {
                this.setState({ stores: response.stores, loading: false });
            })
            .catch(function(err) {
                console.error(err);
            });
    }

    getCategoryIcon() {
        const { openIcon, sleepIcon } = this.state.item;
        return this.getCategoryStatus() ? openIcon : sleepIcon;
    }

    getCategoryStatus() {
        const { stores } = this.state;
        return stores.length > 0 ? isCategoryOpen(stores) : false;
    }

    renderContent() {
        if (this.state.loading) {
            return <Loader />;
        }
        return (
            <div className="image-container">
                <img className="item-image" src={this.getCategoryIcon()} />
                <div className="title">{this.state.item.label}</div>
            </div>
        );
    }

    render() {
        const isOpen = this.getCategoryStatus();
        const link = isOpen ? this.state.link : "#";
        return (
            <a
                href={link}
                className={`result-item row ${isOpen ? "open" : "closed"}`}
            >
                {this.renderContent()}
            </a>
        );
    }
}

export default Category;
