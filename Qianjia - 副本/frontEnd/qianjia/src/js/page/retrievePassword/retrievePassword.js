/*
 * Created by 李永帅 on 2017/4/12.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
/* 蚂蚁金服框架核心 */
import { Picker, List,  Toast, WhiteSpace , WingBlank, InputItem} from 'antd-mobile';
/* 蚂蚁金服的form组件 */
import { createForm } from 'rc-form';
/* 导航组件 */
/* 引入导航组件 */
import Title from '../../module/navTitle/navTitle';
/* 按钮组件 */
import Button from '../../../scss/button/button';
//导入样式 start
import './retrievePassword.scss'
//导入样式 end
var _that=null;
var codeTime=null;
class retrievePassword extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        _that=this;//变更this指向（备用）
        //在此处初始化状态
        this.state={
            phoneError:false,
            phoneValue:'',
            codeError:false,
            codeValue:'',
           // countTime:'60',//code初始时间
            codeTetx:"获取验证码",
            isCode:true,
            firstPassError:false,
            firstPassValue:'',
            lastPassError:false,
            lastPassValue:'',
            backStageError:false,
            backStageValue:''

        }
    }
    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end
    };
    componentWillUnmount(){
        // 清除 start
        //clearInterval(codeTime)
        componentStore.clear(this);
        // 清除 end
    };
    retreat(){
        //alert('返回上一页面');
        //路由跳转
        Utils.switchRoute('/login');
        clearInterval(codeTime);
    };
    //手机号失去焦点
    phoneBlur(){
        //console.log(_that)
        let phone=this.value;
        let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则  验证手机号13、 14、 15、 17、 18开头
        let IsPhone=reg.test(phone);
        if(!phone){
            componentStore.update(_that,{
                phoneError:true
            })
            console.log('1')
            Toast.info('请输入手机号！', 1);
        }else{
            if(IsPhone){
                //console.log('长度',phone.length)
                componentStore.update(_that,{
                    phoneValue:phone //存储输入的合法手机号
                })

            }else{
                componentStore.update(_that,{
                    phoneError:true
                })
                Toast.info('手机号不合法！', 1);
            }

        }
    };
    //手机号得到焦点
    phoneFocus(){
        componentStore.update(_that,{
            phoneError:false
        })
    };
    //后台验证码
    //失去焦点
    backStageBlur(){
        if(!_that.state.backStageValue){
            componentStore.update(_that,{
                backStageError:true
            })
            Toast.info("验证码不能为空！",1)
        }
    }
    //得到焦点
    backStageFocus(){
        componentStore.update(_that,{
            backStageError:false
        })
    }
    //backstageCode 后台的验证码
    backstageCode(){
        alert('后台返回验证码');
    }
    //获取验证码code
    codeBlur(){
        let code=this.value;
        let reg =/^[0-9]*$/ ;
        let codeV=reg.test(code);
        if(!code){
            componentStore.update(_that,{
                codeError:true
            })
            Toast.info('请输入验证码！', 1);
        }else{
            if(codeV){
                componentStore.update(_that,{
                    codeValue:code //存储输入的验证码
                })
                //此处是后台与后台对接 ajax

                //后台返回的状态 错误时 提示
                //Toast.info('验证码输入错误！', 2);
            }
        }
        //console.log('输入的验证码为：',code)
    };
    codeFocus(){
        componentStore.update(_that,{
            codeError:false
        })
    }
    //code倒计时

    countTime(){
        componentStore.update(_that,{
            isCode:false
        })
        var count = 60;
         codeTime = setInterval(function(){
            count--;
            //console.log("倒计时",count)
            //console.log(_that)
            /*componentStore.update(_that,{
                codeText:count+"秒"
            })*/
            _that.setState({
                codeTetx:count+"秒"
            })
            if(count<=0){
                /*componentStore.update(_that,{
                    codeText:"获取验证码",
                    isCode:true
                })*/
                _that.setState({
                    codeTetx:"获取验证码",
                    isCode:true
                })
                clearInterval(codeTime)//清除定时器
            }
        },1000)
    }
    //code获取验证码
    codeBtn(){
        let phoneVal = _that.state.phoneValue;
        let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则  验证手机号13、 14、 15、 17、 18开头
        let codeV=reg.test(phoneVal);
        if(phoneVal){
                //alert('OK')
            if(codeV){
                //alert('合法！')
                if(_that.state.isCode){//code状态
                    _that.countTime();//启动定时器
                    Toast.info('发送成功！',1)
                }else{
                    //console.log('1分钟内只能获取一次');
                    Toast.info('1分钟内只能获取一次', 2);
                }
            }else {
                componentStore.update(_that,{
                    phoneError:true
                })
                Toast.info('手机号不合法',1)

            }
        }else{
            Toast.info('手机号不能为空！',1)
        }
        

    }
    //首次输入密码
    firstPassBlur(){
        //alert('1')
        let regPassword = /(?!^[0-9]+$)(?!^[a-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;//密码规则
        let passVal=this.value;
        let pass = regPassword.test(passVal);
        if(pass){
            componentStore.update(_that,{
                firstPassValue:passVal //存储输入的合法密码
            })
        }else{
            componentStore.update(_that, {
                firstPassError: true
            })
            Toast.info('请输入合法的密码！', 1);
        }
    };
    firstPassFocus(){
        componentStore.update(_that,{
            firstPassError:false
        })
    }
    //再次输入密码
    lastPassBlur(){
        //alert('1')
        let passVal=this.value;
        let firstPass = _that.state.firstPassValue;
        let lastPass = this.value;
        if(passVal){
            if(firstPass == lastPass){
                componentStore.update(_that,{
                    lastPassValue:lastPass //存储输入的合法密码
                })
            }else{
                componentStore.update(_that, {
                    lastPassError: true
                })
                Toast.info('您两次输入的密码不一致', 1);
            }
        }else{
            componentStore.update(_that, {
                lastPassError: true
            })
            Toast.info('再次输入的密码不能为空！', 2);
        }
    };
    lastPassFocus(){
        componentStore.update(_that,{
            lastPassError:false
        })
    }
    //重置按钮
    retrieveClick(){
        //防止恶意用户
        //再次判断用户手机号
        let phone=_that.state.phoneValue;
        let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则  验证手机号13、 14、 15、 17、 18开头
        let IsPhone=reg.test(phone);
        if(phone != ''){
            if(!IsPhone ){
                Toast.info('手机号不合法！', 1);
                componentStore.update(_that,{
                    phoneError:true
                })
                return false;
            }
        }else{
            Toast.info('手机号不能为空！', 1);
            componentStore.update(_that,{
                phoneError:true
            })
            return false;
        }
        //再次判断后台验证码
        if(!_that.state.backStageValue){
            Toast.info('验证码不能为空！',1);
            componentStore.update(_that,{
                backStageError:true
            })
            return false;
        }
        //再次判断验证码
        if(_that.state.codeValue == ''){
            componentStore.update(_that,{
                codeError:true
            })
            Toast.info('验证码不能为空！', 1);
            return false;
        }
        //再次判断首次设置的密码
        let regPassword = /(?!^[0-9]+$)(?!^[a-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;//密码规则
        let firstPass=_that.state.firstPassValue;
        let pass = regPassword.test(firstPass);
        if(firstPass !=''){
            if(!pass){
                componentStore.update(_that,{
                    firstPassError:true
                })
                Toast.info('设置密码不合法！', 1);
                return false;
            }
        }else{
            componentStore.update(_that,{
                firstPassError:true
            })
            Toast.info('密码不能为空！', 1);
            return false;
        }
        //再次判断再次输入的密码
        let lastPass = _that.state.lastPassValue;
        if(lastPass != ''){
            if(firstPass != lastPass){
                componentStore.update(_that,{
                    lastPassError:true
                })
                Toast.info('您两次输入的密码不一致！', 2);
                return false;
            }
        }else{
            componentStore.update(_that,{
                lastPassError:true
            })
            Toast.info('再次输入的密码不能为空！', 2);
            return false;
        }

        Toast.info('恭喜您完成！等待后台提供接口交互！', 5);
        //每个输入框的值：
        console.log("手机号：",phone);
        console.log("验证码：",_that.state.codeValue);
        console.log("首次密码：",firstPass);
        console.log("第二次密码：",lastPass);

        //在此处写ajax与后台交互
    }
    render(){
        const { getFieldProps } = this.props.form;
        return (
             <div>
                 <Title $id="lys_form"
                        title="找回密码"
                        retreat={this.retreat}
                        grade="2"
                 >
                 </Title>
                <div className="retrieve">
                    <div className="retrieve_title"></div>
                    <div className="retrieve_list">
                        <ul>
                            <li>
                                <div className="_left">
                                    <div className="_img">
                                        <img src={require('../../../image/icon/register_phone.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast">
                                    <div className="_right_C">
                                        <InputItem
                                            {...getFieldProps('phone')}
                                            type="number"
                                            placeholder="请填写手机号"
                                            onBlur={this.phoneBlur}
                                            error={this.state.phoneError}
                                            onFocus={this.phoneFocus}
                                            value={this.state.phoneValue}
                                            onChange={(value)=>{
                                                this.state.phoneValue = value;
                                                componentStore.update(this,this.state)
                                            }}
                                        >
                                        </InputItem>
                                    </div>
                                </div>
                            </li>
                            <li style={{display:_that.state.backStage}}>
                                <div className="_left">
                                    <div className="_img">
                                        <img src={require('../../../image/icon/register_code.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast _right_C">
                                    <div className="code_input">
                                        <InputItem
                                            {...getFieldProps('code')}
                                            type="text"
                                            placeholder="请输入右侧验证码"
                                            onBlur={this.backStageBlur}
                                            error={this.state.backStageError}
                                            onFocus={this.backStageFocus}
                                            value={this.state.backStageValue}
                                            onChange={(value)=>{
                                                this.state.backStageValue = value;
                                                componentStore.update(this,this.state)
                                            }}
                                        >
                                        </InputItem>
                                    </div>
                                    <div className="_center code_btn">
                                        <button className="countBtn" onTouchStart={this.backstageCode}>后台验证码</button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="_left">
                                    <div className="_img">
                                        <img src={require('../../../image/icon/register_code.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast _right_C">
                                    <div className="code_input">
                                        <InputItem
                                            {...getFieldProps('code')}
                                            type="number"
                                            placeholder="请输入验证码"
                                            onBlur={this.codeBlur}
                                            error={this.state.codeError}
                                            onFocus={this.codeFocus}
                                            value={this.state.codeValue}
                                            onChange={(value)=>{
                                                this.state.codeValue = value;
                                                componentStore.update(this,this.state)
                                            }}
                                        >
                                        </InputItem>
                                    </div>
                                    <div className="_center code_btn">

                                        <button className="countBtn" onTouchStart={this.codeBtn}>{this.state.codeTetx}</button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="_left">
                                    <div className="_img">
                                        <img src={require('../../../image/icon/register_password.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast">
                                    <div className="_right_C">
                                        <InputItem
                                            {...getFieldProps('firstPassWord')}
                                            type="password"
                                            placeholder="设置登录密码"
                                            error={this.state.firstPassError}
                                            onBlur={this.firstPassBlur}
                                            onFocus={this.firstPassFocus}
                                            value={this.state.firstPassValue}
                                            onChange={(value)=>{
                                                this.state.firstPassValue = value;
                                                componentStore.update(this,this.state)
                                            }}
                                        >
                                        </InputItem>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="_left">
                                    <div className="_img">
                                        <img src={require('../../../image/icon/register_password.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast">
                                    <div className="_right_B">
                                        <InputItem
                                            {...getFieldProps('lastPassWord')}
                                            type="password"
                                            placeholder="重复密码"
                                            error={this.state.lastPassError}
                                            onBlur={this.lastPassBlur}
                                            onFocus={this.lastPassFocus}
                                            value={this.state.lastPassValue}
                                            onChange={(value)=>{
                                                this.state.lastPassValue = value;
                                                componentStore.update(this,this.state)
                                            }}
                                        >
                                        </InputItem>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="not_btn">
                        <button className="not_password">密码为6~16位字母、数字组合</button>
                    </div>
                    <div className="retrieve_btm">
                        <div className="retrieve_btn">
                            <Button content="重置密码" click={this.retrieveClick} $id="retrieve" width="90%" lineH={0.85+'rem'} radius="8px" height={0.85+'rem'}></Button>
                        </div>
                    </div>
                </div>

             </div>
        )
    }

}
//const BasicInputExampleWrapper = createForm()(Forms);
const Global_retrievePassword = createForm()(retrievePassword);
export default Global_retrievePassword;
