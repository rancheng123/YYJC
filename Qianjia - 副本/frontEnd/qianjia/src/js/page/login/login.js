/**
 * Created by 李永帅 on 2017/4/13 .
 */

import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
/* 引入input 组件 */
import Input from '../../module/input/input';
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
import './login.scss'
//导入样式 end
var _that=null;
var codeTime=null;
class Login extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        _that=this;
        //在此处初始化状态
        this.state={
            phoneError:false,
            phoneValue:'',
            firstPassError:false,
            firstPassValue:'',
            codeError:false,
            codeValue:'',
            countTime:'60',//code初始时间
            codeTetx:"获取验证码",
            isCode:true,
            loginState:'快捷登录',
            backStage:'none',//后台验证码状态
            backStageValue:'',
            backStageError:false,
            passState:'block',//密码状态
            initLogin:false,//默认登陆状态
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
    //跳转路由 跳转到找回密码
    toRetrievePassword(){
        //retrievePassword
        Utils.switchRoute('/retrievePassword');
    };
    retreat(){
        clearInterval(codeTime);//清除定时器
        alert('返回上一页面');
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
            Toast.info('您输入的手机号不能为空！', 1);
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
    //backstageCode 后台的验证码
    backstageCode(){
        alert('后台返回验证码');
    }
    //切换 登录状态
    loginStateBtn(){
        //clearInterval(codeTime);//清除定时器
        if(_that.state.initLogin){
            componentStore.update(_that,{
                initLogin:!_that.state.initLogin,
                backStage:"none",
                passState:'block',
                loginState:'快捷登录',
            })
            //clearInterval(codeTime);//清除定时器
        }else{
            componentStore.update(_that,{
                initLogin:!_that.state.initLogin,
                backStage:"block",
                passState:'none',
                loginState:'密码登录',
            })
        }
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
    //登录密码
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
    //快捷登录
    //backStage、code
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
    //code
    codeBlur(){
        if(!_that.state.codeValue){
            componentStore.update(_that,{
                codeError:true
            })
            Toast.info("手机验证码不能为空！",1)
        }
    }
    codeFocus(){
        componentStore.update(_that,{
            codeError:false
        })
    }
    //清除定时器
    clearTimeBtn(){
        clearInterval(codeTime);
    }
    //登录按钮
    loginClick(){
        //防止恶意用户
        //再次判断用户登录手机号
        let phone=_that.state.phoneValue;
        let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则  验证手机号13、 14、 15、 17、 18开头
        let IsPhone=reg.test(phone);
        if(phone != ''){
            if(!IsPhone ){
                Toast.info('您输入的手机号不正确！', 1);
                componentStore.update(_that,{
                    phoneError:true
                })
                return false;
            }
        }else{
            Toast.info('您输入的手机号不能为空！', 1);
            componentStore.update(_that,{
                phoneError:true
            })
            return false;
        }
        //判断登陆状态
        if(_that.state.initLogin){
            //快捷登录
            //alert('1111')

            if(!_that.state.backStageValue){
                Toast.info('验证码不能为空！',1);
                componentStore.update(_that,{
                    backStageError:true
                })
                return false;
            }
            if(!_that.state.codeValue){
                Toast.info('手机验证码不能为空！',1);
                componentStore.update(_that,{
                    codeError:true
                })
                return false;
            }
            Toast.info("登录成功等待后台接口!",2);
            //每个输入框的值：
            console.log("手机号：",phone);
            console.log("验证码：",_that.state.backStageValue);
            console.log("手机验证码：",_that.state.codeValue);
            //在此处写ajax与后台交互

        }else{
            //密码登录
            //再次判断登录密码
            let regPassword = /(?!^[0-9]+$)(?!^[a-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;//密码规则
            let firstPass=_that.state.firstPassValue;
            let pass = regPassword.test(firstPass);
            if(firstPass !=''){
                if(!pass){
                    componentStore.update(_that,{
                        firstPassError:true
                    })
                    Toast.info('您输入的密码不合法！', 1);
                    return false;
                }
            }else{
                //console.log('111111111')
                componentStore.update(_that,{
                    firstPassError:true
                })
                Toast.info('密码不能为空！', 1);
                return false;
            }
            Toast.info('恭喜您登录成功！等待后台提供接口交互！', 5);
            //每个输入框的值：
            console.log("手机号：",phone);
            console.log("密码：",firstPass);
            //在此处写ajax与后台交互
        }



    }
    render(){
        //console.log("nameValue："+this.state.nameValue)
        const { getFieldProps } = this.props.form;
        return (
             <div>
                 <Title $id="lys_form"
                        title="登录"
                        retreat={this.retreat}
                        grade="2"
                 >
                 </Title>
                 <div className="login_baner">
                     <img src={require('../../../image/login_bg.png')} alt=""/>
                     <div className="banner_log">
                         <div className="img">
                             <img src={require('../../../image/login_qianjia_log.png')} alt=""/>
                         </div>
                     </div>
                     <div className="bottom">
                         汇付天下全程资金托管
                     </div>
                 </div>
                <div className="login">
                    <div className="login_list" >
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
                                            placeholder="请输入手机号"
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
                            <li style={{display:_that.state.passState}}>
                                <div className="_left">
                                    <div className="_img">
                                        <img src={require('../../../image/icon/register_password.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast" style={{border: "0"}}>
                                    <div className="_right_B">
                                        <InputItem
                                            {...getFieldProps('firstPassWord')}
                                            type="password"
                                            placeholder="请输密码"
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
                            <li style={{display:_that.state.backStage}}>
                                <div className="_left">
                                    <div className="_img">
                                        <img src={require('../../../image/icon/register_code.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast _right_B">
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
                        </ul>
                    </div>
                    {/* 两个切换展示 */}
                    <div className="not_btn" style={{display:_that.state.passState}}>
                        <button className="not_password" onTouchStart={this.toRetrievePassword}>忘记密码?</button>
                    </div>
                    <div className="login_btm">
                        <div className="login_btn">
                            <Button content="登录" click={this.loginClick} $id="login_btn" width="90%" lineH={0.85+'rem'} radius="8px" height={0.85+'rem'}></Button>
                        </div>
                    </div>
                    <div className="login_bottom">
                        <ul>
                            <li onTouchStart={this.loginStateBtn}>{_that.state.loginState}</li>
                            <li onTouchStart={this.clearTimeBtn}><Link to="/register">立即注册</Link></li>
                        </ul>
                    </div>
                </div>

             </div>
        )
    }

}
//const BasicInputExampleWrapper = createForm()(Forms);
const Global_Login = createForm()(Login);
export default Global_Login;
