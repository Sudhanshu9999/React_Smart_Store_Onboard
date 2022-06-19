import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import $ from "jquery";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const render = Component => {
  return ReactDOM.render(
    <Router>
      <Component />
    </Router>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}

/* ReactDOM.render(
<Router>
<App />
</Router>, document.getElementById('root')); */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
