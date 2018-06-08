import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/css/material-dashboard-react.css?v=1.2.0";
import indexRoutes from "routes/index.jsx";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const initialState = { };

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

const hist = createBrowserHistory();

const Root = ({store}) => (
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return (
          <Route path={prop.path} component={prop.component} key={key} />
        );
      })}
    </Switch>
  </Router>
</Provider>
)

ReactDOM.render(
 <Root store={store}/>,
  document.getElementById("root")
);
