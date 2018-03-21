import Server from './Server';
import Config from '@/config';

class ChannelManageApi extends Server{

    /**
     *  用途：查询通道列表
     *  @url /fiadapter_web/channel
     *  返回success为true表示成功,false失败
     *  @method get
     *  @return {promise}
     */
    async queryAll(params = {}){
        try{
            let result = await this.axios('get', Config.channelManage, params);
            if(result && (result.data instanceof Object) && result.code === 1){
                return result.data||[];
            }else{
                let err = {
                    tip: '查询通道列表数据失败',
                    response: result,
                    data: params,
                    url: Config.channelManage,
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }

    /**
     *  用途：保存通道
     *  @url /fiadapter_web/channel
     *  返回success为true表示成功,false失败
     *  @method post
     *  @return {promise}
     */
    async save(params = {}){
        try{
            let result = await this.axios('post', Config.channelManage, params);
            if(result && (result.data instanceof Object) && result.success){
                return result;
            }else{
                let err = {
                    tip: '保存通道列表失败',
                    response: result,
                    data: params,
                    url: Config.channelManage,
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }

    /**
     *  用途：删除通道
     *  @url /fiadapter_web/channel/{channelcode}
     *  返回success为true表示成功,false失败
     *  @method delete
     *  @return {promise}
     */
    async delete(params = ""){
        try{
            let result = await this.axios('delete', Config.channelManage+`/${params}`);
            if(result && (result.data instanceof Object) && result.success){
                return result.data||[];
            }else{
                let err = {
                    tip: '删除通道失败',
                    response: result,
                    data: params,
                    url: Config.channelManage,
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }

    /**
     *  用途：获取记录数据
     *  @url http://cangdu.org/shopro/data/record
     *  返回http_code为200表示成功
     *  @method get
     *  @return {promise}
     */
    async getRecord(params = {}){
        try{
            let result = await this.axios('get', `/shopro/data/record/${params.type}`);
            if(result && (result.data instanceof Object) && result.http_code === 200){
                return result.data;
            }else{
                let err = {
                    tip: '获取记录数据失败',
                    response: result,
                    data: params,
                    url: 'http://cangdu.org/shopro/data/record',
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }

    /**
     *  用途：上传图片
     *  @url http://cangdu.org:8001/v1/addimg/shop
     *  返回status为1表示成功
     *  @method post
     *  @return {promise}
     */
    async uploadImg(params = {}){
        try{
            let result = await this.axios('post', 'http://cangdu.org:8001/v1/addimg/shop', params);
            if(result && result.status === 1){
                return result;
            }else{
                let err = {
                    tip: '上传图片失败',
                    response: result,
                    data: params,
                    url: 'http://cangdu.org:8001/v1/addimg/shop',
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }

    /**
     *  用途：获取佣金数据
     *  @url http://cangdu.org/shopro/data/balance
     *  返回http_code为200表示成功
     *  @method get
     *  @return {promise}
     */
    async getBalance(params = {}){
        try{
            let result = await this.axios('get', '/shopro/data/balance', params);
            if(result && (result.data instanceof Object) && result.http_code === 200){
                return result.data.data||{};
            }else{
                let err = {
                    tip: '获取佣金数据失败',
                    response: result,
                    data: params,
                    url: 'http://cangdu.org/shopro/data/balance',
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }
}

export default new ChannelManageApi();
