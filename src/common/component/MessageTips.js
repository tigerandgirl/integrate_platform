import React, { Component, PropTypes } from 'react';
import {Modal,Button } from 'react-bootstrap';

export default class MessageTips extends Component {

    constructor(props){
        super(props);
        this.state = {
            showDelModal:false
        };
    }
    closeModal = () =>{

    }
    render(){
        return (
            <Modal show={this.state.showDelModal} onHide={this.closeModal} bsSize="sm"  backdrop={'static'}>
                <Modal.Header closeButton>
                    <Modal.Title>{"提示"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>确定删除？</span>
                </Modal.Body>
                <Modal.Footer>
                    <div className="fr">
                        <button onClick={this.closeModal} className="s-row-btn-sure mr15">确定</button>
                        <button onClick={this.closeModal} className="s-row-btn-exit mr15">取消</button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}