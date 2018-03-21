/**
 * View Control
 */
import React, { Component, PropTypes } from 'react';
import {Modal,Button } from 'react-bootstrap';
import commoncost from '@/constants/commoncost';
import Select from 'react-select';
export class ModalView extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            View:{}
        };
    }

    componentWillMount () {
        // if update

    }

    /*
     * init input value
     * Edit state triggering
    */

    initView  =() =>{

    }

    // add or update input value
    setInput = (code , e ) =>{
        e.stopPropagation();
        let val = e.target.value ;
        let View = this.state.View ;
        View[code] = val   ;
        this.setState({
            View
        })
    }

    setSelect = ( code , e ) =>{
        let View = this.state.View ;
        View[code] = e.value  ;
        this.setState({
            View
        })
    }
    saveModal = () =>{
        console.log(JSON.stringify( this.state.View) );
        // sending to server
        let param = this.state.View ;
        param.syncPort ="";
        param.param = "";
        param.portStyle = "";
        this.props.saveModal(param);
    }

    //
    openModal = () =>{
        this.setState({
            showModal:true
        })
    }

    closeModal = ()=>{
        this.setState({
            showModal:false
        })
    }


    render(){
        let that = this ;
        return (
            <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="lg"  backdrop={'static'}>
                <Modal.Header closeButton>
                    <Modal.Title>{"新增"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">

                        {commoncost.channel.map( (m , n )=>{
                            if(!m.display){
                                if(m.type == 0){
                                    return(
                                        <div className="col-md-6 h42" key={"channel-"+n}>
                                            <label className="col-md-4 tr s-row-lab">{m.name}</label >
                                            <div className="col-md-8">
                                                <Select
                                                    name="form-field-name"
                                                    value={this.state.View[m.code]}
                                                    placeholder ={m.name}
                                                    onChange={that.setSelect.bind(this,m.code)}
                                                    options={m.typeCode}
                                                />
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div className="col-md-6 h42" key={"channel-"+n}>
                                            <label className="col-md-4 tr s-row-lab">{m.name}</label >
                                            <div className="col-md-8">
                                                <input type="text" placeholder={m.name}  className="form-control" value={this.state.View[m.code]} onChange = {that.setInput.bind(this,m.code)}/>
                                            </div>
                                        </div>
                                    )
                                }

                            }
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="fr">
                        <button onClick={this.saveModal} className="s-row-btn-sure mr15">确定</button>
                        <button onClick={this.closeModal} className="s-row-btn-exit mr15">取消</button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}
export  default ModalView ;