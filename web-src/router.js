import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import {history} from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import Service from "./components/Service";
import Nodes from "./components/Nodes";
import NotFound from "./components/NotFound";

const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="inspect/:service" component={Service}/>
      <Route path="nodes" component={Nodes}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

export {router};
