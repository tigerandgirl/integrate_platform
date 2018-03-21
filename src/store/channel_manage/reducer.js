import * as cha from './action-type';
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
  saveStatus: false
}

export const channelData = (state = defaultState, action) => {
  let imuDataList;
  let imuItem;
  switch(action.type){
    case cha.GETCHANNEL:
      return {...state, ...action}
    case cha.SAVECHANNEL:
      return {...state, ...action}
    case cha.DELETECHANNEL:
      return {...state, ...action}
    default:
      return state;
  }
}
