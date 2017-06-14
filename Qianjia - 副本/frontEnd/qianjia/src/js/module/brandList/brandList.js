import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';


class Brands extends Component{
    constructor(){
        super();
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
            <ul style={{overflow:'hidden'}}>
                {
                    function(){
                        var dataList = that.props.data;
                        if(dataList && dataList.length){
                            var lis = dataList.map(function(ele,i){

                                if(ele.name == that.props.selected){
                                    var style = {width:'80px',float:'left',margin: '10px',background: 'yellow'}
                                }else{
                                    var style = {width:'80px',float:'left',margin: '10px'}
                                }

                                return (
                                    <li style={style}
                                        className={classNames({
                                            active: ele.active
                                        })}
                                        key={i}
                                        data-index={i}
                                        onClick={(ev)=>{
                                            var index = ev.target.getAttribute('data-index')
                                            that.props.onChange && that.props.onChange(index)
                                        }}
                                    >{ele.name}</li>
                                )
                            })
                        }else{
                            var lis = '没有品牌'
                        }

                        return lis;
                    }()
                }
            </ul>
        )
    }
};

export default Brands;

