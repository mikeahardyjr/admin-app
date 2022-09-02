import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateInvoice from "./pages/CreateInvoice";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={Login} />
        <Route path="/create" exact component={CreateInvoice} />

      </Switch>
    </Router>
  );
};

export default Routes;
