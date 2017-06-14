/**
 * Created by 唐丹 on 2017/5/10.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

import { Icon,Modal,WhiteSpace } from 'antd-mobile';

/* 自定义验证 start*/
import Commonflex from '../common_flex/common_flex';
import Validate from './validate-single/validate-single';
/* 自定义验证 end*/

import Picker from '../../widget/picker/picker';
import globalData from '../module3/data'

import formMethod from './form_method';

import './form.scss'

class Security extends Component{
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

                area: {
                    id: [],
                    value: ['请选择']
                },

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
            <Commonflex $id="new_password" title="安全认证">
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
                                    <div className="form-select-bank">
                                        <div data-validName="area"
                                             data-validRules={[{
                                                 name: 'require'
                                             }]}
                                             data-valid-setValue={()=>{
                                                 var value = that.state.form.area.value.join(',');
                                                 return value=='请选择开户行'?'':value;
                                             }}
                                             data-validMsgPrefix={'地区：'}>

                                            <Picker $id="picker-test1"
                                                    onYes={(data)=>{

                                                        console.log(data)
                                                        that.state.form.area.value = data.textArr;
                                                        that.state.form.area.id = data.idArr;
                                                        componentStore.update(that,that.state)
                                                    }}
                                                    onChange={(value)=>{
                                                        console.log(value)
                                                    }}
                                                    defaultValue={that.state.form.area.id}
                                                    title="选择地区"
                                                    data={globalData.data}
                                            >
                                                <div>
                                                    {this.state.form.area.value.join(',')}
                                                </div>

                                            </Picker>
                                        </div>
                                    </div>
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
                                           data-validMsgPrefix={'请输入卡号：'}
                                           placeholder="请输入卡号"
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
                                           data-validMsgPrefix={'开户地（省）：'}
                                           placeholder="开户地（省）"
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
                                           }]}
                                           data-validMsgPrefix={'开户支行信息：'}
                                           placeholder="请输入开户支行信息"
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

export default Security;
