import React, { Component } from "react";

import { isOpen } from "../../services/dateService";
import Store from "../common/Store.jsx";
import Loader from "../common/Loader.jsx";

class DetailsPage extends Component {
    state = {
        data: {
            stores: []
        },
        tags: [],
        error: false,
        loading: true
    };

    componentDidMount() {
        if (this.props.match.params.category) {
            // Call our fetch function below once the component mounts
            fetch("/stores?category=" + this.props.match.params.category)
                .then(res => res.json())
                .then(response => {
                    this.setState({ data: response });
                    this.getTagsList();
                    this.setState({ loading: false });
                })
                .catch(function(err) {
                    this.setState({ error: true });
                    console.error(err);
                });
        } else {
            this.setState({ error: true });
            this.setState({ loading: false });
        }
    }

    // Get the tags from all the results and remove duplicates
    getTagsList() {
        let tagsList = [];
        this.state.data.stores.map(store => {
            store.tags.map(tag => {
                if (!tagsList.some(obj => obj.label === tag))
                    tagsList.push({ label: tag, selected: false });
            });
        });
        this.setState({ tags: tagsList });
    }

    handleFilterClick(index) {
        const tags = [...this.state.tags];
        tags[index].selected = !tags[index].selected;
        this.setState({ tags });
    }

    // Get filtered data, filtered by the tags, if none tags are selected, return original array
    getFilteredData() {
        const tags = [...this.state.tags];
        let { stores: oldStores } = this.state.data;
        let newStores = [];
        tags.map(tag => {
            if (tag.selected) {
                newStores = [
                    ...new Set([
                        ...newStores,
                        ...oldStores.filter(store =>
                            store.tags.includes(tag.label)
                        )
                    ])
                ];
            }
        });

        if (newStores.length < 1) {
            newStores = oldStores;
        }

        return this.sortArrayByOpen(newStores);
    }

    sortArrayByOpen(stores) {
        stores.map((store, index) => {
            if (!isOpen(store.schedule)) {
                stores.push(stores.splice(index, 1)[0]);
            }
        });
        return stores;
    }

    // Render results
    showContent() {
        const filteredData = this.sortArrayByOpen(this.getFilteredData());
        const { length: count } = filteredData;
        if (this.state.loading) {
            return <Loader />;
        }
        if (count === 0 && !this.state.loading) {
            return (
                <p>
                    No se encontraron resultados, por favor intente nuevamente
                    más tarde.
                </p>
            );
        }
        return filteredData.map(item => <Store key={item.id} item={item} />);
    }

    // Render filter section
    tagsFilter() {
        return (
            <div className="col-lg-10 col-md-10 col-xs-12 col-sm-12 filter-container">
                <h3>Filtrar por tags:</h3>
                {this.state.tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`tag-block ${tag.selected ? "active" : ""}`}
                        onClick={() => this.handleFilterClick(index)}
                    >
                        {tag.label}
                    </span>
                ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                <div id="detailsPage">
                    {this.tagsFilter()}
                    <div className="col-lg-10 col-md-10 col-xs-12 col-sm-12 details-container">
                        {this.showContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsPage;
