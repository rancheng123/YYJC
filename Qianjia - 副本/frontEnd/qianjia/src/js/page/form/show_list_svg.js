/**
 * Created by 唐丹 on 2017/5/9.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

import { Icon,Modal,WhiteSpace,Grid } from 'antd-mobile';

class Showlistsvg extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

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
        const icons = [
            'password','init_password','new_password',
            'correct', 'error',
            'invite','iphone','operateError',
            'person','success','verify','wait'
        ];
        const data = icons.map(item => ({
            icon: (<Icon type={require('../../../image/svg/'+item+'.svg')} />),
            text: item,
        }));

        return (
            <Grid data={data} columnNum={3} hasLine={false} />

        )
    }

}

export default Showlistsvg;