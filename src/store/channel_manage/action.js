import * as cha from './action-type';
import ChannelManageApi from '@/api/ChannelManageApi';

// 初始化获取通道数据，保存至redux
export const getChannelData = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try{
      let result = await ChannelManageApi.queryAll();
      result.map(item => {
        item.selectStatus = false;
        item.selectNum = 0;
        return item;
      })
      dispatch({
        type: cha.GETCHANNEL,
        dataList: result,
      })
    }catch(err){
      console.error(err);
    }
  }
}

// 选择通道
export const togSelectChannel = index => {
  return {
    type: cha.TOGGLESELECT,
    index,
  }
}

// 编辑通道
export const editChannel = (index, selectNum) => {
  return {
    type: cha.EDITCHANNEL,
    index,
    selectNum,
  }
}

// 删除通道
export const delChannel = () => {
  return {
    type: cha.DELETECHANNEL,
  }
}



