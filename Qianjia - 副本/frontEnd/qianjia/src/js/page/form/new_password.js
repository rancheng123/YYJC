/**
 * Created by 唐丹 on 2017/5/8.
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

class Newpassword extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            form: {
                originalPassword: '',
                password: '',
                confirmPassword: '',
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
            <Commonflex $id="new_password" title="修改密码">
                <div className="form-wrap">

                    <Validate ref="validator" $id="myflex_validate" onError={(obj)=>{

                        formMethod.errorStyle.right.showError(obj);

                    }}>
                        <div className="form-content">

                            <div className="form-item">
                                <div className="form-icon-box">
                                    <Icon type={require('../../../image/svg/init_password.svg')} />
                                </div>
                                <div className="form-input-box">
                                    <input type="password" value={that.state.form.originalPassword}
                                           onChange={(obj)=>{
                                               that.state.form.originalPassword = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                           onFocus={(obj)=>{
                                               that.state.form.isTouchHandleFirst = false;
                                               componentStore.update(that,that.state);
                                               formMethod.errorStyle.right.hideError(obj);
                                           }}
                                           onBlur={(obj)=>{
                                               console.log('blur -- originalPassword',that.state.form.isTouchHandleFirst);
                                               if (that.state.form.isTouchHandleFirst)return false;
                                               that.refs.validator.validate({
                                                   eleName : 'originalPassword',
                                                   callback : function (res) {
                                                       if (res){
                                                           console.log('原密码',res);
                                                       }
                                                   }
                                               });
                                           }}
                                           data-validName="originalPassword"
                                           data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'originalPassword'
                                           }]}
                                           data-validMsgPrefix={''}
                                           placeholder="请输入原密码"
                                    />
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="form-icon-box">
                                    <Icon type={require('../../../image/svg/new_password.svg')} />
                                </div>
                                <div className="form-input-box">
                                    <input type="password" value={that.state.form.password}
                                           onChange={(obj)=>{
                                               that.state.form.password = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                           onFocus={(obj)=>{
                                               that.state.form.isTouchHandleFirst = false;
                                               componentStore.update(that,that.state);
                                               formMethod.errorStyle.right.hideError(obj);
                                           }}
                                           onBlur={(obj)=>{
                                               console.log('blur -- password',that.state.form.isTouchHandleFirst);
                                               if (that.state.form.isTouchHandleFirst)return false;
                                               that.refs.validator.validate({
                                                   eleName : 'password',
                                                   callback : function (res) {
                                                       if (res){
                                                           console.log('新密码',res);
                                                       }
                                                   }
                                               });
                                           }}
                                           data-validName="password"
                                           data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'password'
                                           }]}
                                           data-validMsgPrefix={'新密码：'}
                                           placeholder="请输入新密码"
                                    />
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="form-icon-box">
                                    <Icon type={require('../../../image/svg/correct.svg')} />
                                </div>
                                <div className="form-input-box">
                                    <input type="password"  value={that.state.form.confirmPassword}
                                           onChange={(obj)=>{
                                               that.state.form.confirmPassword = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                           onFocus={(obj)=>{
                                               that.state.form.isTouchHandleFirst = false;
                                               componentStore.update(that,that.state);
                                               formMethod.errorStyle.right.hideError(obj);
                                           }}
                                           onBlur={(obj)=>{
                                               console.log('blur -- confirmPassword',that.state.form.isTouchHandleFirst);
                                               if (that.state.form.isTouchHandleFirst)return false;
                                               that.refs.validator.validate({
                                                   eleName : 'confirmPassword',
                                                   callback : function (res) {
                                                       if (res){
                                                           console.log('确认密码',res);
                                                       }
                                                   }
                                               });
                                           }}
                                           data-validName="confirmPassword"
                                           data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'equal',
                                               params: {
                                                   name: 'password',
                                                   chinese: '密码'
                                               }
                                           }]}
                                           data-validMsgPrefix={'确认密码：'}
                                           placeholder="请再次输入新密码"
                                    />
                                </div>
                            </div>

                        </div>

                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="lg"/>
                        <WhiteSpace size="lg"/>

                        <div className="form-detect">
                            <input type="button" value="设置新密码" className="form-register-btn" onTouchEnd={()=>{

                                that.state.form.isTouchHandleFirst = true;
                                componentStore.update(that,that.state);

                                Utils.eventHanlder(function(){

                                    that.refs.validator.validate({
                                        callback: function(res){
                                            if(res){
                                                alert('密码重置成功');
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

export default Newpassword;
