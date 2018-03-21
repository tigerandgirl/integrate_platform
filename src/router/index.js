import React, { Component } from 'react';
import {Router, Route, Link, IndexRoute, IndexRedirect, hashHistory, useRouterHistory} from 'react-router';
import { createHistory, createHashHistory } from 'history'

import $ from 'jquery';
import App from '@/containers/App';
import Bundle from '@/bundle.js';

import LoginContainer from "bundle-loader?lazy&name=app-[name]!@/containers/login";
import HomeContainer from "bundle-loader?lazy&name=app-[name]!@/containers/home/HomeContainer";
import BasicSystem from 'bundle-loader?lazy&name=app-[name]!@/containers/home/BasicSystem'
import BasicService from 'bundle-loader?lazy&name=app-[name]!@/containers/home/BasicService'
import AdvancedService from 'bundle-loader?lazy&name=app-[name]!@/containers/home/AdvancedService'
import AdvancedSystem from 'bundle-loader?lazy&name=app-[name]!@/containers/home/AdvancedSystem'
import TaskContainer from "bundle-loader?lazy&name=app-[name]!@/containers/home/Task"
import ChannelContainer from "bundle-loader?lazy&name=app-[name]!@/containers/channel_manage/Channel"
import ErpContainer from "bundle-loader?lazy&name=app-[name]!@/containers/erp_system_manage/Erp"

const Login = (props) => (<Bundle load={LoginContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Home = (props) => (<Bundle load={HomeContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const BasicSystemComp = (props) => (<Bundle load={BasicSystem}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const BasicServiceComp = (props) => (<Bundle load={BasicService}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const AdvancedServiceComp = (props) => (<Bundle load={AdvancedService}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const AdvancedSystemComp = (props) => (<Bundle load={AdvancedSystem}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Task = (props) => (<Bundle load={TaskContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Channel = (props) => (<Bundle load={ChannelContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Erp = (props) => (<Bundle load={ErpContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)

let history = useRouterHistory(createHashHistory)()

export default class RouteConfig extends Component{
  render(){
    return(
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRedirect to={"login"} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home}>
            <IndexRedirect to={"channel"} />
            <Route path="basic" >
              <IndexRedirect to={"system"} />
              <Route path="system" component={BasicSystemComp} />
              <Route path="service" component={BasicServiceComp} />
            </Route>
            <Route path="advanced" >
              <IndexRedirect to={"system"} />
              <Route path="system" component={AdvancedSystemComp} />
              <Route path="service" component={AdvancedServiceComp} />
            </Route>
            <Route path="task" component={Task} />
            <Route path="erp"  component={Erp} />
            <Route path="channel"  component={Channel} />
          </Route>

        </Route>
      </Router>
    )
  }
}
