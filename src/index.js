import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import {Provider} from 'react-redux';
import store from '@/store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/less/react-bootstrap-table-all.min.css'
import 'react-datepicker/dist/react-datepicker.min.css';
import 'rc-checkbox/assets/index.css';
import 'rc-tree/assets/index.css';
import '@/less/refer/referStyle.css';
import 'react-select/dist/react-select.css';

// //import gentelella start
// import 'gentelella/vendors/font-awesome/css/font-awesome.min.css';
// import 'gentelella/vendors/iCheck/skins/flat/green.css';
// import 'gentelella/vendors/select2/dist/css/select2.min.css';
// import 'gentelella/vendors/switchery/dist/switchery.min.css';
// import 'gentelella/vendors/datatables.net-bs/css/dataTables.bootstrap.min.css';
// import 'gentelella/vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css';
// import 'gentelella/vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css';
// import 'gentelella/vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css';
// import 'gentelella/vendors/pnotify/dist/pnotify.css';
// import 'gentelella/vendors/pnotify/dist/pnotify.buttons.css';
// import 'gentelella/vendors/pnotify/dist/pnotify.nonblock.css';
// //import gentelella end


import '@/less/index.less';

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
