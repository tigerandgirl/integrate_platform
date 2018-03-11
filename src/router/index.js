import React, { Component } from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';

import $ from 'jquery';
import App from '@/containers/App';
import Bundle from '@/bundle.js';

import ChannelContainer from "bundle-loader?lazy&name=app-[name]!@/containers/channel_manage/Channel";
import AgencyContainer  from 'bundle-loader?lazy&name=app-[name]!@/containers/agency/Admin';
const Channel = (props) => (<Bundle load={ChannelContainer}  {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Agency  = (props) => (<Bundle load={AgencyContainer}   {...props}>{ (Page) => <Page {...props} />}</Bundle>)

export default class RouteConfig extends Component{
  render(){
    return(
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/channel"  component={Channel} />
          <Route path="agency" component={Agency} />
        </Route>
      </Router>
    )
  }
}
