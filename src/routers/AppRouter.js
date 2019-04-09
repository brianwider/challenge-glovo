import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ResultsPage from "../components/pages/ResultsPage.jsx";
import DetailsPage from "../components/pages/DetailsPage.jsx";
import Header from "../components/common/Header.jsx";
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ResultsPage} exact={true} />
                <Route path="/category/:category" component={DetailsPage} />
            </Switch>
        </div>
    </BrowserRouter>
);
export default AppRouter;
