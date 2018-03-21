import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { connect } from 'react-redux';
import { getData, saveData, updateData ,deleteData, openModal } from '@/store/erp_system_manage/action';
import PropTypes from 'prop-types';
import Table from '@/components/erpSystemManage/Table.jsx';
import ModalView from '@/components/erpSystemManage/ModalView.jsx';

class Erp extends Component{
  static propTypes = {
    erpData: PropTypes.object.isRequired,
    saveData:PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    updateData:PropTypes.func.isRequired,
    showModal:PropTypes.object.isRequired,
    openModal:PropTypes.func.isRequired,
    addOrUpdateModal:PropTypes.object.isRequired
  }

  /**
   * 添加或删减通道，交由redux进行数据处理，作为全局变量
   * @param  {int} index 编辑的通道索引
   * @param  {int} num   添加||删减的通道数量
   */
  handleEdit = (index, num) => {
    let currentNum = this.props.erpData.dataList[index].selectNum + num;
    if(currentNum < 0){
      return
    }
    this.props.updateData(index, currentNum);
  }

  // 选择通道，交由redux进行数据处理，作为全局变量
  togSelect = index => {
  }

  shouldComponentUpdate(nextProps, nextState) {
     return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  componentWillMount(){
    this.props.getData();
  }
  componentDidMount(){
    if(!this.props.erpData.dataList.length){
      this.props.getData();
    }
  }

  // 新增和编辑用同一个Modal
  openModal = (rows)=>{
    this.props.openModal(rows);
  }

  saveModal =(data)=>{
    let params = {};
    params.data = data ;
    params.headers = {"content-type":"application/json"} ;
    this.props.saveData( params ) ;
    setTimeout(()=>{  this.props.getData();},1000)
    this.refs.modal.closeModal();
  }

  updateModal = (data)=>{
    let params = {};
    params.data = data ;
    params.headers = {"content-type":"application/json"} ;
    this.props.updateData( params , data.sysCode) ;
    setTimeout(()=>{  this.props.getData();},1000)
    this.refs.modal.closeModal();
  }

  //update
  editRows =( rows) =>{
      this.openModal(rows)
  }
  // delete
  delRows =(data) =>{
    this.props.deleteData( data ) ;
    setTimeout(()=>{  this.props.getData();},1000)
    this.refs.table.closeDelModal();
  }

  render(){
    return (
        <div className="s-smNav">
          <ul className="s-smNav-ul">
            <li><span>ERP系统管理</span></li>
            <li><button onClick={this.openModal}>新增</button></li>
          </ul>
          <Table ref="table" editRows={this.editRows}  delRows={this.delRows} tableData={this.props.erpData.dataList}/>
          <ModalView ref="modal" showModal={ this.props.showModal } saveModal={this.saveModal} updateModal={this.updateModal}/>
        </div>
    )
  }
}


export default connect(state => ({
  erpData: state.erpData,
  showModal: state.showModal,
  addOrUpdateModal: state.addOrUpdateModal
}), {
  getData,
  saveData,
  updateData,
  deleteData,
  openModal
})(Erp);
