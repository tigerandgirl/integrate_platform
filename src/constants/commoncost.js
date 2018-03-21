/**
 *  type: 0   select
 *        1   checkbox
 *        2   refer
 * */

var commoncost = {
    channel: [
        {code:'idx',name:'序号',display:true} ,{code:'channelCode',name:'发送通道编码'},{code:'reChannelCode',name:'返送通道编码'},
        {code:'asyncFlag',name:'异步标识',type:0,typeCode:[{label:'Async',value:'Async' }]},{code:'sourceSys',name:'来源系统'},{code:'targetSys',name:'目标系统'},
        {code:'syncAddress',name:'同步地址'},{code:'syncMethod',name:'同步方法',type:0,typeCode:[{label:'POST',value:'POST' }]}] ,
    erp:[{code:'idx',name:'序号',display:true},{code:'sysCode',name:'系统编码'},{code:'sysName',name:'系统名称'}
        ,{code:'ip',name:'IP地址'},{code:'brevityCode',name:'简码'},
            {code:'isSSO',name:'是否单点',type:0,typeCode:[{label:'是',value:true },{label:'否',value:false }]}
        ,{code:'ssoURI',name:'单点URL'},
        {code:'ssoMethod',name:'请求方法',type:0,typeCode:[{label:'POST',value:'POST' },{label:'GET',value:'GET' }]},{code:'ssoUser',name:'用户'}
        ,{code:'ssoPwd',name:'密码'},{code:'sysType',name:'类型'},{code:'port',name:'端口'},
        {code:'sysVersion',name:'版本',type:0,typeCode:[{label:'NC65',value:'NC65' }]}
    ]
}
export  default commoncost;