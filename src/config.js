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
    stdreimburse:{
        querystandarddata:serverUrl+'/nodeexpensestandard/querystandarddata' +requestHeader, // 查询报销标准数据接口
        savestandarddata:serverUrl+'/nodeexpensestandard/savestandarddata'+requestHeader,   //保存
        delstandarddata:serverUrl +'/nodeexpensestandard/deletestandarddata'+requestHeader,  //删除
        updatestandarddata:serverUrl +'/nodeexpensestandard/updatestandarddata'+requestHeader,  //更新 or  编辑
        referranksUrl:serverUrl +'/dutyLevel/findAll',   // 职级参照
        referpostsUrl:serverUrl +'/duty/findAll',        // 职务参照
        filternodeexpensestandarduser:serverUrl +'/filternodeexpensestandard/user', //用户查询
        systemIsNc:serverUrl +'/node/systemIsNc', //1:nc系统   0:saas 系统
    },

    /**
     * 通过管理接口
     *  get方法查询列表
     *  post方法注册通道
     *  delete方法/fiadapter_web/channel/{channelcode}
     */
    channelManage:serverUrl+'/fiadapter_web/channel',
};

export default Config;
