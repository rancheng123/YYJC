/**
 * Created by 唐丹 on 2017/4/5.
 *
 *
 *
 *
 *
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

import { Toast, WhiteSpace, WingBlank, Modal, Button, List, InputItem } from 'antd-mobile';
//import Validation from 'react-validation';
import validator from 'validator';

//导入样式 start
import './verify.scss'
//导入样式 end

import { createForm } from 'rc-form';

class BasicInputExample extends Component {


    componentWillMount(){
        //在此处初始化状态

        this.state={
            focused : "false",

            errorPhone : false, //是否提示电话错误提示叹号
            errorPassword : false,  //是否提示密码错误提示叹号

            valuePhone : '',    //电话值
            valuePassword : '', //密码值

            isPhone : false,    //电话是否正确
            isPassword : false, //密码是否正确

            //判断是否有焦点主要用于点击注册时
            isPhoneFocus : false,
            isPasswordFocus : false,

            modal1:false    //是否出现注册成功提示框
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

    isFnPhone(value){
        return /^1[34578]\d{9}$/.test(value);
    }

    isFnPassword(value){
        return /^(?![^a-zA-Z]+$)(?!\D+$)/.test(value);
    }

    fnPhoneJudge(val){
        let value = this.state.valuePhone;

        if (!value){
            Toast.info('请输入手机号', 2);
            componentStore.update(this,{
                errorPhone : true,
                valuePhone : value,
                isPhone : false
            })
        }else {
            let newValue = value.split(' ').join('');
            if ( this.isFnPhone(newValue) ){
                componentStore.update(this,{
                    errorPhone : false,
                    valuePhone : value,
                    isPhone : true
                })
            }else{
                Toast.info('请输入正确的手机号', 2);
                componentStore.update(this,{
                    errorPhone : true,
                    valuePhone : value,
                    isPhone : false
                })
            }
        }
        componentStore.update(this,{
            isPhoneFocus : false
        })
    }

    fnPhoneBlur(){  //电话失去焦点
        this.fnPhoneJudge();
    }
    fnPhoneFocus(){ //电话聚焦
        componentStore.update(this,{
            errorPhone:false,
            isPhoneFocus : true
        })
    }
    fnPasswordJudge(val,callback){
        let value = this.state.valuePassword;
        if (!value){
            Toast.info('请输密码', 2);
            componentStore.update(this,{
                errorPassword : true,
                isPassword : false
            })
        }else {
            if ( this.isFnPassword(value) ){ //密码必须以字母开头，长度在6~18之间，只能包含字符、数字和下划线
                componentStore.update(this,{
                    valuePassword : value,
                    isPassword : true
                })
            }else{
                Toast.info('密码不符合规范', 2);
                componentStore.update(this,{
                    errorPassword : true,
                    isPassword : false
                })
            }
        }
    }
    fnPasswordBlur(){   //密码失去焦点
        this.fnPasswordJudge();
    }
    fnPasswordFocus(){  //密码聚焦
        componentStore.update(this,{
            errorPassword:false
        })
    }
    fnRegister(){   //点击注册

        let isPhone = this.state.isPhone;
        let isPassword = this.state.isPassword;

        let valuePhone = this.state.valuePhone;
        let valuePassword = this.state.valuePassword;

        let isPhoneFocus = this.state.isPhoneFocus;
        let isPasswordFocus = this.state.isPasswordFocus;

        if (!valuePhone && !valuePassword){ //当手机号密码都为空的时候
            componentStore.update(this,{
                errorPhone : true,
                errorPassword : true
            })
            Toast.info('请输入手机号和密码', 2);
            return false;
        }

        if(!valuePhone && !isPhoneFocus){
            componentStore.update(this,{
                errorPhone : true
            })
            Toast.info('请输入手机号', 2);
            return false;
        }
        if(!isPhone && !isPhoneFocus){
            componentStore.update(this,{
                errorPhone : true
            })
            Toast.info('请输入正确的手机号', 2);
            return false;
        }

        if(!valuePassword && !isPasswordFocus){
            componentStore.update(this,{
                errorPassword : true
            })
            Toast.info('请输入密码', 2);
            return false;
        }
        if(!isPassword && !isPasswordFocus){
            componentStore.update(this,{
                errorPassword : true
            })
            Toast.info('密码格式不正确', 2);
            return false;
        }

        //Utils方法发送数据

        if(isPhone&&isPassword){
            let _this = this;
            Utils.requestData({
                url: 'http://localhost:8388/login/yzmcheck',
                method: 'post',
                data: {
                    username: valuePhone.split(' ').join(''),
                    password: valuePassword
                },
                callback: function(data){
                    if(data.code==1){
                        Toast.info(data.msg, 2);
                        componentStore.update(_this,{
                            errorPhone:true,
                            valuePhone:valuePhone
                        })
                    }else if(data.code==0){
                        _this.showModal();
                    }
                },
                error: {
                    '502' : function () {
                        Toast.info('连接服务器失败', 2);
                    },
                    '404' : function () {
                        Toast.info('页面不存在', 2);
                    }
                }
            });
        }

        //AJAX 发送数据请求
        /*if(isPhone&&isPassword) {
            let _this = this;
            let xhr = new XMLHttpRequest();
            xhr.open('post', 'http://localhost:8388/login/yzmcheck', true);
            xhr.onload = function (ev) {
                if (this.status == 200) {

                    var data = JSON.parse(xhr.response);
                    console.log(data);
                    if (data.code == 1) {
                        Toast.info(data.msg, 2);
                        componentStore.update(_this, {
                            errorPhone: true
                        })
                    } else if (data.code == 0) {

                        console.log('ok');
                        _this.showModal();
                    }

                }else if(this.status == 502){
                    alert('服务器请求失败请稍后再试！');
                }
            }
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send('username=' + this.state.valuePhone.split(' ').join('') + '&password=' + this.state.valuePassword);
        }*/
    }
    showModal(e){
        componentStore.update(this,{
            modal1:true
        })
    }
    onClose(){
        componentStore.update(this,{
            modal1:false
        })
    }

    onSure(){
        console.log('ok');
        this.onClose('modal1');
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <Modal
                    transparent
                    maskClosable={false}
                    visible={this.state.modal1}
                    footer={[{ text: '确定', onPress: ()=>{
                        this.onSure();
                    }}]}
                >
                    注册成功！
                </Modal>
                <InputItem
                    type="phone"
                    {...getFieldProps('phone')}
                    placeholder="请输入手机号"
                    error={this.state.errorPhone}
                    onBlur={()=>{
                        this.fnPhoneBlur();
                    }}
                    onFocus={()=>{
                        this.fnPhoneFocus();
                    }}
                    value={this.state.valuePhone}
                    onChange={(value)=>{

                        this.state.valuePhone = value;

                        let newValue = value.split(' ').join('');
                        if (this.isFnPhone(newValue)){
                            this.state.isPhone = true;
                        }else{
                            this.state.isPhone = false;
                        }
                        componentStore.update(this,this.state)

                    }}
                >手机号</InputItem>

                <InputItem
                    type="password"
                    {...getFieldProps('password')}
                    placeholder="请输入密码"
                    error={this.state.errorPassword}
                    onBlur={()=>{
                        this.fnPasswordBlur();
                    }}
                    onFocus={()=>{
                        this.fnPasswordFocus();
                    }}
                    value={this.state.valuePassword}
                    onChange={(value)=>{
                        this.state.valuePassword = value;
                        if (this.isFnPassword(value)){
                            this.state.isPassword = true;
                        }else{
                            this.state.isPassword = false;
                        }
                        componentStore.update(this,this.state)
                    }}
                >密码</InputItem>

                <List.Item>
                    <div
                        style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                        onTouchEnd={()=>{
                            this.fnRegister();
                        }}
                    >
                        注册
                    </div>
                </List.Item>

            </div>
        );
    }
}

const Verify = createForm()(BasicInputExample);


export default Verify;
