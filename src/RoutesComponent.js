import React from "react";
import { Route, Switch } from "react-router-dom"
import HomeContainer from "./containers/HomeContainer"
import AddQuoteContainer from "./containers/Quote/AddQuoteContainer"

const routes = [
    {
        path: "/",
        exact: true,
        component: HomeContainer
    },
    {
        path: "/quote",

        exact: true,
        component: AddQuoteContainer,
    }
];

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);

export default function RoutesComponent()  {
    return (
        <Switch>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
    );
}