import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { connect } from 'react-redux';
import { getChannelData, togSelectChannel, saveChannel, delChannel } from '@/store/channel_manage/action';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Table from '@/components/channel/Table.jsx';
import ModalView from '@/components/channel/ModalView.jsx';


class Channel extends Component{
  static propTypes = {
    channelData: PropTypes.object.isRequired,
    getChannelData: PropTypes.func.isRequired,
    togSelectChannel: PropTypes.func.isRequired,
    saveChannel: PropTypes.func.isRequired,
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

  componentWillMount(){
    this.props.getChannelData();
  }
  componentDidMount(){
    if(!this.props.channelData.dataList.length){
      this.props.getChannelData();
    }
  }
  openModal = ()=>{
    this.refs.modal.openModal();
  }

  editRows =() =>{
    this.refs.modal.openModal();
    // do something 
  }

  delRows = (channelcode) =>{
      this.props.delChannel(channelcode);
      setTimeout(()=>{
          this.props.getChannelData();
      },1000);
      this.refs.table.closeDelModal();
  }
  saveModal = (data)=>{
      let params = {};
      params.data = data ;
      params.headers = {"content-type":"application/json"} ;
      this.props.saveChannel( params ) ;
      console.log(this.props.channelData.saveStatus)
      setTimeout(()=>{
          this.props.getChannelData();
      },1000);

  }
  render(){

    return(
        <div className="s-container">
          <div className="s-smNav">
              <ul className="s-smNav-ul">
                 <li><span>通道管理</span></li>
                 <li><button onClick={this.openModal}>新增</button></li>
              </ul>
              <Table editRows={this.editRows} ref="table" delRows={this.delRows} tableData={this.props.channelData.dataList}/>
              <ModalView ref="modal" saveModal={this.saveModal}/>
          </div>
        </div>
    )
  }
}


export default connect(state => ({
  channelData: state.channelData,
}), {
  getChannelData,
  togSelectChannel,
  saveChannel,
  delChannel
})(Channel);
