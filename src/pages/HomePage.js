import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Danang from "./Danang";
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import March from "../colours/March";
import April from "../colours/April";
import May from "../colours/May";
import June from "../colours/June";
import July from "../colours/July";
import August from "../colours/August";
import Details from "../detail/Details";
import Browsers from "../insights/Browsers";
import Pagenames from "../insights/Pagenames";
import Countrys from "../insights/Countrys";
import Devices from "../insights/Devices";
import Durations from "../insights/Durations";
import Languages from "../insights/Languages";
import Pages from "../insights/Pages";
import Systems from "../insights/Systems";
import Sizes from "../insights/Sizes";
import Views from "../insights/Views";
import CustomReport from "../detail/CustomReport";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>

    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.March.path} component={March} />
    <RouteWithSidebar exact path={Routes.April.path} component={April} />
    <RouteWithSidebar exact path={Routes.May.path} component={May} />
    <RouteWithSidebar exact path={Routes.June.path} component={June} />
    <RouteWithSidebar exact path={Routes.July.path} component={July} />
    <RouteWithSidebar exact path={Routes.August.path} component={August} />
    <RouteWithSidebar exact path={Routes.Details.path} component={Details} />
    <RouteWithSidebar exact path={Routes.Browsers.path} component={Browsers} />
    <RouteWithSidebar exact path={Routes.Pagenames.path} component={Pagenames} />
    <RouteWithSidebar exact path={Routes.Countrys.path} component={Countrys} />
    <RouteWithSidebar exact path={Routes.Devices.path} component={Devices} />
    <RouteWithSidebar exact path={Routes.Durations.path} component={Durations} />
    <RouteWithSidebar exact path={Routes.Languages.path} component={Languages} />
    <RouteWithSidebar exact path={Routes.Pages.path} component={Pages} />
    <RouteWithSidebar exact path={Routes.Systems.path} component={Systems} />
    <RouteWithSidebar exact path={Routes.Sizes.path} component={Sizes} />
    <RouteWithSidebar exact path={Routes.Views.path} component={Views} />
    <RouteWithSidebar exact path={Routes.CustomReport.path} component={CustomReport} />


    <RouteWithSidebar exact path={Routes.Danang.path} component={Danang} />
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
