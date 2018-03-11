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
}

export const channelData = (state = defaultState, action) => {
  let imuDataList;
  let imuItem;
  switch(action.type){
    case cha.GETCHANNEL:
      return {...state, ...action}
    case cha.TOGGLESELECT:
      //避免引用类型数据，使用immutable进行数据转换 
      imuDataList = Immutable.List(state.dataList);
      imuItem = Immutable.Map(state.dataList[action.index]);
      imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'));
      imuDataList = imuDataList.set(action.index, imuItem);
      // redux必须返回一个新的state
      return {...state, ...{dataList: imuDataList.toJS()}};
    case cha.EDITCHANNEL:
      //避免引用类型数据，使用immutable进行数据转换 
      imuDataList = Immutable.List(state.dataList);
      imuItem = Immutable.Map(state.dataList[action.index]);
      imuItem = imuItem.set('selectNum', action.selectNum);
      imuDataList = imuDataList.set(action.index, imuItem);
      // redux必须返回一个新的state
      return {...state, ...{dataList: imuDataList.toJS()}};
    case cha.DELETECHANNEL:
      imuDataList = Immutable.fromJS(state.dataList);
      for (let i = 0; i < state.dataList.length; i++) {
        imuDataList = imuDataList.update(i, item => {
          item = item.set('selectStatus', false);
          item = item.set('selectNum', 0);
          return item
        })
      }
      return {...state, ...{dataList: imuDataList.toJS()}};
    default: 
      return state;
  }
}