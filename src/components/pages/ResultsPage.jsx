import React, { Component } from "react";
import Category from "../common/Category.jsx";
import Loader from "../common/Loader.jsx";

class ResultsPage extends Component {
    state = {
        data: {
            categories: []
        },
        error: false,
        loading: true
    };

    componentDidMount() {
        fetch("/categories")
            .then(res => res.json())
            .then(response => {
                this.setState({ data: response });
                this.setState({ loading: false });
            })
            .catch(function(err) {
                this.setState({ error: true });
                console.error(err);
            });
    }

    showContent() {
        const { length: count } = this.state.data.categories;
        if (this.state.loading) {
            return <Loader />;
        }
        if (this.state.error) {
            return <p>Realice una búsqueda por favor.</p>;
        }
        if (count === 0 && !this.state.loading) {
            return (
                <p>
                    No se encontraron resultados, por favor intente nuevamente.
                </p>
            );
        }
        return this.state.data.categories.map(item => (
            <Category key={item.id} item={item} />
        ));
    }

    render() {
        return (
            <div>
                <div id="resultsPage">
                    <div className="col-lg-10 col-md-10 col-xs-12 col-sm-12 results-container">
                        <h1>Categorías</h1>
                        {this.showContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultsPage;
