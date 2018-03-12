import React, { Component } from 'react';
import {Router, Route, Link, IndexRoute, IndexRedirect, hashHistory, useRouterHistory} from 'react-router';
import { createHistory, createHashHistory } from 'history'

import $ from 'jquery';
import App from '@/containers/App';
import Bundle from '@/bundle.js';

import LoginContainer from "bundle-loader?lazy&name=app-[name]!@/containers/login";
import HomeContainer from "bundle-loader?lazy&name=app-[name]!@/containers/home/HomeContainer";
import BasicSystem from 'bundle-loader?lazy&name=app-[name]!@/containers/home/BasicSystem.jsx'
import BasicService from 'bundle-loader?lazy&name=app-[name]!@/containers/home/BasicService.jsx'
import ChannelContainer from "bundle-loader?lazy&name=app-[name]!@/containers/channel_manage/Channel";

const Login = (props) => (<Bundle load={LoginContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Home = (props) => (<Bundle load={HomeContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const BasicSystemComp = (props) => (<Bundle load={BasicSystem}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const BasicServiceComp = (props) => (<Bundle load={BasicService}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)

const Channel = (props) => (<Bundle load={ChannelContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)

let history = useRouterHistory(createHashHistory)()

export default class RouteConfig extends Component{
  render(){
    return(
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRedirect to={"login"} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home}>
            <IndexRedirect to={"basic"} />
            <Route path="basic" >
              <IndexRedirect to={"system"} />
              <Route path="system" component={BasicSystemComp} />
              <Route path="service" component={BasicServiceComp} />
            </Route>

          </Route>
          <Route path="/channel"  component={Channel} />
        </Route>
      </Router>
    )
  }
}
