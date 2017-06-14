import React, { Component, PropTypes } from 'react';
import './antdTest.scss'
import moment from 'moment';
import 'moment/locale/zh-cn';

/* 蚂蚁金服  start */
import { Popover,Icon ,SegmentedControl ,DatePicker ,List ,RefreshControl ,ListView ,Carousel } from 'antd-mobile';
/* 蚂蚁金服  end */









class AntdTest extends Component{
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
    componentWillMount(){
        this.state = {
            Popover: {
                visible: false
            },
            DatePicker: {
                time:  moment(),
                visible: false
            }
        }
    }

    render(){
        var that = this;


        return (
            <div className="antdTestWrap">




                {/* 阴影 气泡  start */}
                {(function(){


                    /*
                     overlay  各项
                     */

                    return (
                        <div className="item" style={{height: '1rem'}}>
                            <Popover mask
                                     visible={that.state.Popover.visible}
                                     overlay={[
                                         (<div onClick={()=>{
                                             alert(1111)
                                             that.state.Popover.visible = !that.state.Popover.visible;
                                             componentStore.update(that,that.state);
                                         }}>1111</div>),
                                         (<div onClick={()=>{
                                             alert(222)
                                             that.state.Popover.visible = !that.state.Popover.visible;
                                             componentStore.update(that,that.state);
                                         }}>222</div>),
                                         (<div onClick={()=>{
                                             alert(333)
                                             that.state.Popover.visible = !that.state.Popover.visible;
                                             componentStore.update(that,that.state);
                                         }}>3333</div>),
                                     ]}
                                     popupAlign={{
                                         overflow: { adjustY: 0, adjustX: 0 },
                                         offset: [-26, 15],
                                     }}
                                     onVisibleChange={()=>{
                                         that.state.Popover.visible = !that.state.Popover.visible;
                                         componentStore.update(that,that.state);
                                     }}
                                     onSelect={()=>{

                                         //不起作用
                                         debugger;

                                     }}
                            >
                                {/*调出遮罩*/}
                                <div style={{
                                    height: '1rem',
                                    width: '1rem',
                                    border: '1px solid green',
                                    padding: '0 0.3rem',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    right: '0'
                                }}
                                >
                                    阴影 气泡
                                </div>
                            </Popover>
                        </div>
                    )
                })()}
                {/* 阴影 气泡  end */}


                {/* 选项卡  start */}
                {(function(){


                    /*
                     selectedIndex  默认选中
                    */

                    return (
                        <div>
                            <SegmentedControl selectedIndex={1}
                                              values={['切换一', '切换二', '切换三']}
                                              onChange={(value)=>{
                                                  debugger;
                                              }}
                                              onValueChange={(value)=>{
                                                  debugger;
                                              }}

                            />
                        </div>
                    )
                })()}
                {/* 选项卡  end */}


                {/* 日期picker  start */}
                {(function(){


                    return (
                        <div className="item">

                            <div>

                                <div  style={{border: '1px solid green'}}
                                      onClick={()=>{
                                            that.state.DatePicker.visible = true;
                                            componentStore.update(that,that.state)
                                      }}
                                >
                                    选择日期： {that.state.DatePicker.time.format('YYYY-MM-DD')}
                                </div>

                                <DatePicker
                                    className="forss"
                                    visible={that.state.DatePicker.visible}
                                    mode="date"
                                    title="选择日期"
                                    minDate={moment('2015-08-06', 'YYYY-MM-DD')}
                                    maxDate={moment('2018-12-03', 'YYYY-MM-DD')}
                                    onChange={(date)=>{
                                        that.state.DatePicker.time = date;
                                        that.state.DatePicker.visible = false;
                                        componentStore.update(that,that.state)
                                    }}
                                >

                                </DatePicker>
                            </div>

                        </div>



                    )
                })()}

                {/* 日期picker  end */}



                {/*轮播组件  start*/}
                {(function () {
                    //设置轮播图片
                    let settings = {
                        dots: true, //是否需要
                        infinite: true,
                        speed: 500,
                        autoplay : true
                    };
                    return (
                        <Carousel {...settings}>
                            <div>
                                <img className="slider-item" src={require("../../../image/temp/3.jpg")} alt=""/>
                            </div>
                            <div>
                                <img className="slider-item" src={require("../../../image/temp/3.jpg")} alt=""/>
                            </div>
                            <div>
                                <img className="slider-item" src={require("../../../image/temp/3.jpg")} alt=""/>
                            </div>
                        </Carousel>
                    )
                })()}
                {/*轮播组件  end*/}


            </div>
        )
    }
};

export default AntdTest;