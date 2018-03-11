import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';

import $ from 'jquery';
import Config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './less/react-bootstrap-table-all.min.css'
import 'react-datepicker/dist/react-datepicker.min.css';
import 'rc-checkbox/assets/index.css'
import 'rc-tree/assets/index.css'
import './less/refer/referStyle.css';
import './less/ybz-index.less';
import GlobalStore from './stores/GlobalStore';
import App from './containers/App';
import Bundle from './bundle.js';

import FlightsContainer                 from 'bundle-loader?lazy&name=app-[name]!./containers/stdreimburse/Flights' ;
import HotelContainer                   from 'bundle-loader?lazy&name=app-[name]!./containers/stdreimburse/Hotel' ;
import ShipContainer                    from 'bundle-loader?lazy&name=app-[name]!./containers/stdreimburse/Ship' ;
import TrainContainer                   from 'bundle-loader?lazy&name=app-[name]!./containers/stdreimburse/Train' ;


const Hotel             = (props) => (<Bundle load={HotelContainer}             {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Flights           = (props) => (<Bundle load={FlightsContainer}           {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Train             = (props) => (<Bundle load={TrainContainer}             {...props}>{ (Page) => <Page {...props} />}</Bundle>)
const Ship              = (props) => (<Bundle load={ShipContainer}              {...props}>{ (Page) => <Page {...props} />}</Bundle>)


const requireAuth = (nextState, replace, next) => {
    //切换路由时初始化环境
    GlobalStore.hideAlert();
    // 本地调试环境不进行auth
    if (process.env.NODE_ENV === 'development' || process.env.PROD_SERVER === "172.20.4.220:8080") {
        next();
        return;
    }
    //验证权限
    $.ajax({
        type: "GET",
        url: Config.base.islogin,
        success: data => {
            if (data.success) {
                next();
            } else {
                window.location = Config.base.index;
            }
        }
    });
}

ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/stdreimburse/flights" component={Flights}/>
            <Route path="/stdreimburse/hotel" component={Hotel}/>
            <Route path="/stdreimburse/ship" component={Ship}/>
            <Route path="/stdreimburse/train" component={Train}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
