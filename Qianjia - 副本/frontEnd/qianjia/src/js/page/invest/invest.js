import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import LazyLoad from '../../src/index';
import Widget from '../../src/Widget';
import _ from 'underscore';
import classNames from 'classnames';
//引入公共部分组件语法import...from....
import Title from '../../module/navTitle/navTitle';             //引入头部及导航组件
import ProjectList from '../../module/projectList/projectList';//引入项目列表组件
import {Result , RefreshControl, Picker, ListView , SwipeAction , Progress , Steps,NoticeBar, Icon, Card, WingBlank, WhiteSpace  , Carousel , Accordion, List ,Grid ,Tag , ActivityIndicator ,Popup, Button, InputItem} from 'antd-mobile';          //蚂蚁金服插件
import Modal from '../../module/modal/modal'                      //弹窗提示组件

//导入样式 start
//引入scss语法 import...跟样式文件位置
import '../../../scss/base/common.scss';
import './invest.scss';
//导入样式 end
//定义组件语法class ... extends Component{...}
var _that=null;
class Invest extends Component {
    constructor(){
        super();
        this.state={
            text:'',
            val1:'',
            val2:'',
            val3:'',
            text:"我是初始值----哈哈",
            data: [],
            cols: 1,
            pickerValue: [],
            asyncValue: [],
            incomeData: [],
            incomePickerValue: [],
            incomeAsyncValue: [],
            timeData:[],
            timePickerValue: [],
            timeAsyncValue: [],

        }
    };
    componentWillMount(){
        _that = this;
    }
    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end
    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    handClick(){
        this.setState({
            btnSt:true
        })
    }
    //二级导航跳转
    homePage(){
        Utils.switchRoute('/home')
    }
    investPage(){
        Utils.switchRoute('/invest')
    }
    myPage(){
       Utils.switchRoute('/my')
    }
    //过滤器
    //下拉事件
    changeValues(val1,val2,val3){
        var valStr='';
        if(val1==''&& val2==''&& val3==''){
            valStr='展示全部数据'
        }else if(val1==''&& val2==''&& val3 !=''){
            valStr="3个月内---年化收益率不限--"+val3
        }else if(val1==''&& val2 !=''&& val3 !=''){
            valStr="3个月内--"+val2+"--"+val3
        }else if(val1 !=''&& val2 !=''&& val3 !=''){
            valStr=val1+"---"+val2+"---"+val3;
        }else if(val1 !=''&& val2 ==''&& val3 !=''){
            valStr=val1+"---不限制收益率---"+val3
        }else if(val1 !=''&& val2 ==''&& val3 ==''){
            valStr=val1+"--不限制收益率--项目期限不限"
        }else if(val1 !=''&& val2 !=''&& val3 ==''){
            valStr=val1+"--"+val2+"--项目期限不限"
        }else if(val1==''&& val2 !=''&& val3==''){
            valStr="3个月内--"+val2+"--项目期限不限"
        }
        this.setState({
            text:valStr
        })
    }
    //最新
    onPickerChange (val) {//选择下拉触发change同步到选择区
        //const str="我是变更后的值---";
        componentStore.update(_that,{
            bankValue:val //存储所选择的值
        })
        let colNum = 1;
        const bank = [...this.state.data];
        const asyncValue = [...val];
        this.setState({
            data: bank,
            cols: colNum,
            asyncValue,
        });
        console.log(this.state.bankValue[0]);
        this.setState({
            val1:this.state.bankValue[0]
        })
        this.changeValues(this.state.bankValue[0],this.state.val2,this.state.val3);
    };
    onClick (){
        var _this = this;
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module1/test_search2',
            method: 'POST',
            data: {
                a: 1,
                b: 2
            },
            callback: function(data){
                console.log("data--:"+ JSON.stringify(data.dataList.dataA));
                componentStore.update(_this,{
                    data: data.dataList.dataA
                })

                //console.log(data)
            }
        });
    };
    //年化收益率
    incomeOnPickerChange(val) {//选择下拉触发change同步到选择区
        //console.log(val);
        componentStore.update(_that,{
            bankValue:val //存储所选择的值
        })
        let colNum = 1;
        const bank = [...this.state.incomeData];
        const incomeAsyncValue = [...val];
        this.setState({
            incomeData: bank,
            cols: colNum,
            incomeAsyncValue,
        });
        console.log(this.state.bankValue[0]);
        this.setState({
            val2:this.state.bankValue[0]
        })
        this.changeValues(this.state.val1,this.state.bankValue[0],this.state.val3);
    };
    incomeOnClick (){
        var _this = this;
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module1/test_search2',
            method: 'POST',
            data: {
                a: 1,
                b: 2
            },
            callback: function(data){
                console.log("data--:"+ JSON.stringify(data.dataList.dataB));
                componentStore.update(_this,{
                    incomeData: data.dataList.dataB
                })

                //console.log(data)
            }
        });
    };
    //期限过滤
    timeOnPickerChange(val) {//选择下拉触发change同步到选择区
        //console.log(val);
        componentStore.update(_that,{
            bankValue:val //存储所选择的值
        })
        let colNum = 1;
        const bank = [...this.state.timeData];
        const timeAsyncValue = [...val];
        this.setState({
            timeData: bank,
            cols: colNum,
            timeAsyncValue,
        });
        console.log(this.state.bankValue[0]);
        this.setState({
            val3:this.state.bankValue[0]
        })
        this.changeValues(this.state.val1,this.state.val2,this.state.bankValue[0]);
    };
    timeOnClick (){
        var _this = this;
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module1/test_search2',
            method: 'POST',
            data: {
                a: 1,
                b: 2
            },
            callback: function(data){
                console.log("data--:"+ JSON.stringify(data.dataList.dataC));
                componentStore.update(_this,{
                    timeData: data.dataList.dataC
                })

                //console.log(data)
            }
        });
    };
    render(){
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        /*console.log("btnSt----:"+this.state.btnSt);*/

        return (
            <div>
                <div className="home clearfix">
                    <Title
                        title={"投资"}
                        $id="navTitle"
                        munIng={require("../../../image/mbtn.png")}
                        addr={""}
                        citys={this.cityList}
                        grade="1"
                        grade_child="2"
                        toInvestPage={this.investPage.bind(this)}
                        toHomePage={this.homePage.bind(this)}
                        toMyPage={this.myPage.bind(this)}
                    >
                    </Title>
                </div>
                <ul className="table_title">
                    <li className="invest">
                        <Picker
                            data={this.state.data}
                            cols={this.state.cols}
                            value={this.state.asyncValue}
                            extra="最热项目"
                            onPickerChange={this.onPickerChange.bind(this)}
                        >
                            <List.Item  onClick={this.onClick.bind(this)}>
                            </List.Item>
                        </Picker>
                    </li>
                    <li className="invest">
                        <Picker
                            data={this.state.incomeData}
                            cols={this.state.cols}
                            value={this.state.incomeAsyncValue}
                            extra="预期年化收益率"
                            onPickerChange={this.incomeOnPickerChange.bind(this)}
                        >
                            <List.Item  onClick={this.incomeOnClick.bind(this)}>
                            </List.Item>
                        </Picker>
                    </li>
                    <li className="invest"> 
                        <Picker
                            data={this.state.timeData}
                            cols={this.state.cols}
                            value={this.state.timeAsyncValue}
                            extra="项目期限"
                            onPickerChange={this.timeOnPickerChange.bind(this)}
                        >
                            <List.Item  onClick={this.timeOnClick.bind(this)}>
                            </List.Item>
                        </Picker>
                    </li>
                </ul>
                <div className="text_content">{this.state.text}</div>
            </div>

        )
    }
};

//一个页面只能抛出一个默认组件
export default Invest;
