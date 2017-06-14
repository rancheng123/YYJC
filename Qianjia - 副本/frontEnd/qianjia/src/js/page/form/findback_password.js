/**
 * Created by 唐丹 on 2017/4/19.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

import { Icon,Modal,WhiteSpace } from 'antd-mobile';

/* 自定义验证 start*/
import Commonflex from '../common_flex/common_flex';
import Validate from './validate-single/validate-single';
/* 自定义验证 end*/

import formMethod from './form_method';

import './form.scss'

class Findbackpassword extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            form: {
                iphone: '', //手机号
                message_code: '',   //短信验证码
                isMessageOpen: true,    //判断是否点击了获取验证码按钮，默认可点 true
                message_from_server: '',    //从服务器获取到的值
                isTouchHandleFirst: false   //为了解决touchend事件触发之后，blur事件再次触发
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

    render(){
        var that = this;
        return (
            <Commonflex $id="zhuce" title="找回密码">
                <div className="form-wrap">

                    <Validate ref="validator" $id="myflex_validate" onError={(obj)=>{

                        formMethod.errorStyle.right.showError(obj);

                    }}>
                        <div className="form-content">
                            <div className="form-item">
                                <div className="form-icon-box">
                                    <Icon type={require('../../../image/svg/person.svg')} />
                                </div>
                                <div className="form-input-box">
                                    <input type="text" value={that.state.form.name}
                                           onChange={(obj)=>{
                                               that.state.form.iphone = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                           onFocus={(obj)=>{
                                               that.state.form.isTouchHandleFirst = false;
                                               componentStore.update(that,that.state);
                                               formMethod.errorStyle.right.hideError(obj);
                                           }}
                                           onBlur={(obj)=>{
                                               console.log('blur -- iphone',that.state.form.isTouchHandleFirst);
                                               if (that.state.form.isTouchHandleFirst)return false;
                                               that.refs.validator.validate({
                                                   eleName : 'iphone',
                                                   callback : function (res) {}
                                               });
                                           }}
                                           data-validName="iphone"
                                           data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'iphone',
                                               params: {
                                                   //url: 'http://localhost:8388/login/yzmcheck'
                                               }
                                           }]}
                                           data-validMsgPrefix={'手机号'}
                                           placeholder="请填写手机号"
                                    />
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="form-icon-box">
                                    <Icon type={require('../../../image/svg/invite.svg')} />
                                </div>
                                <div className="form-input-box">
                                    <input type="text"  value={that.state.form.message_code}
                                           onChange={(obj)=>{
                                               that.state.form.message_code = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                           onFocus={(obj)=>{
                                               console.log( 'foucus -- ' , that.state.form.isTouchHandleFirst );
                                               that.state.form.isTouchHandleFirst = false;
                                               componentStore.update(that,that.state);
                                               formMethod.errorStyle.right.hideError(obj);
                                           }}
                                           onBlur={(obj)=>{
                                               console.log('blur -- message_code',that.state.form.isTouchHandleFirst);
                                               if (that.state.form.isTouchHandleFirst)return false;
                                               that.refs.validator.validate({
                                                   eleName : 'iphone',
                                                   callback : function (res) {
                                                       if (res){
                                                           that.refs.validator.validate({
                                                               eleName : 'message_code',
                                                               callback : function (res) {}
                                                           });
                                                       }
                                                   }
                                               });

                                           }}
                                           data-validName="message_code"
                                           data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'message_code',
                                               params: {
                                                   message : ()=>{
                                                       return {
                                                           isOpen :that.state.form.isMessageOpen,
                                                           value : that.state.form.message_from_server
                                                       };
                                                   }
                                               }
                                           }]}
                                           data-validMsgPrefix={'短信验证码：'}
                                           placeholder="请输入短信验证码"
                                    />

                                    <div className="form-message-btn" ref="getVerify" onTouchEnd={(e)=>{

                                        that.refs.validator.validate({
                                            eleName : 'iphone',
                                            callback : function (res) {
                                                if (res){

                                                    var isMessageOpen = that.state.form.isMessageOpen;
                                                    var selfEle = that.refs.getVerify;
                                                    var time = 60;
                                                    var timerRestart = null;


                                                    if (isMessageOpen){

                                                        clearTimeout(that.timerLose);   //清除上次定时器

                                                        that.state.form.isMessageOpen = false;
                                                        componentStore.update(that,that.state);
                                                        selfEle.innerHTML = '倒计时60s';

                                                        timerRestart = setInterval(function () {
                                                            time--;
                                                            if (time<0){
                                                                clearInterval(timerRestart);
                                                                time=0;
                                                                selfEle.innerHTML = '获取验证码';
                                                                that.state.form.isMessageOpen = true;
                                                                componentStore.update(that,that.state);
                                                                return false;
                                                            }
                                                            selfEle.innerHTML = '倒计时'+time+'s';
                                                        },1000)

                                                        //模拟ajax数据请求
                                                        setTimeout(function () {
                                                            if(true){   //请求你成功
                                                                let chars = ['0','1','2','3','4','5','6','7','8','9'];
                                                                let num = "";
                                                                for(let i = 0; i < 4 ; i ++) {
                                                                    let id = Math.floor(Math.random()*10);
                                                                    num += chars[id];
                                                                }
                                                                console.log('验证码：：',num);
                                                                that.state.form.message_from_server = num;
                                                                componentStore.update(that,that.state);
                                                            }

                                                        },1000)

                                                        //验证码在5分钟之后失效
                                                        that.timerLose = setTimeout(function () {
                                                            that.state.form.message_from_server = '';
                                                            componentStore.update(that,that.state);
                                                            console.log('验证码失效',that.state.form.message_from_server);
                                                        },5*60*1000)

                                                    }
                                                }
                                            }
                                        });


                                    }}>获取验证码</div>
                                </div>

                            </div>

                        </div>

                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="lg"/>
                        <WhiteSpace size="lg"/>

                        <div className="form-detect">
                            <input type="button" value="下一步" className="form-register-btn" onTouchEnd={()=>{

                                that.state.form.isTouchHandleFirst = true;
                                componentStore.update(that,that.state);
                                console.log( 'onTouchEnd -- ',that.state.form.isTouchHandleFirst );
                                Utils.eventHanlder(function(){
                                    console.log('touchend handle');
                                    that.refs.validator.validate({
                                        callback: function(res){
                                            //debugger;
                                            if(res){
                                                Utils.switchRoute('/reset_password');
                                            }
                                        }
                                    });

                                })


                            }}/>
                        </div>

                    </Validate>
                </div>
            </Commonflex>

        )
    }

}

export default Findbackpassword;
