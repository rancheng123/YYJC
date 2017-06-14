import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import LazyLoad from '../../src/index';
import Widget from '../../src/Widget';
import _ from 'underscore';
import classNames from 'classnames';
//引入公共部分组件语法import...from....
import Title from '../../module/navTitle/navTitle';             //引入头部及导航组件
import ProjectList from '../../module/projectList/projectList';//引入项目列表组件
import Banner from '../../module/banner/banner';                //引入banner组件
import Trundle from '../../module/trundle/trundle';              //引入消息轮播组件
//import Button from '../../../scss/button/button';                //引入按钮组件
//import Input from '../../module/input/input'                     //引入按钮的组件
import {Result , RefreshControl, ListView , SwipeAction , Progress , Steps,NoticeBar, Icon, Card, WingBlank, WhiteSpace  , Carousel , Accordion, List ,Grid ,Tag , ActivityIndicator ,Popup, Button, InputItem} from 'antd-mobile';          //蚂蚁金服插件
import { Modal ,Toast} from 'antd-mobile';
/* 自定义验证 start*/
import Validate from '../../widget/react-validate/react-validate';
/*模块  start*/
import Brands from '../../module/brandList/brandList';
import ImagePickerExample from '../../widget/imagePicker/imagePicker'
import Picker from '../../widget/picker/picker';
import globalData from './data'
//import AntdTest from './antdTest';
//导入样式 start
//引入scss语法 import...跟样式文件位置
import '../../../scss/base/common.scss';
import './projectList.scss';
//导入样式 end
//定义组件语法class ... extends Component{...}
var _that=null;
class projectList extends Component {
    //_that = this;
    constructor(){
        super();
    };
    componentWillMount(){
        //在此处初始化状态
        this.state={
            dataList: [],

            form: {
                name: '',
                price: '',
                store: '',
                area: {
                    id: [],
                    value: ['请选择']
                },
                imgList:  [{
                    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
                    id: '2121',
                }, {
                    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
                    id: '2122',
                }],
                password: '',
                confirmPassword: '',
                brand: ''
            },
            brandList: [],

            listView: {
                data: [],
                visible: false,
                currentPage: 0
            }
        }
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
    cityList(){
        alert("请选择城市11111")
    }
    render(){
        var that = this;
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
                <ErrorOrSuce $id="success"></ErrorOrSuce>
                <div>
                    <Validate ref="validator" $id="module3_validate" onError={(obj)=>{
                        //console.error('元素'+rule+'验证未通过')
                        Modal.alert('提示',obj.errorMsg, [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                        ])


                        {/*Toast.info(obj.errorMsg, 2);*/}
                    }}>
                        <div>
                            姓名： <input type="text" value={that.state.form.name}
                                       onChange={(obj)=>{
                                           that.state.form.name = obj.target.value;
                                           componentStore.update(that,that.state)
                                       }}
                                       data-validName="name"
                                       data-validRules={[{
                                           name: 'require'
                                       }]}
                                       data-validMsgPrefix={'姓名：'} 
                                       placeholder={'请输入姓名'}
                                       />

                        </div>

                        <div>
                            价格： <input type="text"  value={that.state.form.price}
                                       onChange={(obj)=>{
                                           that.state.form.price = obj.target.value;
                                           componentStore.update(that,that.state)
                                       }}

                                       data-validName="price"
                                       data-validRules={[
                                           {
                                               name: 'require'
                                           }
                                       ]}
                                       data-validMsgPrefix={'价格：'}/>

                        </div>

                        <div>
                            库存： <input type="text"  value={that.state.form.store}
                                       onChange={(obj)=>{
                                           that.state.form.store = obj.target.value;
                                           componentStore.update(that,that.state)
                                       }}

                                       data-validName="store"
                                       data-validRules={[{
                                           name: 'isIntGt0'
                                       },{
                                               name: 'require'
                                           }
                                       
                                       ]}
                                       data-validMsgPrefix={'库存：'}/>

                        </div>

                        <div>
                            密码： <input type="text" value={that.state.form.password}
                                       onChange={(obj)=>{
                                           that.state.form.password = obj.target.value;
                                           componentStore.update(that,that.state)
                                       }}

                                       data-validName="password"
                                       data-validRules={[{
                                           name: 'require'
                                       },{
                                           name: 'equal',
                                           params: {
                                               name: 'confirmPassword',
                                               chinese: '确认密码'
                                           }
                                       }]}
                                       data-validMsgPrefix={'密码：'}/>

                        </div>
                        <div>
                            确认密码： <input type="text"  value={that.state.form.confirmPassword}
                                         onChange={(obj)=>{
                                             that.state.form.confirmPassword = obj.target.value;
                                             componentStore.update(that,that.state)
                                         }}

                                         data-validName="confirmPassword"
                                         data-validRules={[{
                                             name: 'require'
                                         }]}
                                         data-validMsgPrefix={'确认密码：'}/>

                        </div>

                        

                       
                        <div>
                            <input type="button" value="下一步" onClick={()=>{

                                Utils.eventHanlder(function(){


                                    that.refs.validator.validate({
                                        callback: function(res){
                                            if(res){
                                                console.log('通过');
                                            }
                                        }
                                    });

                                })


                            }}/>

                            <input type="button" value="验证单个" onClick={()=>{
                                that.refs.validator.validate({
                                    eleName: 'name',
                                    callback: function(res){
                                        if(res){
                                            console.log('通过')
                                        }
                                    }
                                });
                            }}/>
                        </div>

                    </Validate>
                </div>
            </div>

        )
    }
};
// //定义一个验证类
//  var Validation = {  
//      iphone:function(value,reg){
//          var st;//state的简写 代表状态
//         if(!reg.test(value)){
//             st=false;
//         }
//         return st;
//      }
//  }
//  //简单定义一个input组件
//  class FristInput extends Component{
//     constructor(){
//         super()
//     }
//     componentWillMount(){
//         this.state={
//             _value:'',
//             st :false
//         }
//         //var sta = this.state.st;
//     }
//     componentDidMount(){
//         componentStore.set(this);
//     }
//     componentWillUnmunt(){
//         componentStore.clear(this);
//     }
//     thisVal(value){
//         //componentStore.update(this,this.state._value);
//         this.setState({_value:value})
//     }
//     handChange(e){
//         //this.setState({_value:e.target.value});
//         //console.log(e.target.value);
//         this.thisVal(e.target.value);
//     }
//     //失去光标回调
//     inputBlur(){
//         //this.props.inputFocus();
//         let phone = this.state._value;
//         let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则  验证手机号13、 14、 15、 17、 18开头
//         let iphone = reg.test(phone);
//         //var length = this.state._value.length == 11;
//         //console.log(this.state._value);
//         console.log(phone);
//         if(!iphone){
//             alert('您输入的手机号有误！');
//             this.setState({st:!this.state.st});
//         }else{
//             // this.setState({
//             //     _value:this.state._value
//             // })
//             alert('恭喜您成功！')
//         }
        
//     }
//     //得到光标
    
//     inputFoucs(){
//          this.setState({st:false})
//     }
//     render(){
//         //console.log(this.state._value)
//         console.log(this.state.st);
//         return (
//             <div className="inpit_div">
//                 <input type="text" onChange={this.handChange.bind(this)} value={this.state._value} onBlur={this.inputBlur.bind(this)} onFocus={this.inputFoucs.bind(this)} />
//                 <div style={{display:this.state.st? 'block' : 'none'}}>手机号有误</div>
//             </div>
//         );
//     }
//  }











//一个页面只能抛出一个默认组件
export default projectList;
 //成功失败页面
class ErrorOrSuce extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

    }
    componentDidMount(){
        componentStore.set(this)
    }
    componentWillUnmount(){
        componentStore.clear(this)
    }
    render(){
        return (
            <div>
                <div className="result-example">
                    {/*<div className="sub-title">支付成功</div>
                    <Result
                        img={<Icon type={require('../../../image/svg/success.svg')} className="icon" />}
                        title="支付成功"
                        message={<div><div style={{ fontSize: '0.72rem', color: '#000', lineHeight: 1 }}>998.00</div><del>1098元</del></div>}
                    />
                    <WhiteSpace />*/}
                    <Result
                        img={<Icon type="check-circle" className="icon" style={{ fill: '#1F90E6' }} />}
                        title="验证成功"
                        message="所提交内容已成功完成验证"
                    />
                    <WhiteSpace />
                    {/* 
                    <div className="sub-title">支付失败</div>
                    <Result
                        img={<Icon type="cross-circle-o" className="icon" style={{ fill: '#F13642' }} />}
                        title="支付失败"
                        message="所选银行卡余额不足"
                    />
                    <WhiteSpace />
                    <div className="sub-title">等待处理</div>
                    <Result
                        img={<Icon type={require('../../../image/svg/wait.svg')} className="icon" />}
                        title="等待处理"
                        message="已提交申请，等待银行处理"
                    />
                    <WhiteSpace />
                    <div className="sub-title">操作失败</div>
                    <Result
                        img={<Icon type={require('../../../image/svg/operateError.svg')} className="icon" />}
                        title="操作失败"
                        message="由于你的XXX原因请您联系客服010-01000000"
                    />*/}
                </div>
            </div>
        )
    }
}