import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import * as actiontype from './action-type';
import Immutable from 'immutable';

let defaultState = {
  /**
   * 通道数据
   * @type {Array}
   * example: [{
   *    channelCode: "abc", 发送通道编码
   *    reChannelCode:"cba", 返送通道编码
   *    asyncFlag: "async", 异步标识
   *    sourceSys:"ERP01", 来源系统
   *    targetSys: "SSC", 目标系统
   *    param: "", 参数
   *    portStyle:"",
   *    syncMethod:"", 同步方法
   *    syncAddress:"", 同步地址
   *
   * }]
   */
  dataList: [],
  showModal: false, //默认对话框不显示
  addOrUpdateModal: false //true为新增，false为更新
}

export const erpData = (state = defaultState, action) => {
  let imuDataList;
  let imuItem;
  switch(action.type){
    case actiontype.GET:
      return {...state, ...action}

    case `${actiontype.SAVE}_${PENDING}`:
      return {...state, ...action}
    case `${actiontype.SAVE}_${FULFILLED}`:
      return {...state, ...action}
    case `${actiontype.SAVE}_${REJECTED}`:
      return {...state, ...action}

    case actiontype.UPDATE:
      return {...state, ...action}
    case actiontype.DELETE:
      return {...state, ...action}

    case actiontype.OPENMODAL:
      return {...state, showModal:true, ...action}
    default:
      return state;
  }
}
