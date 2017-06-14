/**
 * Created by 唐丹 on 2017/4/25.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';
import Commonflex  from './common_flex';

//导入样式 start
import './common_flex.scss'
//导入样式 end



class Detail extends Component{
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

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    render(){

        return (

            <Commonflex title="详情" $id="commonflex_detail">
                {console.log(this.props.params.id)}
                {this.props.children}
            </Commonflex>

        )
    }

}

export default Detail;
