/**
 * Created by 李永帅 on 2017/4/13 .
 */

import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
/* 引入input 组件 */
import Input from '../../module/input/input';
/* 蚂蚁金服框架核心 */
import { SegmentedControl,Picker, List,  Toast, WhiteSpace , WingBlank, InputItem} from 'antd-mobile';
/* 导航组件 */
/* 引入导航组件 */
import Title from '../../module/navTitle/navTitle';


//导入样式 start
import './coupon.scss'
//导入样式 end
var _that=null;
var codeTime=null;
class Coupon extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        _that=this;
        //在此处初始化状态
        this.state={

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
        //console.log("nameValue："+this.state.nameValue)

        return (
            <div>
                <Title $id="coupon"
                       title="优惠券"
                       retreat={this.retreat}
                       grade="2"
                       munIng="说明"
                >
                </Title>
                <div className="coupon">
                    <div className="tab">
                        <SegmentedControl values={['未使用', '已使用','已过期']} tintColor={"#ff7405"}   />
                    </div>
                    <div className="content">
                        <div className="coupon_quan">
                            <div className="img_bg">
                                <div className="money">
                                    <div className="money_img"></div>
                                </div>
                                <div className="cut">
                                    投资10000 元可用券
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Coupon;
