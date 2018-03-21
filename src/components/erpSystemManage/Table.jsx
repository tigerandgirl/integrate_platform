import React, { Component, PropTypes } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Modal,Button } from 'react-bootstrap';
import commoncost from '@/constants/commoncost';
import Select from 'react-select';
export class Table extends Component {

    constructor(props){
        super(props);
        this.state = {
            showDelModal:false,
            delRows:"",
        };
    }


    dataFormat = (code,cell,row,formatExtraData, rowIdx)=>{
        if(code == "idx"){
            return(
                <span>{rowIdx+1}</span>
            )
        } else{
            if(typeof this.props.tableData[rowIdx][code] == "boolean"){
                return(
                    <span>{this.props.tableData[rowIdx][code]  ? "是":"否"}</span>
                )
            }else{
                return(
                    <span>{this.props.tableData ? this.props.tableData[rowIdx][code]:""}</span>
                )
            }

        }
    }

    //编辑操作
    editRows=(rows)=>{
        this.props.editRows(rows);
    }

    //删除操作
    delRows =(row)=>{
        this.setState({
            delRows:row ? row.sysCode :"" ,
            showDelModal:true
        })
    }
    
    handleDelete= ()=>{
        this.props.delRows(this.state.delRows) ;
    }
    
    closeDelModal =()=>{
        this.setState({
            showDelModal:false,
            delRows:""
        })
    }


    render(){
        let options ={
            noDataText: '暂无数据',
        }
        const fetchInfo = {
            dataTotalSize: this.props.tableData ?  this.props.tableData.length : 0
        };
        return (
           <div>
                <BootstrapTable
                    tableContainerClass=""
                    headerContainerClass="row-span2 ssc-table-noborder"
                    bodyContainerClass="table-table"
                    data={this.props.tableData}
                    triped={true}
                    hover={true}
                    remote={ true }
                    options={options}
                    pagination
                    fetchInfo={ fetchInfo }
                    bordered = {false}
                >
                    <TableHeaderColumn dataField="ids" isKey editable={false} hidden>1</TableHeaderColumn>
                    {commoncost.erp.map( (m,n)=>{
                        return (
                            <TableHeaderColumn key={Math.random()}   dataFormat={this.dataFormat.bind(this,m.code)}>{m.name}</TableHeaderColumn>
                        )
                    })}
                    <TableHeaderColumn dataField="option" editable={false} columnClassName="option-col vm noprint" className="noprint" width="110px"
                                       dataFormat={(cell, row, formatExtraData, rowIdx) => (
                                    <div className="option-btns">
                                        <span title="修改" className="glyphicon glyphicon-pencil mr10" onClick={this.editRows.bind(this,row)} aria-hidden="true" />
                                        <span title="删除" className="glyphicon glyphicon-trash mr10" onClick={this.delRows.bind(this,row)} aria-hidden="true" />
                                    </div>
                                )} >操作</TableHeaderColumn>

                </BootstrapTable>
               <Modal show={this.state.showDelModal} onHide={this.closeDelModal} bsSize="sm"  backdrop={'static'}>
                   <Modal.Header closeButton>
                       <Modal.Title>{"提示"}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <span>确定删除？</span>
                   </Modal.Body>
                   <Modal.Footer>
                       <div className="fr">
                           <button onClick={this.handleDelete} className="s-row-btn-sure mr15">确定</button>
                           <button onClick={this.closeDelModal} className="s-row-btn-exit mr15">取消</button>
                       </div>
                   </Modal.Footer>
                </Modal>
           </div>
        )
    }

}


export default Table;