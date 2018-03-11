import React, { Component } from 'react';
import {Router, Route, Link, IndexRoute, IndexRedirect, hashHistory} from 'react-router';

import $ from 'jquery';
import App from '@/containers/App';
import Bundle from '@/bundle.js';

import LoginContainer from "bundle-loader?lazy&name=app-[name]!@/containers/login";
import ChannelContainer from "bundle-loader?lazy&name=app-[name]!@/containers/channel_manage/Channel";
import AgencyContainer  from 'bundle-loader?lazy&name=app-[name]!@/containers/agency/Admin';

const Login = (props) => (<Bundle load={LoginContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Channel = (props) => (<Bundle load={ChannelContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Agency  = (props) => (<Bundle load={AgencyContainer}   {...props}>{ (Page) => <Page {...props} />}</Bundle>)

export default class RouteConfig extends Component{
  render(){
    return(
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to={"login"} />
          <Route path="/login" component={Login} />
          <Route path="/channel"  component={Channel} />
          <Route path="agency" component={Agency} />
        </Route>
      </Router>
    )
  }
}
