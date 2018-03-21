import Server from './Server';
import Config from '@/config';

class ErpSystemManageApi extends Server{

    /**
     *  用途：查询通道列表
     *  @url /fiadapter_web/channel
     *  返回http_code为200表示成功
     *  @method get
     *  @return {promise}
     */
    async queryAll(params = {}){
        try{
            let result = await this.axios('get', Config.erpSystem, params);
            if(result && (result.data instanceof Object) && result.code === 1){
                return result.data||[];
            }else{
                let err = {
                    tip: '查询ERP列表数据失败',
                    response: result,
                    data: params,
                    url: Config.erpSystem,
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }
    /**
     *  用途：保存ERP
     *  @url /fiadapter_web/erp
     *  返回success为true表示成功,false失败
     *  @method post
     *  @return {promise}
     */
    async saveData(params = {}){
        try{
            let result = await this.axios('post', Config.erpSystem, params);
            if(result && (result.data instanceof Object) && result.success){
                return result;
            }else{
                let err = {
                    tip: '保存ERP列表失败',
                    response: result,
                    data: params,
                    url: Config.erpSystem,
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }
    /**
     *  用途：修改ERP
     *  @url /fiadapter_web/erp
     *  返回success为true表示成功,false失败
     *  @method put
     *  @return {promise}
     */
    async updateData(params = {} , key ){
        try{
            let result = await this.axios('put', Config.erpSystem + '/'+key , params);
            if(result && (result.data instanceof Object) && result.success){
                return result;
            }else{
                let err = {
                    tip: '保存ERP列表失败',
                    response: result,
                    data: params,
                    url: Config.erpSystem,
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }

    /**
     *  用途：删除ERP
     *  @url /fiadapter_web/erp
     *  返回success为true表示成功,false失败
     *  @method put
     *  @return {promise}
     */
    async deleteData(params = "" ){
        try{
            let result = await this.axios('DELETE', Config.erpSystem + '/'+params );
            if(result && (result.data instanceof Object) && result.success){
                return result;
            }else{
                let err = {
                    tip: '删除ERP列表失败',
                    response: result,
                    data: params,
                    url: Config.erpSystem,
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

export default new ErpSystemManageApi();
