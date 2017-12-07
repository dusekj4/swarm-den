import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import {history} from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import Service from "./components/Service";
import Logs from "./components/Logs";
import Nodes from "./components/Nodes";
import NotFound from "./components/NotFound";

const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="inspect/:service" component={Service}/>
      <Route path="logs/:service" component={Logs}/>
      <Route path="nodes" component={Nodes}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

export {router};
