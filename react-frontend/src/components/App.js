import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";
import PatientListPage from "./patient-list/PatientListPage";
import RecordListPage from "./record-list/RecordListPage";
import NotificatonListPage from "./notification-list/NotificationListPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      {/* <Route component={Header} /> */}
      <Switch>
        <Route exact path="/" component={NotificatonListPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/patient-list" component={PatientListPage} />
        <Route path="/record-list" component={RecordListPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
