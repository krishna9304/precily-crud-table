import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Table from "./pages/table";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Home />;
          }}
        />
      </Switch>
      <Switch>
        <Route
          path="/table/:id"
          render={() => {
            return <Table />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
