/**
 * Created by fangyibai on 2017/4/5.
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
import './safe.scss'
//导入样式 end
var _that=null;
class Forms extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        _that=this;
        //在此处初始化状态
        this.state={
            nameValue:'',
            nameError:false,
            userValue:'',
            userError:false,
            bankValue:'',
            bankError:false,
            bankNumber:'',
            bankNumberError:false,
            data: [],
            cols: 1,
            pickerValue: [],
            asyncValue: []
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
    toModule3(){
        Utils.switchRoute('/module3')
    };
    retreat(){
        alert('返回上一页面');
    };
    //姓名
    nameBlur(){
        //console.log(_that)
        let name=this.value;
        if(!name){
            componentStore.update(_that,{
                nameError:true
            })
            Toast.info('请输入姓名！', 1);
        }else{
            componentStore.update(_that,{
                nameValue:name //存储输入的合法姓名
            })
        }
    };
    nameFocus(){
        componentStore.update(_that,{
            nameError:false
        })
    };
    //身份证号
    userBlur(){
        let user=this.value;
        let text =new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
        let userV=text.test(user);
        if(!user){
            componentStore.update(_that,{
                userError:true
            })
            Toast.info('请输入身份证号！', 1);
        }else{
            if(!userV){
                componentStore.update(_that,{
                    userError:true
                })
                Toast.info('请输入合法的身份证号！', 2);
            }else{
                componentStore.update(_that,{
                    userValue:user //存储输入的合法的身份证号
                })
            }
        }
    };
    userFocus(){
        componentStore.update(_that,{
            userError:false
        })
    }
    //选择银行
    onPickerChange (val) {//选择银行下拉触发change同步到选择区
        //console.log(val);
        componentStore.update(_that,{
            bankValue:val //存储选择的银行
        })
        let colNum = 1;
        const bank = [...this.state.data];
        const asyncValue = [...val];
        this.setState({
            data: bank,
            cols: colNum,
            asyncValue,
        });
    };
    onClick (){//点击选择银行弹出
        var _this = this;
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module1/test_search2',
            method: 'POST',
            data: {
                a: 1,
                b: 2
            },
            callback: function(data){
                console.log("data--:"+ JSON.stringify(data));
                componentStore.update(_this,{
                    data: data.data
                 })

                //console.log(data)
            }
         });
    };
    //银行卡
    bankBlur(){
        let bankVal=this.value;
        if(bankVal != undefined ){
            //console.log('1')
            if(bankVal.length<=15 || bankVal.length>19){
                componentStore.update(_that, {
                    bankNumberError: true
                })
                Toast.info('请输入正确的银行卡号！', 2);
            }else{
                componentStore.update(_that,{
                    bankNumber:bankVal //存储输入的合法银行卡账号
                })
            }
        }else{
            componentStore.update(_that, {
                bankNumberError: true
            })
            Toast.info('请输入正确的银行卡号！', 2);
        }
    };
    banFocus(){
        componentStore.update(_that,{
            bankNumberError:false
        })
    }
    //提交按钮
    safeClick(){
        //再次判断用户姓名
        if(_that.state.nameValue=='' || _that.state.nameValue==undefined ){
            componentStore.update(_that,{
                nameError:true
            })
            Toast.info('姓名不能为空！', 1);
            return false;
        }
        //再次判断身份证号
        if(_that.state.userValue=='' || _that.state.userValue==undefined ){
            componentStore.update(_that,{
                userError:true
            })
            Toast.info('身份证不能为空！', 1);
            return false;
        }
        //再次判断所选银行
        if(_that.state.bankValue=='' || _that.state.bankValue==undefined ){
            Toast.info('请选择开户行！', 1);
            return false;
        }
        //再次判断银行卡号
        if(_that.state.bankNumber=='' || _that.state.bankNumber==undefined ){
            componentStore.update(_that,{
                bankNumberError:true
            })
            Toast.info('银行卡号不能为空！', 1);
            return false;
        }
        //console.log("取到姓名："+_that.state.nameValue)
        //console.log("取到身份证："+_that.state.userValue)
        //console.log("取到银行："+_that.state.bankValue)
        //console.log("取到卡号："+_that.state.bankNumber)
        Toast.info('恭喜您完成！', 1);
    }
    render(){
        //console.log("nameValue："+this.state.nameValue)
        const { getFieldProps } = this.props.form;
        return (
             <div>
                 <Title $id="lys_form"
                        title="安全认证"
                        retreat={this.retreat}
                        grade="2"
                 >
                 </Title>
                {/*<Input $id="lys_input"  />*/}
                <div className="safe">
                    <div className="safe_title">
                        完全身份信息
                    </div>
                    <div className="safe_list">
                        <ul>
                            <li>
                                <div className="_left">
                                    <div className="_img">
                                        <img src={require('../../../image/icon/safe_name.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast">
                                    <div className="_right_C">
                                        <InputItem
                                            {...getFieldProps('userName')}
                                            type="text"
                                            placeholder="请输入姓名"
                                            onBlur={this.nameBlur}
                                            error={this.state.nameError}
                                            onFocus={this.nameFocus}
                                            value={this.state.nameValue}
                                            onChange={(value)=>{
                                                this.state.nameValue = value;
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
                                        <img src={require('../../../image/icon/safe_shenfenzheng.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast">
                                    <div className="_right_C">
                                        <InputItem
                                            {...getFieldProps('user')}
                                            maxLength="18"
                                            type="text"
                                            placeholder="请输入身份证号"
                                            onBlur={this.userBlur}
                                            error={this.state.userError}
                                            onFocus={this.userFocus}
                                            value={this.state.userValue}
                                            onChange={(value)=>{
                                                this.state.userValue = value;
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
                                        <img src={require('../../../image/icon/safe_bank.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right">
                                    <div className="_right_A">
                                        <Picker
                                            data={this.state.data}
                                            cols={this.state.cols}
                                            value={this.state.asyncValue}
                                            extra="请选择银行"
                                            onPickerChange={this.onPickerChange.bind(this)}
                                        >
                                            <List.Item  onClick={this.onClick.bind(this)}>
                                            </List.Item>
                                        </Picker>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="_left">
                                    <div className="_img">
                                        <img src={require('../../../image/icon/safe_bank.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="_right _rightLast">
                                    <div className="_right_B">
                                        <InputItem
                                            {...getFieldProps('bank')}
                                            maxLength="19"
                                            type="number"
                                            placeholder="请输入银行卡号"
                                            error={this.state.bankNumberError}
                                            onBlur={this.bankBlur}
                                            onFocus={this.banFocus}
                                            value={this.state.bankNumber}
                                            onChange={(value)=>{
                                                this.state.bankNumber = value;
                                                componentStore.update(this,this.state)
                                            }}
                                        >
                                        </InputItem>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="safe_btm">
                        <p>本金及收益直接打入您 填写的收款账户中</p>
                        {/*<Button content="确定" click={this.safeClick} $id="safe" width="90%" lineH={0.85+'rem'} radius="8px" height={0.85+'rem'}></Button>*/}
                        <div className="safe_btn">
                            <Button content="确定" click={this.safeClick} $id="safe" width="90%" lineH={0.85+'rem'} radius="8px" height={0.85+'rem'}></Button>
                        </div>
                    </div>
                </div>

             </div>
        )
    }

}
//const BasicInputExampleWrapper = createForm()(Forms);
const Global_Form = createForm()(Forms);
export default Global_Form;
