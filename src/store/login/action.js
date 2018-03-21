import * as login from './action-type';
import LoginApi from '@/api/LoginApi';
/*
 * action 创建函数
 */

 // export function userLogin(state) {
 //     return { type: login.USER_LOGIN, state }
 // }
export function userLogout(state) {
    return { type: login.USER_LOGOUT, state }
}


// 获取用户登录信息，保存至redux
export const userLogin = (params) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try{
      let result = await LoginApi.userLogin(params);
      dispatch({
        type: login.USER_LOGIN,
        username: params.username,
        loginState: result.success
      })
    }catch(err){
      console.error(err);
    }
  }
}

//应用  redux-promise-middleware 形式

// export const userLogin2 = (params) => ({
//   type: login.LOGIN,
//   payload: LoginApi.userLogin(params)
// })

export const userLogin2 = (params) => dispatch => {
  try{
    dispatch({
      type: login.LOGIN,
      payload: LoginApi.userLogin(params)
    })
  }catch(err){
    console.log(err);
  }
}
