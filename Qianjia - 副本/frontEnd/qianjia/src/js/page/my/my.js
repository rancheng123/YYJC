import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import LazyLoad from '../../src/index';
import Widget from '../../src/Widget';
import _ from 'underscore';
import classNames from 'classnames';
//引入公共部分组件语法import...from....
import Title from '../../module/navTitle/navTitle';             //引入头部及导航组件
import ProjectList from '../../module/projectList/projectList';//引入项目列表组件
import { Result, RefreshControl, Picker, ListView, SwipeAction, Progress, Steps, NoticeBar, Icon, Card, WingBlank, WhiteSpace, Carousel, Accordion, List, Grid, Tag, ActivityIndicator, Popup, Button, InputItem } from 'antd-mobile';          //蚂蚁金服插件
import Modal from '../../module/modal/modal'                      //弹窗提示组件

//导入样式 start
//引入scss语法 import...跟样式文件位置
import '../../../scss/base/common.scss';
import './my.scss';
//导入样式 end
//定义组件语法class ... extends Component{...}
var _that = null;
class My extends Component {
    constructor() {
        super();
        this.state = {
           
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
    handClick() {
        this.setState({
            btnSt: true
        })
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
    //to myInvest（跳转我的投资页面）
    toMyInvest(){
        //alert('1')
        Utils.switchRoute('/myInvest')
    }
    //row列表组件跳转
    rowBank(){
        alert('绑定银行卡---正在开发中')
    }
    rowyouhuiquan(){
        alert('优惠券---正在开发中')
    }
    rowmyzengpin(){
        alert('我的赠品---正在开发中')
    }
    rowxiaoxi(){
        alert('消息中心---正在开发中')
    }
    rowsetting(){
        alert('设置---正在开发中')
    }
    render() {
        return (
            <div>
                <div className="home clearfix">
                    <Title
                        title={"我的"}
                        $id="navTitle"
                        munIng={require("../../../image/mbtn.png")}
                        addr={""}
                        citys={this.cityList}
                        grade="1"
                        grade_child="3"
                        toInvestPage={this.investPage.bind(this)}
                        toHomePage={this.homePage.bind(this)}
                        toMyPage={this.myPage.bind(this)}
                    >
                    </Title>
                    <div className="login_baner">
                        <img src={require('../../../image/login_bg.png')} alt="" />
                        <div className="my_top">
                            <ul>
                                <li><img src={require('../../../image/my_logo.jpg')} alt="" /></li>
                                <li>17792396855</li>
                            </ul>
                        </div>
                        <div className="my_center_c">
                            <h3>10</h3>
                            <div>预期总资产(元)</div>
                        </div>
                        <div className="my_center_r" onTouchStart={this.toMyInvest.bind(this)}>
                            <img src={require('../../../image/icon/right_icon_fff.png')} alt="" />
                        </div>
                        <div className="my_bottom">
                            <ul>
                                <li>
                                    <h4>100元</h4>
                                    <div>待还本金(元)</div>
                                </li>
                                <li>
                                    <h4>10元</h4>
                                    <div>累计收益(元)</div>
                                </li>
                                <li>
                                    <h4>2元</h4>
                                    <div>预期收益(元)</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="rowList">
                    <div className="rows">
                        <RowBtn rowTitle="银行卡绑定" leftIcon={require('../../../image/icon/my_bank.png')} rowTochStart={this.rowBank.bind(this)} isShow="none"></RowBtn>
                    </div>
                    <div className="rows">
                        <RowBtn rowTitle="我的优惠券" leftIcon={require('../../../image/icon/my_bank.png')} rowTochStart={this.rowyouhuiquan.bind(this)} isShow="none"></RowBtn>
                    </div>
                    <div className="rows">
                        <RowBtn rowTitle="我的赠品" leftIcon={require('../../../image/icon/my_bank.png')} rowTochStart={this.rowmyzengpin.bind(this)} isShow="none"></RowBtn>
                    </div>
                    <div className="rows">
                        <RowBtn rowTitle="消息中心" leftIcon={require('../../../image/icon/my_bank.png')} rowTochStart={this.rowxiaoxi.bind(this)} isShow="inline-block"></RowBtn>
                    </div>
                    <div className="rows">
                        <RowBtn rowTitle="设置" leftIcon={require('../../../image/icon/my_bank.png')} rowTochStart={this.rowsetting.bind(this)} isShow="none"></RowBtn>
                    </div>
                </div>
                <div className="metor">
                    <img src={require('../../../image/metor.png')} alt=""/>
                </div>
            </div>

        )
    }
};
//列表条组件
class RowBtn extends Component {
    constructor() {
        super()
    }
    componentWillMount() {

    }
    compomemtDidMount() {
        componentStore.set(this)
    }
    componentWillUnmount() {
        componentStore.clear(this)
    }
    rowHref(){
        this.props.rowTochStart();
    }
    render() {
        return (
            <div className="rowContent">
                <ul className="rowBtn">
                    <li>
                        <div><img src={this.props.leftIcon} alt="" /></div>
                    </li>
                    <li>
                        {this.props.rowTitle} <span style={{display:this.props.isShow}}></span>
                    </li>
                    <li onTouchStart={this.rowHref.bind(this)}>
                        <div><img src={require('../../../image/icon/right_icon.png')} alt="" /></div>
                    </li>
                </ul>
            </div>
        )
    }
}
//一个页面只能抛出一个默认组件
export default My;
