import * as actiontype from './action-type';
import ErpSystemManageApi from '@/api/ErpSystemManageApi';

// 初始化获取ERP，保存至redux
export const getData = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try{
      let result = await ErpSystemManageApi.queryAll();
      result.map(item => {
        item.selectStatus = false;
        item.selectNum = 0;
        return item;
      })
      dispatch({
        type: actiontype.GET,
        dataList: result,
      })
    }catch(err){
      console.error(err);
    }
  }
}


export const saveData = (params) => dispatch => {
  try{
    dispatch({
      type: actiontype.SAVE,
      payload: ErpSystemManageApi.saveData(params)
    })
  }catch(err){
    console.log(err);
  }
}


export const updateData = (params,key) =>{
  return async dispatch => {
    try{
      let result = await ErpSystemManageApi.updateData(params,key);
      dispatch({
        type: actiontype.UPDATE,
        saveStatus:result.success
      })
    }catch(err){
      console.error(err);
    }
  }
}

export const deleteData = (params) =>{
  return async dispatch => {
    try{
      let result = await ErpSystemManageApi.deleteData(params);
      dispatch({
        type: actiontype.DELETE,
        saveStatus:result.success
      })
    }catch(err){
      console.error(err);
    }
  }
}

export const openModal = (data) =>{
  return {
    type: actiontype.OPENMODAL,
    data
  };
}
