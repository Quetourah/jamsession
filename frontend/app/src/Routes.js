import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "./components/AsyncComponent";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

const AsyncHome = asyncComponent(() => import("./containers/Home"));
const AsyncLogin = asyncComponent(() => import("./containers/Login"));
const AsyncSignup = asyncComponent(() => import("./containers/Signup"));
const AsyncProfile = asyncComponent(() => import("./containers/Profile"));
const AsyncCoder = asyncComponent(() => import("./containers/Coder"));
const AsyncNotFound = asyncComponent(() => import("./containers/NotFound"));

export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute
      path="/"
      exact
      component={AsyncHome}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={AsyncLogin}
      props={childProps}
    />
    
     <AuthenticatedRoute
      path="/profile/:username"
      exact
      component={AsyncProfile}
      props={childProps}
    />

    <AuthenticatedRoute
      path="/coder/:songname"
      exact
      component={AsyncCoder}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={AsyncSignup}
      props={childProps}
    />
    
    {/* Finally, catch all unmatched routes */}
    <Route component={AsyncNotFound} />
  </Switch>
;

