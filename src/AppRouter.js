import React, { Component } from "react";
import { Link, NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import AddBookPage from "./Views/AddBookPage";
import ConsultBooksPage from "./Views/ConsultBooksPage";
import HomePage from "./Views/HomePage";
import ContactPage from "./Views/ContactPage";
import Header from "./Components/Header";

class AppRouter extends Component {
    state = {};
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Header />
                    <div>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/ConsultBooksPage" exact component={ConsultBooksPage} />
                            <Route path="/AddBookPage" exact component={AddBookPage} />
                            <Route path="/ContactPage" exact component={ContactPage} />
                        </Switch>
                    </div>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default AppRouter;