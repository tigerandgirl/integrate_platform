/**
 * author:dangwei
 * date: 2017-05-15
 * mail: dangwei@yonyou.com
 */
import {observable,action,computed} from 'mobx';
import Config from '../../config'
import  GlobalStore from '../GlobalStore';
import React from 'react';
import $ from 'jquery';


export default class StdReimburseShipStore {
  globalStore = GlobalStore;
  @observable fuserColumn = [
    {type: 'string', id: 'userid', label: '员工编码'},
    {type: 'string', id: 'userName', label: '姓名'},
    {type: 'string', id: 'deptName', label: '部门'},
    {type: 'string', id: 'rankName', label: '职级'},
    {type: 'string', id: 'postName', label: '职务'}
  ];

  @observable fuserDataList = []
  @action
  getfilternodeexpensestandarduser(data){
    let that =this;
    if(data.isflag){
      that.fuserDataList = Object.assign([])
      return
    }
    $.ajax({
        type: "POST",
        url: Config.stdreimburse.filternodeexpensestandarduser,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: data => {
          that.fuserDataList = Object.assign([], data.users)
        },
        error: (xhr, status, err) => {
            // that.globalStore.hideWait();
            // this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
        }
      })
  }
  @observable queryStandardDataParame = {
    "paras": {
      "policyexpensetype": ["ship"]  //policyexpensetype_airplane 政策性标准-机票,policyexpensetype_train,政策性标准-火车票,policyexpensetype_stay,政策性标准-住宿,policyexpensetype_ship,政策性标准-轮船
    },
    "vaguequeryparam": "",
    "page": 1, //不支持分页可以先设置为空。
    "pagenum": 10
  }
  @observable queryStandardDataList = [];
  @observable DataListColumn=[]
  DataListColumns=[
    {type: 'string', id: 'name', label: '标准名称'},
    {type: 'string', id: 'policyexpensetypeName', label: '标准类型'},
    {type: 'string', id: 'plantseattypeName', label: '坐席'},
    {type: 'string', id: 'deptsName', label: '部门'},
    {type: 'string', id: 'postsName', label: '职务'},
    {type: 'string', id: 'ranksName', label: '职级'}
  ]
  @observable deptsIsShow = true
  @action systemIsNc(){
    let that = this
    $.ajax({
        type: "POST",
        url: Config.stdreimburse.systemIsNc,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: data => {
          if(Number(data.code)===1){
            let DataListColumn = []
            that.DataListColumns.forEach((item,index)=>{
              if(item.id != 'deptsName'){
                DataListColumn.push(item)
              }
            })
            that.DataListColumn = Object.assign([],DataListColumn)
            that.deptsIsShow = false
          }else{
            that.DataListColumn = Object.assign([],that.DataListColumns)
            that.deptsIsShow = true

          }
        },
        error: (xhr, status, err) => {
        }
      })
  }
  @observable ShipList = [
    {id:"steamer_01",name:"贵宾舱"},
    {id:"steamer_02",name:"特等舱"},
    {id:"steamer_03",name:"一等舱"},
    {id:"steamer_04",name:"二等A"},
    {id:"steamer_05",name:"二等B"},
    {id:"steamer_06",name:"三等A"},
    {id:"steamer_07",name:"三等B"},
    {id:"steamer_08",name:"四等A"},
    {id:"steamer_09",name:"四等B"}
  ]

  @observable items = 1;

  @observable activePage = 1;

  //查询接口
  @action
  queryStandardData(){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.stdreimburse.querystandarddata,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(this.queryStandardDataParame),
      // contentType: "application/x-www-form-urlencoded",
      // data: this.queryStandardDataParame,
      success: data => {
        that.globalStore.hideWait();
        console.log(data);
        if (data.success) {
          that.queryStandardDataList = Object.assign([],data.data.map((item)=>{
            item.policyexpensetypeName = item.policyexpensetype&&item.policyexpensetype.name ? item.policyexpensetype.name : '';
            let plantseattype =  item.seattype ? item.seattype.map((p)=>{
              return p.name
            }) : [];
            let depts = item.depts ? item.depts.map((p)=> {
              return p.name
            }) : [];
            let posts = item.posts ? item.posts.map((p)=> {
              return p.name
            }) : [];
            let ranks = item.ranks ? item.ranks.map((p)=> {
              return p.name
            }) : [];
            item.plantseattypeName = plantseattype.join(',');
            item.deptsName = depts.join(',');
            item.postsName = posts.join(',');
            item.ranksName = ranks.join(',');
            return item;
          }))
          that.items=Math.ceil(data.totalnum/data.pagenum)
          that.activePage = data.page
        }else{
          that.globalStore.showError(data.message?data.message:"查询失败")
        }
      },
      error: (xhr, status, err) => {
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    })
  }

  //删除接口
  @action
  deleteStandardData(data){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.stdreimburse.delstandarddata,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      // contentType: "application/x-www-form-urlencoded",
      // data: data, //{standardids:[pk1]}
      success: data => {
        that.globalStore.hideWait();
        if (data.success) {
          that.queryStandardData();
        }else{
          that.globalStore.showError(data.message?data.message:"查询失败")
        }
      },
      error: (xhr, status, err) => {
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
      }
    });
  }

  //保存接口
  @action
  saveStandardData(data,callback){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.stdreimburse.savestandarddata,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalStore.hideWait();
        if (data.success) {
          that.queryStandardData();
          callback(1)
        }else{
          that.globalStore.showError(data.message?data.message:"保存失败")
          callback(0)
        }
      },
      error: (xhr, status, err) => {
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
        callback(0)
      }
    })
  }

  //更新接口
  @action
  updateStandardData(data,callback){
    var that =this;
    that.globalStore.showWait();
    $.ajax({
      type: "POST",
      url: Config.stdreimburse.updatestandarddata,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: data => {
        that.globalStore.hideWait();
        if (data.success) {
          that.queryStandardData();
          callback(1)
        }else{
          that.globalStore.showError(data.message?data.message:"更新失败")
          callback(0)
        }
      },
      error: (xhr, status, err) => {
        that.globalStore.hideWait();
        this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
        callback(0)
      }
    })
  }


}
