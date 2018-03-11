import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import {Provider} from 'react-redux';
import store from '@/store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './less/react-bootstrap-table-all.min.css'
import 'react-datepicker/dist/react-datepicker.min.css';
import 'rc-checkbox/assets/index.css';
import 'rc-tree/assets/index.css';
import './less/refer/referStyle.css';
import './less/ybz-index.less';

const render = Component => {
  ReactDOM.render(
    //绑定redux
    <Provider store={store}>
        <Component />
    </Provider>,
    document.getElementById('root'),
  )
}

render(Route);

