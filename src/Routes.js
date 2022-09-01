import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateInvoice from "./pages/CreateInvoice";
import Dashboard from "./pages/Dashboard";
import InvoiceListing from "./pages/InvoiceListing";
import Login from "./pages/Login";
import PayAmount from "./pages/PayAmount";
import Remaining from "./pages/Remaining";

const Routes = () => {
  return (
    <Router>
      {/* <ScrollToTop> */}
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={Login} />
        <Route path="/create" exact component={CreateInvoice} />

      </Switch>
      {/* </ScrollToTop> */}
    </Router>
  );
};

export default Routes;
