import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import LazyLoad from '../../src/index';
import Widget from '../../src/Widget';
import _ from 'underscore';
import classNames from 'classnames';
//引入公共部分组件语法import...from....
import Title from '../../module/navTitle/navTitle'; //引入头部及导航组件
import ProjectList from '../../module/projectList/projectList'; //引入项目列表组件
import { SegmentedControl, Result, RefreshControl, Picker, ListView, SwipeAction, Progress, Steps, NoticeBar, Icon, Card, WingBlank, WhiteSpace, Carousel, Accordion, List, Grid, Tag, ActivityIndicator, Popup, Button, InputItem } from 'antd-mobile'; //蚂蚁金服插件
import Modal from '../../module/modal/modal' //弹窗提示组件

//导入样式 start
//引入scss语法 import...跟样式文件位置
import '../../../scss/base/common.scss';
import './myInvest.scss';
//导入样式 end
//定义组件语法class ... extends Component{...}
var _that = null;
class MyInvest extends Component {
    constructor() {
        super();
        this.state = {
            content: "投资中的数据。。。",
            lists:[{name:"投资中",id:"1"},{name:"还款中",id:"2"},{name:"已完成",id:"3"}],
            active:"1"
        }
    };
    componentWillMount() {
        _that = this;
    }
    componentDidMount() {
        // 存储 start
        componentStore.set(this);
        // 存储 end
    };
    componentWillUnmount() {
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    toBack() {
            //alert('返回');
            Utils.backRoute();
        }
        //二级导航跳转
    homePage() {
        Utils.switchRoute('/home')
    }
    investPage() {
        Utils.switchRoute('/invest')
    }
    myPage() {
            //alert('my');
            Utils.switchRoute('/my')
    }
    tabClick(e){
        console.log(e.target.getAttribute('data-id'))//getAttribute('data-id')
        this.setState({
            active:e.target.getAttribute("data-id")
        })
        if(e.target.getAttribute('data-id')=="1"){
            //此处是ajax数据请求,暂时以改变状态代替
            this.setState({
                content:"这是"+e.target.innerHTML+"的数据列表展示！"
            })
        }
        if(e.target.getAttribute('data-id')=="2"){
            this.setState({
                content:"这是"+e.target.innerHTML+"的数据列表展示！"
            })
        }
        if(e.target.getAttribute('data-id')=="3"){
            this.setState({
                content:"这是"+e.target.innerHTML+"的数据列表展示！"
            })
        }
    }
    render() {
        return (
            <div>
                <div className="home clearfix">
                    <Title
                        title={"我的投资"}
                        $id="navTitle"
                        munIng={require("../../../image/mbtn.png")}
                        addr={""}
                        retreat ={this.toBack.bind(this)}
                        grade="2"
                    >
                    </Title>
                    <Table_btn $id="Table_btn" tabclick={this.tabClick.bind(this)} active={this.state.active} lists={this.state.lists}></Table_btn>
                </div>
                <div className="myInvestCont">
                    {this.state.content}
                </div>
                <div>
                </div>
            </div>
        )
    }
};
export default MyInvest;

class Table_btn extends Component {
    constructor(){
        super();
    }
    componentWillMount(){

    }
    componentDidMount(){
        componentStore.set(this);
    }
    componentWillUnmount(){
        componentStore.clear(this)
    }
    tabToch(e){
        //console.log(e.target.getAttribute('data-id'))//getAttribute()获取dom节点的属性值
        this.props.tabclick(e);
        //console.log(e.target)
    }
    render(){
        //let classStr="table_btn_active";
        let lists=this.props.lists;
        let activeClass=this.props.active;
        console.log('activeClass',activeClass)
        return(
            <div className="table_btn">
                <ul>
                    {lists.map(function(item){
                    return(
                            <li key={item.id} data-id={item.id} className={item.id==activeClass? "table_btn_active" : ""}  onTouchStart={this.tabToch.bind(this)}>{item.name}</li>
                    )
                }.bind(this))}
                </ul>
            </div>
        )
    }
}