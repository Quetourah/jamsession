import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./containers/Login";
import Home from "./containers/Home";
import Signup from "./containers/Signup";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </Switch>
  );
}