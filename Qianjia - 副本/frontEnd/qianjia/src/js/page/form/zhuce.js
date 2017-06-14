/**
 * Created by 唐丹 on 2017/4/19.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

import { Icon,Modal,WhiteSpace } from 'antd-mobile';

/* 自定义验证 start*/
import Commonflex from '../common_flex/common_flex';
import Validate from '../../widget/react-validate/react-validate';
/* 自定义验证 end*/

import formMethod from './form_method';

import './form.scss'

class Zhuce extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            form: {
                iphone: '',
                verify_code: '',
                message_code: '',
                password: '',
                confirmPassword: '',
                invite_code: ''
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
            <Commonflex $id="zhuce" title="注册">
                <div className="form-wrap">

                    <Validate ref="validator" $id="myflex_validate" onError={(obj)=>{

                        error_theme.right_tip.showError(obj);

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
                                               obj.target.setAttribute('class','');
                                           }}

                                           data-validName="iphone"
                                           data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'iphone'
                                           }]}
                                           data-validMsgPrefix={'手机号：'}
                                           placeholder="请填写手机号"
                                    />
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="form-icon-box">
                                    <Icon type={require('../../../image/svg/verify.svg')} />
                                </div>
                                <div className="form-input-box">
                                    <input type="text"  value={that.state.form.verify_code}
                                           onChange={(obj)=>{
                                               that.state.form.verify_code = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                           onFocus={(obj)=>{
                                               obj.target.setAttribute('class','');
                                           }}
                                           data-validName="verify_code"
                                           data-validRules={[{
                                               name: 'require'
                                           }]}
                                           data-validMsgPrefix={'验证码：'}
                                           placeholder="请输入验证码"
                                    />
                                    <div className="form-verify-btn"></div>
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
                                               obj.target.setAttribute('class','');
                                           }}
                                           data-validName="message_code"
                                           data-validRules={[{
                                               name: 'require'
                                           }]}
                                           data-validMsgPrefix={'短信验证码：'}
                                           placeholder="请输入短信验证码"
                                    />
                                    <div className="form-message-btn">获取验证码</div>
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="form-icon-box">
                                    <Icon type={require('../../../image/svg/password.svg')} />
                                </div>
                                <div className="form-input-box">
                                    <input type="password" value={that.state.form.password}
                                           onChange={(obj)=>{
                                               that.state.form.password = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                           onFocus={(obj)=>{
                                               obj.target.setAttribute('class','');
                                           }}
                                           data-validName="password"
                                           data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'password'
                                           }]}
                                           data-validMsgPrefix={'密码：'}
                                           placeholder="请输入密码"
                                    />

                                </div>
                            </div>
                            <div className="form-item">
                                <div className="form-icon-box">
                                    <Icon type={require('../../../image/svg/password.svg')} />
                                </div>
                                <div className="form-input-box">
                                    <input type="password"  value={that.state.form.confirmPassword}
                                           onChange={(obj)=>{
                                               that.state.form.confirmPassword = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                           onFocus={(obj)=>{
                                               obj.target.setAttribute('class','');
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
                                           placeholder="请再次输入密码"
                                    />
                                </div>
                            </div>
                        </div>
                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="md"/>
                        <div className="form-content">
                            <div className="form-item">
                                <div className="form-icon-box">
                                    <Icon type={require('../../../image/svg/iphone.svg')} />
                                </div>
                                <div className="form-input-box">
                                    <input type="text"  value={that.state.form.invite_code}
                                           onChange={(obj)=>{
                                               that.state.form.invite_code = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                           onFocus={(obj)=>{
                                               obj.target.setAttribute('class','');
                                           }}
                                           data-validName="invite_code"
                                           data-validRules={[{
                                               name: 'require'
                                           }]}
                                           data-validMsgPrefix={'邀请码：'}
                                           placeholder="请输入邀请码"
                                    />
                                </div>
                            </div>
                        </div>
                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="lg"/>
                        <WhiteSpace size="lg"/>

                        <div className="form-detect">
                            <input type="button" value="注册" className="form-register-btn" onClick={()=>{

                                Utils.eventHanlder(function(){

                                    var res = that.refs.validator.validateAll();
                                    if(res){
                                        Modal.alert('提示','注册成功', [
                                            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                        ])
                                    }
                                })


                            }}/>
                        </div>

                    </Validate>
                </div>
            </Commonflex>

        )
    }

}

export default Zhuce;
