import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";
import globalState from "./globalState";

globalState();
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/rooms/:roomID">
          <Room />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
