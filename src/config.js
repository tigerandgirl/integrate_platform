//调用java api的url

var serverUrl = process.env.SERVER;

var requestHeader="";
if(window.SERVICESURL!=''){
  serverUrl = window.SERVICESURL
}
if (process.env.NODE_ENV === 'development') { // 开发调试
    serverUrl="http://172.16.86.28:8080"
    requestHeader="?phone=18331592687"
}

var Config = {
    refer:{
        referDataUrl:serverUrl+'/refbase_ctr/queryRefJSON', //refer 其他参照，调用refbase_ctr/queryRefJSON 10.3.14.240
        referDataUserUrl:serverUrl+'/refbase_ctr/queryRefUserJSON', //人员参照API
        referSassAndNc:serverUrl+'/node/queryRefJSON',
        referOtherUrl:serverUrl+'/node/getRefData'+requestHeader,
    },

    /**
     * 用户登录接口
     *  get方法查询用户信息
     *  delete方法/fiadapter_web/login?username=admin&password=123456
     */
    login:serverUrl+'/fiadapter_web/login',

    /**
     * 通过管理接口
     *  get方法查询列表
     *  post方法注册通道
     *  delete方法/fiadapter_web/channel/{channelcode}
     */
    channelManage:serverUrl+'/fiadapter_web/channel',
    erpSystem:serverUrl + '/fiadapter_web/erp'
};

export default Config;
