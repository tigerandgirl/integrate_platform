import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import * as login from './action-type';

let defaultState = {
  /**
   * 用户信息
   * @type {Object}
   * example: {
   *    username: "tiger", 用户名
   *    loginState: false, 用户登录状态
   * }
   */
   username: '',
   loginState: false

}

export const userState = (state = defaultState, action) => {
  switch(action.type){
    case `${login.LOGIN}_${PENDING}`:
      //显示等待图标
      return {...state, ...action}
    case `${login.LOGIN}_${FULFILLED}`:
      //显示登录成功图标
      return {...state,loginState:action.payload.success, ...action}
    case `${login.LOGIN}_${REJECTED}`:
      //显示登录失败图标
      return {...state,loginState:action.payload.success, ...action}
    default:
      return state;
  }
}
