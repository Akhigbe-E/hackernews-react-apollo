import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import { LinkList } from "./components/LinkList";
import Login from "./components/Login";
import CreateLink from "./components/CreateLink";
import Search from "./components/Search";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/new/1" />} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/top" component={LinkList} />
          <Route exact path="/new/:page" component={LinkList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
