import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { connect } from 'react-redux';
import { getChannelData, togSelectChannel, editChannel, delChannel } from '@/store/channel_manage/action';
import PropTypes from 'prop-types';

class Channel extends Component{
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

  render(){
    return (
      <h1>ChannelPage</h1>
    )
  }
}


export default connect(state => ({
  channelData: state.channelData,
}), {
  getChannelData,
  togSelectChannel,
  editChannel
})(Channel);