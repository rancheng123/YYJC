import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

import { Icon } from 'antd-mobile';

//导入样式 start
import './common_flex.scss'
//导入样式 end



class Commonflex extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

        var oParent = document.getElementById('g-flex-form');
        var oChild = document.getElementById('g-flex-content');
        Utils.preventPull(oParent,oChild);

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    goBack(ev){   //返回上一页
        Utils.backRoute();
        ev.preventDefault();
    };
    render(){

        return (

            <div className="g-flex-form" id="g-flex-form" style={{height:document.documentElement.clientHeight+'px'}}>
                <h3 className="g-flex-head">
                    <a href="javascript:;" className="g-flex-back-btn" onTouchEnd={this.goBack}>
                        <Icon type="left" />
                    </a>
                    <span>{this.props.title}</span>
                </h3>
                <div className="g-flex-content" id="g-flex-content">
                    {this.props.children}
                </div>
            </div>

        )
    }

}

export default Commonflex;
