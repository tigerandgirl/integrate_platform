import Server from './Server';
import Config from '@/config';

class LoginApi extends Server{

    /**
     *  用途：查询通道列表
     *  @url /fiadapter_web/login
     *  返回http_code为200表示成功
     *  @method get
     *  @return {promise}
     */
    async userLogin(params = {}){
        try{
            let result = await this.axios('get', Config.login+`?username=${params.username}&password=${params.password}`);
            if(result && result.code === 1){
                return result;
            }else{
                let err = {
                    tip: '查询用户接口失败',
                    response: result,
                    data: params,
                    url: Config.login,
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }


}

export default new LoginApi();
