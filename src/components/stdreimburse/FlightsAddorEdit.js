/*
* 机票报销标准 新增组件
* */
import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Refers} from 'ssc-refer';
import globalStore from '../../stores/GlobalStore';
import Config from '../../config'
import Checkbox from 'rc-checkbox';
import {DatePicker,Grid} from 'ssc-grid';

export default class FlightsAddorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.FlightsUserList=[]
    this.state = {
      isVisible:false,
      nameValue: "",
      focus: false,
      plantseattypes:[],//仓位
      posts:[], //职位
      ranks:[], //职级
      itemData:{},
      FlightsList:[],
      referposts:[], //职位
      referranks:[], //职级
      depts: [], //部门
      referdepts:[],
      fuserList: [],
      isuser: false,
      itemDataString: ''
    }
    this.cancelClick = this.cancelClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.addUserList = this.addUserList.bind(this);
    this.CheckedState = this.CheckedState.bind(this);
    this.inputOnFocus = this.inputOnFocus.bind(this);
    this.inputOnBlur = this.inputOnBlur.bind(this);
    this.setCheckData = this.setCheckData.bind(this);
    this.wordHandClick = this.wordHandClick.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    let that = this;
    // 新增初始化数据
    // if(JSON.stringify(nextProps.itemData) == "{}"  ){
    //   this.setState({
    //     nameValue:"",
    //     plantseattypes:[],
    //     posts:[], //职位
    //     ranks:[], //职级
    //     FlightsList:[],
    //     referposts:[], //职位
    //     referranks:[], //职级
    //     depts: [], //部门
    //     referdepts:[],
    //
    //   })
    //   return ;
    // }

    // 不知道有啥用的接口
    // this.setCheckData();
    // 反正需要调用  我也不知道为什么

    if(nextProps.FlightsList!=that.state.FlightsList){
      that.setState({
        FlightsList:nextProps.FlightsList
      })
    }
    that.setState({
      FlightsList:nextProps.FlightsList
    })
    if(that.state.itemDataString != JSON.stringify(nextProps.itemData)){
      let nameValue = nextProps.itemData && nextProps.itemData.name ? nextProps.itemData.name : ""
      that.setState({
        itemDataString: JSON.stringify(nextProps.itemData),
        itemData:nextProps.itemData,
        nameValue:nameValue,
        plantseattypes:nextProps.itemData &&nextProps.itemData.seattype ? nextProps.itemData.seattype : [],
        posts:nextProps.itemData && nextProps.itemData.posts ? nextProps.itemData.posts.map((item)=>{
          let dItem = {}
          dItem.id=item.pk;
          dItem.name=item.name?item.name:"";
          return dItem
        }) : [],
        referposts:nextProps.itemData && nextProps.itemData.posts ? nextProps.itemData.posts.map((item)=>{
          let dItem = {}
          dItem.id=item.pk;
          dItem.name=item.name?item.name:"";
          return dItem
        }) : [],
        ranks:nextProps.itemData && nextProps.itemData.ranks ? nextProps.itemData.ranks.map((item)=>{
          let dItem = {}
          dItem.id=item.pk;
          dItem.name=item.name?item.name:"";
          return dItem
        }) : [],
        referranks:nextProps.itemData && nextProps.itemData.ranks ? nextProps.itemData.ranks.map((item)=>{
          let dItem = {}
          dItem.id=item.pk;
          dItem.name=item.name?item.name:"";
          return dItem
        }) : [],
        depts: nextProps.itemData && nextProps.itemData.depts ? nextProps.itemData.depts.map((item)=>{
          let dItem = {}
          dItem.id=item.pk;
          dItem.name=item.name?item.name:"";
          return dItem
        }) : [],
        referdepts: nextProps.itemData && nextProps.itemData.depts ? nextProps.itemData.depts.map((item)=>{
          let dItem = {}
          dItem.id=item.pk;
          dItem.name=item.name?item.name:"";
          return dItem
        }) : [],
        //isuser: nextProps.itemData && nextProps.itemData.relationuserflag == 'Y' ? true : false,
        fuserList: nextProps.itemData && nextProps.itemData.users ? nextProps.itemData.users : []
      },
          () => {
            if(that.state.nameValue){
              that.titleName.style.top='-10px'
            }else{
              that.titleName.style.top='13px'
            }
          })
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {

  }

  CheckedState(event){
    let that = this;
    let val = event.target.name;
    // console.log(val);
    let plantseattypes = that.state.plantseattypes;
    let flag = true;
    plantseattypes.map((item,index)=>{
      if(item.code==val){
        flag=false;
        plantseattypes.splice(index,1);
      }
    })
    if(flag){
      plantseattypes.push({code:val,name:''})
    }
    that.setState({
      plantseattypes:plantseattypes
    })
  }



  cancelClick() {
    let that = this;
    globalStore.showCancelModel("您是否要放弃当前操作？", ()=> {
    }, ()=> {
      that.setState({
        nameValue:"",
        plantseattypes:[],
        posts:[], //职位
        ranks:[], //职级
        FlightsList:[],
        referposts:[], //职位
        referranks:[], //职级
        depts: [], //部门
        referdepts:[],
        itemDataString: ''
      })
      that.props.setTabPage(1);
    });
  }

  referHandleChange(type,tempArray){
    let json = {};
    let selected = [];
    tempArray.forEach((item)=>{
      if(!json[item.id]){
        selected.push(item);
        json[item.id]=1;
      }
    })
    let that = this;
    if(type=='ranks'){
      that.setState({
        referranks:selected
      })
    }
    if(type=='posts'){
      that.setState({
        referposts:selected
      })
    }
    if(type=='depts'){
      that.setState({
        referdepts:selected
      })
    }

  }

  cancelFn(){
    let that = this;
    let posts = that.state.posts;
    let ranks = that.state.ranks;
    let depts = that.state.depts;
    that.setState({
      isVisible:false,
      referposts:posts,
      referranks:ranks,
      referdepts:depts
    })
  }

  sureFn(){
    let that = this;
    let referposts = that.state.referposts;
    let referranks = that.state.referranks;
    let referdepts = that.state.referdepts;
    that.setState({
      isVisible:false,
      posts:referposts,
      ranks:referranks,
      depts:referdepts,
      fuserList:that.FlightsUserList
    })
  }

  /* 新增用户按钮 */
  addUserList() {
    let that = this;
    that.setCheckData();
    that.setState({
      isVisible:true
    },()=>{
      //
    })
  }

  submitClick() {
    let that = this;
    let data = {};
    let msg = [];
    data.name = that.state.nameValue;
    data.policyexpensetype='airplane';
    data.seattype = that.state.plantseattypes.map((item)=>item.code);
    data.plantseattypes = that.state.plantseattypes.map((item)=>item.code);
    data.posts = that.state.posts.map((item)=>item.id);
    data.ranks = that.state.ranks.map((item)=>item.id);
    data.depts = that.state.depts.map((item)=>item.id);
    data.users = that.state.fuserList.map((item)=>item.userid)
    data.relationuserflag = that.state.isuser ? 'Y' : 'N'
    if(that.state.itemData && that.state.itemData.ts){
      data.ts = that.state.itemData.ts;
    }
    if(!data.name){
      msg.push(<li>标准名称不能为空！</li>)
    }
    if(data.seattype.length==0){
      msg.push(<li>请选择舱位！</li>)
    }
    // if(data.posts.length==0){
    //   msg.push(<li>请选择职级！</li>)
    // }
    // if(data.ranks.length==0){
    //   msg.push(<li>请选择职务！</li>)
    // }
    if(msg.length>0){

      globalStore.showModel(msg)
      return;
    }

    if(that.state.itemData && that.state.itemData.id){
      data.id = that.state.itemData.id;
      data.code = that.state.itemData.code;
      that.props.dataAddOrUpdate(1,data,(type)=>{//编辑
        if(type==1){
          that.setState({
            nameValue:"",
            plantseattypes:[],
            posts:[], //职位
            ranks:[], //职级
            FlightsList:[],
            referposts:[], //职位
            referranks:[], //职级
            depts: [], //部门
            referdepts:[],
          })
          that.props.setTabPage(1);
        }
      });
    }else{
      that.props.dataAddOrUpdate(0,data,(type)=>{//新增
        if(type==1){
          that.setState({
            nameValue:"",
            plantseattypes:[],
            posts:[], //职位
            ranks:[], //职级
            FlightsList:[],
            referposts:[], //职位
            referranks:[], //职级
            depts: [], //部门
            referdepts:[],
          })
          that.props.setTabPage(1);
        }
      });
    }
  }

  handleChange(e) {
    this.setState({nameValue: e.target.value});
  }

  //input 获取焦点
  inputOnFocus() {
    //this.setState({focus: true});
    this.titleName.style.top = '-10px';
  }

  //input 失去焦点
  inputOnBlur(e) {
    //this.setState({focus: false});
    let val = e.target.value;
    if(val==''){
      this.titleName.style.top='13px'
    }
  }

  // 文字点击事件
  wordHandClick() {
    var str = this.valueName.value
    str = $.trim(str);
    if(str == '') {
      this.titleName.style.top = '-10px';
      this.valueName.focus();
    }
  }

  handleDelete(type,data,event) {
    let that = this;
    let msg = [];
    msg.push('您是否要将用户')
    msg.push(data.name)
    msg.push('移除')
    msg.push(type=='ranks'?'职级': type=='depts'? '部门':'职务')
    msg.push('外?')
    globalStore.showCancelModel(msg.join(''), ()=> {
    }, ()=> {

      if(type==='ranks'){
        let ranks = that.state.ranks;
        let referranks = that.state.referranks;
        ranks.forEach((item,index)=>{
          if(data.id==item.id){
            ranks.splice(index,1);
            referranks.splice(index,1);
          }
        });
        that.setState({
          ranks:ranks,
          referranks:referranks
        });
      }

      if(type==='posts'){
        let posts = that.state.posts;
        let referposts = that.state.referposts;
        posts.forEach((item,index)=>{
          if(data.id==item.id){
            posts.splice(index,1);
            referposts.splice(index,1);
          }
        });
        that.setState({
          posts:posts,
          referposts:referposts
        });
      }
      if(type==='depts'){
        let depts = that.state.depts;
        let referdepts = that.state.referdepts;
        depts.forEach((item,index)=>{
          if(data.id==item.id){
            depts.splice(index,1);
            referdepts.splice(index,1);
          }
        });
        that.setState({
          depts:depts,
          referdepts:referdepts
        });
      }
    });
  }


  render() {
    let that = this;
    const filterByFields = ['name', 'code'];
    return (
        <div className="container-fluid">
          <div className="stdreimburse-box">
            <div className="row">
              <div className="col-md-12">
                <div className="pr">
                  <div ref={(input) => { this.titleName = input; }}
                       className="standard-name-label" onClick={this.wordHandClick}>标准名称</div>
                  <input className="standard-name-input" type="text" value={that.state.nameValue}
                         onChange={that.handleChange}
                         onBlur={ ::this.inputOnBlur }
                         onFocus={ ::this.inputOnFocus }
                         ref={(input) => { this.valueName = input; }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="stdreimburse-box">
            <div className="row">
              <div className="col-md-12">
                <span className="standard-content">标准内容</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="standard-detail">舱位控制</div>
                <div className="row">
                  <div className="col-md-12">
                    <form className="horizontal">
                      <div className="form-group standard-formgroup">
                      {that.props.FlightsList.map((plane,planei)=>{
                        return (
                          <div key={planei+'plane'} className={planei===0?'checkbox mr20 standard-checkbox':'checkbox mr20 standard-checkbox'}>
                            {that.state.plantseattypes.some((item)=>{
                              return item.code==plane.id
                            }) ?  (
                              <label>
                                <Checkbox
                                    name={plane.id}
                                    onChange={that.CheckedState}
                                    checked={true}
                                />
                                {plane.name}
                              </label>
                            ) : (
                              <label>
                                <Checkbox
                                  name={plane.id}
                                  onChange={that.CheckedState}
                                  checked={false}
                                />
                                {plane.name}
                              </label>
                            )}

                          </div>
                        )
                      })}
                      </div>
                    </form>
                    <div className="standard-detail mt10">提示：请勾选该标准包含的选项，不勾选则不包含在标准内。</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stdreimburse-box">
            <div className="row">
              <div className="col-md-12">
                <span className="standard-content">匹配用户</span>
                <span className="checkbox hidden" style={{display:'inline-block','marginLeft':'15px'}}>
                  <label><input type="checkbox" onClick={that.isUserChecked.bind(this)} checked={that.state.isuser} />确定到用户</label>
                </span>
                <a className="btn btn-primary fr" onClick={that.addUserList} href="javascript:;">添加用户</a>
              </div>
            </div>
            <div className={!that.state.isuser ? 'row' : 'hide'}>
              <div className={that.props.deptsIsShow ? 'col-md-12' : 'hide col-md-12'}>
                <span className="standard-detail">部门： </span>
                <div style={{display:"inline-block"}}>
                    {
                      that.state.depts.map((item,index)=>{
                        if(index===0){
                          return (
                            <div key={index+'depts'} className="standard-detail-name">
                            {item.name}
                            <span className="tip" onClick={that.handleDelete.bind(this,'depts',item)}>x</span>
                          </div>
                          )
                        }else{
                          return (
                            <div key={index+'depts'} style={{display:"inline-block"}}>
                              、
                              <div className="standard-detail-name">
                                {item.name}
                                <span className="tip" onClick={that.handleDelete.bind(this,'depts',item)}>x</span>
                              </div>
                            </div>
                          )
                        }
                      })
                    }
                </div>

              </div>
            </div>
            <div className={!that.state.isuser ? 'row' : 'hide'}>
              <div className="col-md-12">
                <span className="standard-detail">职级： </span>
                <div style={{display:"inline-block"}}>
                    {
                      that.state.ranks.map((item,index)=>{
                        if(index===0){
                          return (
                            <div key={index+'ranks'} className="standard-detail-name">
                            {item.name}
                            <span className="tip" onClick={that.handleDelete.bind(this,'ranks',item)}>x</span>
                          </div>
                          )
                        }else{
                          return (
                            <div key={index+'ranks'} style={{display:"inline-block"}}>
                              、
                              <div className="standard-detail-name">
                                {item.name}
                                <span className="tip" onClick={that.handleDelete.bind(this,'ranks',item)}>x</span>
                              </div>
                            </div>
                          )
                        }
                      })
                    }
                </div>
              </div>
            </div>
            <div className={!that.state.isuser ? 'row' : 'hide'}>
              <div className="col-md-12">
                <span className="standard-detail">职务： </span>
                <div style={{display:"inline-block"}}>
                    {
                      that.state.posts.map((item,index)=>{
                        if(index===0){
                          return (
                            <div key={index+'posts'} className="standard-detail-name">
                            {item.name}
                            <span className="tip" onClick={that.handleDelete.bind(this,'posts',item)}>x</span>
                          </div>
                          )
                        }else{
                          return (
                            <div key={index+'posts'} style={{display:"inline-block"}}>
                              、
                              <div className="standard-detail-name">
                                {item.name}
                                <span className="tip" onClick={that.handleDelete.bind(this,'posts',item)}>x</span>
                              </div>
                            </div>
                          )
                        }
                      })
                    }
                </div>

              </div>
            </div>
            <div className={that.state.isuser ? 'row' : 'hide'}>
              <div className="col-md-12">
              <Grid
                columnsModel={that.props.fuserColumn.toJS()}
                tableData={that.state.fuserList}
                className="standard-grid"
              />
              </div>
            </div>
          </div>
          <div className="btn-bottom-fixed">
            <div className="row btn-bottom">
              <div className="col-sm-12">
                <button type="button" onClick={that.submitClick} className='btn btn-primary fr'>保存</button>
                <button type="button" onClick={that.cancelClick} className='btn btn-default fr'>取消</button>
              </div>
            </div>
          </div>

          <Modal show={that.state.isVisible} onHide={that.cancelFn.bind(this)} className ="static-modal">
              <Modal.Header>
                  <Modal.Title>添加用户</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="stdreimburse-box">
                  <div className="row mb20">
                    <div className="col-md-12">
                      <span className="screen-condition">筛选条件</span>
                    </div>
                  </div>
                  <div className="row">
                  <div className={that.props.deptsIsShow? "col-md-3":"hide col-md-3"}>
                    <div className="screen-condition-label">部门</div>
                    <div>
                      <Refers
                          key={Math.random()}
                          labelKey="name"
                          filterBy={filterByFields}
                          emptyLabel='暂无数据'
                          onChange={this.referHandleChange.bind(this,'depts')}
                          placeholder="请选择..."
                          referConditions={{"refCode":"部门","displayFields":["id","code","name"]}}
                          referDataUrl={Config.refer.referSassAndNc}
                          referType="list"
                          selected={that.state.referdepts}
                          ref={ref => this._myrefers = ref}
                          multiple={true}
                          renderMenuItemChildren={this._renderMenuItemChildren}
                      />
                    </div>
                  </div>
                    <div className="col-md-3">
                      <div className="screen-condition-label">职级</div>
                        <div>
                          <Refers
                            key={Math.random()}
                            labelKey="name"
                            emptyLabel='暂无数据'
                            onChange={this.referHandleChange.bind(this,'ranks')}
                            placeholder="请选择..."
                            referConditions={that.props.deptsIsShow? {"refCode":"职级","displayFields":["id","name"]} : {"refCode":"dutyLevel","displayFields":["id","name"]}}
                            referDataUrl={that.props.deptsIsShow? Config.refer.referSassAndNc : Config.stdreimburse.referranksUrl}
                            referType="list"
                            selected={that.state.referranks}
                            ref={ref => this._myrefers = ref}
                            multiple={true}
                          />
                        </div>
                    </div>
                    <div className="col-md-3">
                      <div className="screen-condition-label">职务</div>
                      <div>
                        <Refers
                          key={Math.random()}
                          labelKey="name"
                          onChange={this.referHandleChange.bind(this,'posts')}
                          placeholder="请选择..."
                          emptyLabel='暂无数据'
                          referConditions={that.props.deptsIsShow? {"refCode":"职务","displayFields":["id","name"]} : {"refCode":"duty","displayFields":["id","name"]}}
                          referDataUrl={that.props.deptsIsShow? Config.refer.referSassAndNc : Config.stdreimburse.referpostsUrl}
                          referType="list"
                          selected={that.state.referposts}
                          ref={ref => this._dutyrefers = ref}
                          multiple={true}
                        />
                        </div>
                    </div>
                    <div  className={that.state.isuser ? 'col-md-3' : 'hide'} style={{"padding": '24px 0 0 15px'}}>
                      <Button bsStyle="primary" onClick={that.selectUser.bind(this)}>筛选</Button>
                    </div>
                  </div>
                  <div className={that.state.isuser ? 'row mb20' : 'hide'}>
                    <div className="col-md-12">
                      <span className="screen-condition">用户列表</span>
                    </div>
                  </div>
                  <div className={that.state.isuser ? 'row' : 'hide'}>
                  <Grid
                     ref={(c) => { that[`griduser`] = c; }}
                    selectRow={{
                      mode: 'checkbox',
                      onSelect: that.handleSelect.bind(this),
                      onSelectAll: that.handleSelectAll.bind(this)
                    }}
                    columnsModel={that.props.fuserColumn.toJS()}
                    tableData={that.props.fuserList.toJS()}
                    className="standard-grid"
                  />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={that.cancelFn.bind(this)}>取消</Button>
                  <Button bsStyle="primary" onClick={that.sureFn.bind(this)}>确定</Button>
              </Modal.Footer>
          </Modal>

        </div>
    )
  }
  _renderMenuItemChildren(option, props, index) {
      return [
          <span key="code">
      {option.code+" "}
    </span>,
          <strong key="name">{option.name} </strong>,
      ];
  }
  isUserChecked(){
    let that = this
    that.setState({
      isuser: !that.state.isuser
    })
  }
  selectUser(){
    let that = this
    let data = {}
    if(that.state.referdepts.length==0 && that.state.referposts.length ==0 && that.state.referranks==0){
      return;
    }
    data.deptids = that.state.referdepts.map((item)=>{
      return item.id
    })
    data.postpks = that.state.referposts.map((item)=>{
      return item.id
    })
    data.rankpks = that.state.referranks.map((item)=>{
      return item.id
    })
    this.props.getfilternodeexpensestandarduser(data);
  }
  handleSelect(rowIdx, rowObj, selected, event, selectedRows){
    let that = this
    let flag = -1;
    that.FlightsUserList.forEach((item,index)=>{
      if(item.userid==rowObj.userid){
        flag = index
      }
    })
    if(selected && flag==-1){
      let obj = JSON.parse(JSON.stringify(rowObj))
      that.FlightsUserList.push(obj)
    }
    if(!selected && flag>=0){
      that.FlightsUserList.splice(flag,1);
    }
  }
  handleSelectAll(tableData, selected/* , event, selectedRowsObj */){
    let that = this
    if(selected){
      tableData.forEach((item)=>{
        let flag = false;
        that.FlightsUserList.forEach((aitem)=>{
          if(item.userid==aitem.userid){
            flag=true
          }
        })
        if(!flag){
          let obj = JSON.parse(JSON.stringify(item))
          that.FlightsUserList.push(obj)
        }
      })
    }else{
      for(let i = that.FlightsUserList.length-1;i>=0;i--){
        tableData.map((item)=>{
          if(item.userid==that.FlightsUserList[i].userid){
            that.FlightsUserList.splice(i,1);
          }
        })
      }
    }
  }
  setCheckData(bodyListData){
    let that = this;
    that.props.getfilternodeexpensestandarduser({isflag:true});
  }
}
