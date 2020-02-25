import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Customer from "./components/Customer";
import Sale from "./components/Sale";
import Product from "./components/Product";
import Store from "./components/Store";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation></Navigation>
        </div>
        <Switch>
          <Route path="/" component={Customer} exact></Route>
          <Route path="/sale" component={Sale}></Route>

          <Route path="/product" component={Product}></Route>
          <Route path="/store" component={Store}></Route>
          {/* <Route component={Error}></Route> */}
        </Switch>
      </BrowserRouter>
    );
  }
}
