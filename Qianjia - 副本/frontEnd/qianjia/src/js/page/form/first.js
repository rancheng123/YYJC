/**
 * Created by 唐丹 on 2017/4/25.
 */
import React, { Component, PropTypes } from 'react';

//导入样式 start

//导入样式 end



class First extends Component{
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

            <h3>First</h3>

        )
    }

}

export default First;
