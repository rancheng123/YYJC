import React, { Component, PropTypes } from 'react';

//导入样式 start
import './module4.scss'
//导入样式 end

/* 通用组件  start */

import ViewList from '../../widget/viewList/viewList';
import { Icon, Grid ,Button ,Popup,List,InputItem } from 'antd-mobile';

import lazyloader from '../../widget/lazyLoad/lazyloader';

/* 通用组件  end */


class Demo extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            data: [],
            isListen: false,
            loading: false,
            count: 0
        }
    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end



        this.getData();



    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    getData(){
        var that = this;


        this.state.loading = true;
        componentStore.update(this,this.state);


        setTimeout(function(){
            var tiaoshu = 10;
            if(that.state.count == 3){
                tiaoshu = 6;
            }

            for(var i=0;i<tiaoshu;i++){
                that.state.data.push({
                    name: 'name'+(that.state.count*10+i),
                    age: 'age'+(that.state.count*10+i)
                })
            };
            that.state.isListen = tiaoshu<10?false:true;
            that.state.loading = false;
            componentStore.update(that,that.state);
            that.state.count++;
        },2000)



    }



    render(){
        var that = this;


        return (
            <div className="module4">

                <div style={{fontSize: '20px'}} onClick={()=>{
                    Utils.switchRoute('/module3')
                }}>
                    module3
                </div>

                <Icon type='check'/>
                <Icon type='check-circle'/>

                {/*ViewList  start*/}
                {(function(){

                    return (

                            <ViewList
                                $id="module3-viewList"
                                isListen={that.state.isListen}
                                listenDistance={60}
                                loading={that.state.loading}
                                data={that.state.data}
                                render={(ele,i)=>{
                                    return (
                                        <div

                                            onClick={(ev)=>{
                                                //Utils.switchRoute('/module3')

                                            }}>
                                            {ele.name} : {ele.age}
                                            <img className="year-shouyi" src={require('../../../image/floatRate.png')} alt=""/>
                                            <img className="lazy" style={{width: 391,height:60}} src="/blank.png" data-src="https://f10.baidu.com/it/u=1981748892,3031683197&fm=72" alt=""/>
                                        </div>
                                    )
                                }}
                                getDataFn={()=>{
                                    that.getData();
                                }}
                                componentDidMount={()=>{
                                    setTimeout(function(){
                                        lazyloader.init({
                                            ele: document.querySelector('.viewListWrap')
                                        });
                                    },2500)

                                }}
                                onScroll={(ev)=>{
                                    lazyloader.processScroll();
                                }}
                            >
                            </ViewList>

                    )
                }())}

                {/*ViewList  end*/}




            </div>
        )
    }

}

export default Demo;
