import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { connect } from 'react-redux';
import { getChannelData, togSelectChannel, editChannel, delChannel } from '@/store/channel_manage/action';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const bodyContainer = {
  "success": true,
  "message": "操作成功.",
  "data": [
    {
      "id": "01BC41BA-3F3B-44C6-9720-E5723293492A",
      "channelCode": "777",
      "reChannelCode": "666",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "127.0.0.1:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "777"
    },
    {
      "id": "123",
      "channelCode": "111",
      "reChannelCode": "21",
      "asyncFlag": "Sync",
      "sourceSys": "NC65",
      "targetSys": null,
      "syncAddress": "20.10.80.93:2345/uapws/rest/uapbdrest/bybillts",
      "param": null,
      "portStyle": null,
      "syncMethod": "GET",
      "channelcode": "111"
    },
    {
      "id": "19039D45-E875-46D7-BC5B-A54661F7AC31",
      "channelCode": "archivesOrg",
      "reChannelCode": "re_archivesOrg",
      "asyncFlag": "Async",
      "sourceSys": "NC65",
      "targetSys": "SSC",
      "syncAddress": "127.0.0.1:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "archivesOrg"
    },
    {
      "id": "19750737-2B9D-4D3A-8320-A9DD2AAE8DBA",
      "channelCode": "erp2ssc_yanglkf_req",
      "reChannelCode": "erp2ssc_yanglkf_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "erp2ssc_yanglkf_req"
    },
    {
      "id": "51FF46DC-979E-4816-BB85-E6D97F9A2E14",
      "channelCode": "ssc2erp_121_req",
      "reChannelCode": "ssc2erp_121_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "ssc2erp_121_req"
    },
    {
      "id": "59329B26-82BA-4FF3-9092-CBD7FDEB1839",
      "channelCode": "aaa",
      "reChannelCode": "bbb",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "aaa"
    },
    {
      "id": "5FC209AF-AC41-41FF-A57E-0F0DCB2D6012",
      "channelCode": "erp2ssc_121_req",
      "reChannelCode": "erp2ssc_121_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm ",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "erp2ssc_121_req"
    },
    {
      "id": "7EB971E2-822F-4D02-B286-DC9DB2D4DE21",
      "channelCode": "ssc2erp_183_req",
      "reChannelCode": "ssc2erp_183_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "ssc2erp_183_req"
    },
    {
      "id": "7FC881E1-5021-4AF4-AD64-578FB041AD5F",
      "channelCode": "ssc2erp_req",
      "reChannelCode": "ssc2erp_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "ssc2erp_req"
    },
    {
      "id": "8BB7E763-1EB1-4E37-84A5-3864D38BA092",
      "channelCode": "ssc2erp_1230_req",
      "reChannelCode": "ssc2erp_1230_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "ssc2erp_1230_req"
    },
    {
      "id": "94AC7621-190E-4317-9325-F98EDABB7B36",
      "channelCode": "ssc2erp_voucher_lower",
      "reChannelCode": "ssc2erp_voucher_upper",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "ssc2erp_voucher_lower"
    },
    {
      "id": "9D92B0B4-9E07-4442-A68B-A5E1DFB4B806",
      "channelCode": "archivesOrg1",
      "reChannelCode": "re_archivesOrg1",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "127.0.0.1:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "archivesOrg1"
    },
    {
      "id": "C0004D98-BB64-43D5-B6F7-A52861DB838B",
      "channelCode": "ssc2erp_voucher_req",
      "reChannelCode": "ssc2erp_voucher_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "ssc2erp_voucher_req"
    },
    {
      "id": "CB85C241-F7BD-40A5-BF12-05DCDF4BA328",
      "channelCode": "erp2ssc_req",
      "reChannelCode": "erp2ssc_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "erp2ssc_req"
    },
    {
      "id": "E40C2C7C-5E25-48D9-BE61-BE3FC3CC6488",
      "channelCode": "346",
      "reChannelCode": "3",
      "asyncFlag": "Sync",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "10.6.247.253:183/iwebap/faweb_newasset_ctrl/dealbill/delete",
      "param": "123",
      "portStyle": null,
      "syncMethod": "POST",
      "channelcode": "346"
    },
    {
      "id": "E40C2C7C-5E25-48D9-BE61-BE3FC3CC64FF",
      "channelCode": "345",
      "reChannelCode": "3",
      "asyncFlag": "Sync",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "10.6.247.253:183/iwebap/faweb_newasset_ctrl/dealbill/save",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "345"
    },
    {
      "id": "EAD60AFA-E5A6-4FED-A704-3E723F0D39A8",
      "channelCode": "erp2ssc_1230_req",
      "reChannelCode": "erp2ssc_1230_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "erp2ssc_1230_req"
    },
    {
      "id": "EC907F67-0FA9-40B9-ACC8-3CEDBFF09721",
      "channelCode": "erp2ssc_183_req",
      "reChannelCode": "erp2ssc_183_rsp",
      "asyncFlag": "Async",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "172.20.4.121:8080/fiadapter_web/mock/postm",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "erp2ssc_183_req"
    },
    {
      "id": "EC907F67-0FA9-40B9-ACC8-3CEDBFF09722",
      "channelCode": "347",
      "reChannelCode": "3",
      "asyncFlag": "Sync",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "20.10.80.93:2345/iwebap/voucherMsgSync/sscMsgSync/voucherSave",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "347"
    },
    {
      "id": "EC907F67-0FA9-40B9-ACC8-3CEDBFF09723",
      "channelCode": "348",
      "reChannelCode": "3",
      "asyncFlag": "Sync",
      "sourceSys": "123",
      "targetSys": "123",
      "syncAddress": "20.10.80.93:2345/iwebap/voucherMsgSync/sscMsgSync/voucherDelete",
      "param": "123",
      "portStyle": "",
      "syncMethod": "POST",
      "channelcode": "348"
    }
  ],
  "code": 1
}

class Task extends Component{
  static propTypes = {
    channelData: PropTypes.object.isRequired,
    getChannelData: PropTypes.func.isRequired,
    togSelectChannel: PropTypes.func.isRequired,
    editChannel: PropTypes.func.isRequired,
  }

  /**
   * 添加或删减通道，交由redux进行数据处理，作为全局变量
   * @param  {int} index 编辑的通道索引
   * @param  {int} num   添加||删减的通道数量
   */
  handleEdit = (index, num) => {
    let currentNum = this.props.channelData.dataList[index].selectNum + num;
    if(currentNum < 0){
      return
    }
    this.props.editChannel(index, currentNum);
  }

  // 选择通道，交由redux进行数据处理，作为全局变量
  togSelect = index => {
    this.props.togSelectChannel(index);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  componentDidMount(){
    if(!this.props.channelData.dataList.length){
      this.props.getChannelData();
    }
  }
  dataFormat = (code,cell,row,formatExtraData, rowIdx)=>{
    return(
        <span>{bodyContainer.data [rowIdx][code]}</span>
    )
  }
  onPageChange = () =>{
  }
  editRows=()=>{

  }
  delRows =()=>{

  }


  render(){
    let headContainer= ['序号','发送通道编码','返送通道编码','异步标识','来源系统','目标系统','同步地址','同步方法'];

    let options ={
      noDataText: '暂无数据',
      page:1,
      onPageChange: this.onPageChange
    }
    let fetchInfo ={
      dataTotalSize:bodyContainer.data.length
    };

    return(
        <div className="s-container">
          <div className="s-smNav">
              <ul className="s-smNav-ul">
                 <li><span>通道管理</span></li>
                 <li className="active"><a href="javascript:;">类型注册</a></li>
                 <li><a href="javascript:;">任务部署</a></li>
                 <li><a href="javascript:;">监控</a></li>
                 <li><a href="javascript:;">日志</a></li>
                 <li><button>新增</button></li>
              </ul>

          </div>
          <BootstrapTable
              tableContainerClass=""
              headerContainerClass="row-span2 ssc-table-noborder"
              bodyContainerClass="table-table"
              data={headContainer}
              triped={true}
              hover={true}
              remote={ true }
              options={options}
              pagination
              bordered = {false}
              fetchInfo={ fetchInfo}
          >
            <TableHeaderColumn dataField="ids" isKey editable={false} hidden>1</TableHeaderColumn>
            <TableHeaderColumn key={Math.random()}   dataFormat={this.dataFormat.bind(this,"channelCode")}>{headContainer[0]}</TableHeaderColumn>
            <TableHeaderColumn key={Math.random()}   dataFormat={this.dataFormat.bind(this,"reChannelCode")}>{headContainer[1]}</TableHeaderColumn>
            <TableHeaderColumn key={Math.random()}   dataFormat={this.dataFormat.bind(this,"asyncFlag")}>{headContainer[2]}</TableHeaderColumn>
            <TableHeaderColumn key={Math.random()}   dataFormat={this.dataFormat.bind(this,"sourceSys")}>{headContainer[4]}</TableHeaderColumn>
            <TableHeaderColumn key={Math.random()}   dataFormat={this.dataFormat.bind(this,"targetSys")}>{headContainer[5]}</TableHeaderColumn>
            <TableHeaderColumn key={Math.random()}   dataFormat={this.dataFormat.bind(this,"syncAddress")}>{headContainer[6]}</TableHeaderColumn>
            <TableHeaderColumn key={Math.random()}   dataFormat={this.dataFormat.bind(this,"syncMethod")}>{headContainer[7]}</TableHeaderColumn>
            <TableHeaderColumn dataField="option" editable={false} columnClassName="option-col vm noprint" className="noprint" width="110px"
                               dataFormat={(cell, row, formatExtraData, rowIdx) => (
                                <div className="option-btns">
                                    <span title="修改" className="glyphicon glyphicon-pencil mr10" onClick={this.editRows.bind(this,row)} aria-hidden="true" />
                                    <span title="删除" className="glyphicon glyphicon-trash mr10" onClick={this.delRows.bind(this,row)} aria-hidden="true" />
                                </div>
                            )} >操作</TableHeaderColumn>

          </BootstrapTable>
        </div>
    )
  }
}


export default connect(state => ({
  channelData: state.channelData,
}), {
  getChannelData,
  togSelectChannel,
  editChannel
})(Task);
