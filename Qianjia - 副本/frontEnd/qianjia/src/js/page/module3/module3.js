import React, { Component, PropTypes } from 'react';
import { render ,findDOMNode } from 'react-dom';




import { Router, Route, Link ,hashHistory} from 'react-router';

import ReactIscroll from '../../widget/isScroll/react-isScroll';



import ImagePickerExample from '../../widget/imagePicker/imagePicker'
import Picker from '../../widget/picker/picker';
import globalData from './data'
//导入样式 start
import './module3.scss'
//导入样式 end
import { Icon, Grid ,Button ,Popup,List,InputItem } from 'antd-mobile';


import { Modal ,Toast} from 'antd-mobile';




/* 自定义验证 start*/
import Validate from '../../widget/react-validate/react-validate';

/* 自定义验证 end*/

/*模块  start*/
import Brands from '../../module/brandList/brandList';
import AntdTest from './antdTest';

/*模块  end*/





class Dome extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        var that = this;
        // 存储 start
        componentStore.set(this);
        // 存储 end

        that.init();
    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    getProgramList(obj){

        var that = this;
        if (obj.isUpdate) {

            //数据通讯  start
            Utils.requestData({
                //url: config.mock_baseUrl + 'api/module3/getProgramList',
                url: '/api/module3/getProgramList',
                method: 'get',
                data: {
                    a: 1,
                    b: 2
                },
                callback: function(programListData){

                    if (obj.directionY == 'toUp') {
                        componentStore.update(that, {
                            dataList: programListData.data.concat(that.state.dataList)
                        })

                    } else {
                        componentStore.update(that, {
                            dataList: that.state.dataList.concat(programListData.data)
                        })
                    }
                }
            });
        }
    };
    componentWillMount(){
        //在此处初始化状态
        this.state={
            dataList: [],

            form: {
                name: '12',
                price: '10',
                store: '',
                area: {
                    id: [],
                    value: ['请选择']
                },
                imgList:  [{
                    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
                    id: '2121',
                }, {
                    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
                    id: '2122',
                }],
                password: '',
                confirmPassword: '',
                brand: ''
            },
            brandList: [],

            listView: {
                data: [],
                visible: false,
                currentPage: 0
            }
        }
    };
    init(){
        var that = this;

        //获取项目列表
        this.getProgramList({
            currentPage: 1,
            isUpdate: true,
            directionY: "toDown"
        });


        if(false){
            //获取地区
            this.state.form.area = {
                id: ["02", "01-1", "01"],
                value: ["上海02", "黄埔区01-1", "西四01"]
            }
            componentStore.update(this,this.state)
        }


        //获取品牌列表
        setTimeout(function(){
            that.state.brandList = [{
                name: 'xinlang',
                active: false
            },{
                name: 'baidu',
                active: false
            },{
                name: 'wangyi',
                active: false
            }]
            componentStore.update(that,that.state)

        },300);


        //that.getListViewData_first();




    };

    getListViewData_first(){
        var that = this;

        that.state.listView.currentPage = Utils.Storage.get('posEle').pageNum;

        //数据通讯  start
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module3/getListViewData',
            method: 'get',
            data: {
                a: 1,
                b: 2
            },
            callback: function(programListData){

                var responsedata = programListData.data[that.state.listView.currentPage];

                if(responsedata.length<10){
                    that.state.listView.visible = false;
                }else{
                    that.state.listView.visible = true;

                }
                that.state.listView.data  = that.state.listView.data.concat(responsedata);
                componentStore.update(that,that.state);
            }
        });
    }

    getListViewData(){
        var that = this;

        that.state.listView.currentPage++;

        //数据通讯  start
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module3/getListViewData',
            method: 'get',
            data: {
                a: 1,
                b: 2
            },
            callback: function(programListData){

                var responsedata = programListData.data[that.state.listView.currentPage];

                if(responsedata.length<10){
                    that.state.listView.visible = false;
                }else{
                    that.state.listView.visible = true;

                }
                that.state.listView.data  = that.state.listView.data.concat(responsedata);
                componentStore.update(that,that.state);
            }
        });


    }

    render(){
        var that = this;

        var lis = this.state.dataList.map(function(ele,i){



            if(ele.isGold){
                var btn = (
                    <span className="btn-red btn-red-2line">
                        13:25:56<br/>
                        后结束
                    </span>
                )
                var goldIcon = <img className="year-shouyi" src={require('../../../image/floatRate.png')} alt=""/>
            }else{
                var btn = (
                    <span className="btn-red">立即投资</span>
                );
                var goldIcon = '';
            }


            return (
                <li key={i} onClick={()=>{

                    Utils.switchRoute('/biaodi_detail')
                }}>
                    <div className="item">

                        <img src="blank.gif" data-src={ele.img} alt="" height={80} width={100} className="lazy"/>


                        <div className="item_title">{ele.title}</div>
                        <div className="item_desc flex-father">
                            <div className="item_desc_item flex-child1">
                                <div className="item_desc_item_value">
                                    <span className="percentNum">{parseFloat(ele.income)}</span><span className="percentHao">%</span>
                                    {goldIcon}
                                </div>
                                <div className="item_desc_item_name">预期年化收益率</div>
                            </div>
                            <div className="item_desc_item flex-child1">
                                <div className="item_desc_item_value">
                                    <div className="pt10">
                                        <span className="ft40">{ele.term}</span>个月
                                    </div>
                                </div>
                                <div className="item_desc_item_name">项目期限</div>
                            </div>
                            <div className="item_desc_item flex-child1">
                                <div className="item_desc_item_value">
                                    <div className="pt10">
                                        <span className="ft40">{ele.amount}</span>万
                                    </div>
                                </div>
                                <div className="item_desc_item_name">融资总额</div>
                            </div>
                            <div className="item_desc_item ">
                                {btn}
                            </div>
                        </div>
                        <div className="item-progress">
                            <div className="item-progress-inner" style={{width:ele.percent}}></div>
                        </div>
                        <div className="item-ketou flex-father">
                            <div className="flex-child1">
                                已投 {ele.percent}
                            </div>
                            <div>
                                可投金额 {ele.ktMoney}万元
                            </div>
                        </div>
                    </div>


                </li>
            )
        });





        var arr = [1,2,3,4,5,6,7,8,9]

        return (
            <div className="module3">





                <div style={{display:'block'}}>

                    <AntdTest $id="module3-antdTest">

                    </AntdTest>



                    <Validate ref="validator" $id="module3_validate" onError={(obj)=>{
                        //console.error('元素'+rule+'验证未通过')
                        Modal.alert('提示',obj.errorMsg, [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                        ])


                        {/*Toast.info(obj.errorMsg, 2);*/}
                    }}>

                        <div data-validName="brands"
                             data-validRules={[{
                                 name: 'require'
                             }]}
                             data-validMsgPrefix={'品牌：'}
                             data-valid-setValue={()=>{
                                 return that.state.form.brand? '1': ''
                             }}
                        >
                            <Brands $id="module3-brands"


                                    selected={(()=>{
                                        return that.state.form.brand
                                    })()}
                                    data={(()=>{
                                        return that.state.brandList
                                    })()}
                                    onChange={(index)=>{

                                        var dom = findDOMNode(that)




                                        that.state.form.brand = that.state.brandList[index].name;
                                        componentStore.update(that,that.state)
                                    }}
                            >

                            </Brands>
                        </div>



                        <div>
                            姓名： <input type="text" value={that.state.form.name}
                                       onChange={(obj)=>{
                                           that.state.form.name = obj.target.value;

                                           componentStore.update(that,that.state)

                                       }}

                                       data-validName="name"
                                       data-validRules={[{
                                           name: 'require'
                                       },{
                                           name: 'isIntGt0'
                                       },{
                                           name: 'range',
                                           params: [0,3]
                                       }]}
                                       data-validMsgPrefix={'姓名：'}/>

                        </div>

                        <div>
                            价格： <input type="text"  value={that.state.form.price}
                                       onChange={(obj)=>{
                                           that.state.form.price = obj.target.value;
                                           componentStore.update(that,that.state)
                                       }}

                                       data-validName="price"
                                       data-validRules={[
                                           {
                                               name: 'require'
                                           },{
                                               name: 'isIntGt0'
                                           }
                                       ]}
                                       data-validMsgPrefix={'价格：'}/>

                        </div>

                        <div>
                            库存： <input type="text"  value={that.state.form.store}
                                       onChange={(obj)=>{
                                           that.state.form.store = obj.target.value;
                                           componentStore.update(that,that.state)
                                       }}

                                       data-validName="store"
                                       data-validRules={[{
                                           name: 'isIntGt0'
                                       }]}
                                       data-validMsgPrefix={'库存：'}/>

                        </div>

                        <div>
                            密码： <input type="text" value={that.state.form.password}
                                       onChange={(obj)=>{
                                           that.state.form.password = obj.target.value;
                                           componentStore.update(that,that.state)
                                       }}

                                       data-validName="password"
                                       data-validRules={[{
                                           name: 'require'
                                       },{
                                           name: 'equal',
                                           params: {
                                               name: 'confirmPassword',
                                               chinese: '确认密码'
                                           }
                                       }]}
                                       data-validMsgPrefix={'密码：'}/>

                        </div>
                        <div>
                            确认密码： <input type="text"  value={that.state.form.confirmPassword}
                                         onChange={(obj)=>{
                                             that.state.form.confirmPassword = obj.target.value;
                                             componentStore.update(that,that.state)
                                         }}

                                         data-validName="confirmPassword"
                                         data-validRules={[{
                                             name: 'require'
                                         }]}
                                         data-validMsgPrefix={'确认密码：'}/>

                        </div>

                        <div data-validName="images"
                             data-validRules={[{
                                 name: 'require'
                             }]}
                             data-valid-setValue={()=>{
                                 return document.getElementsByClassName('am-image-picker-item-content').length>=1? '1': ''
                             }}
                             data-validMsgPrefix={'图片：'}>

                            <ImagePickerExample
                                $id="module3-imagePicker"
                                files={that.state.form.imgList}
                                onChange={(files, type, index) => {
                                    that.state.form.imgList = files;
                                    componentStore.update(that, that.state)
                                }}>
                            </ImagePickerExample>
                        </div>

                        <div data-validName="area"
                             data-validRules={[{
                                 name: 'require'
                             }]}
                             data-valid-setValue={()=>{
                                 var value = that.state.form.area.value.join(',');
                                 return value=='请选择'?'':value;
                             }}
                             data-validMsgPrefix={'地区：'}>

                            <Picker $id="picker-test1"
                                    onYes={(data)=>{

                                        console.log(data)
                                        that.state.form.area.value = data.textArr;
                                        that.state.form.area.id = data.idArr;
                                        componentStore.update(that,that.state)
                                    }}
                                    onChange={(value)=>{
                                        console.log(value)
                                    }}
                                    defaultValue={that.state.form.area.id}
                                    title="选择地区"
                                    data={globalData.data}
                            >
                                <div>
                                    {this.state.form.area.value.join(',')}
                                </div>

                            </Picker>
                        </div>






                        <div>
                            <input type="button" value="下一步" onClick={()=>{

                                Utils.eventHanlder(function(){


                                    that.refs.validator.validate({
                                        callback: function(res){
                                            if(res){
                                                console.log('通过')
                                            }
                                        }
                                    });

                                })


                            }}/>

                            <input type="button" value="验证单个" onClick={()=>{
                                that.refs.validator.validate({
                                    eleName: 'name',
                                    callback: function(res){
                                        if(res){
                                            console.log('通过')
                                        }
                                    }
                                });
                            }}/>
                        </div>

                    </Validate>





                    <section className="module3_head flex-father" ref="aaa">
                        <div className="module3_address flex-child1">北京</div>
                        <div className="module3_title flex-child1">钱夹</div>
                        <div className="module3_slideBtn flex-child1">
                            <span className="btn_slide"></span>
                        </div>
                    </section>
                    <section>
                        <img src={require('../../../image/temp/1.png')} alt=""/>

                    </section>
                    <section className="messageBar" >
                        <span className="icon-speaker"></span>
                        看黑色大丽花够你的事山东龙口改好了可适当
                    </section>

                    <div className="module3_listWrap" >
                        <section>
                            <div className="title">
                                <div className="title_line"></div>
                                <div className="title_content translateCenter">
                                    <span className="icon-clock"></span>
                                    <span className="title_text">限时抢购</span>
                                </div>
                            </div>



                                <ReactIscroll $id="module3-reactIscroll"
                                              isScrollOpts={{
                                                  preventDefault: false,
                                                  //支持滚轮
                                                  mouseWheel: true ,
                                                  //请用scoll事件
                                                  //probeType: 3,
                                              }}
                                              customOpts={{
                                                  // 滑动区域高度
                                                  height:300,
                                                  // 接口返回数据总条数
                                                  dataNum: 34,
                                                  // 一次加载的条数
                                                  pageSize: 10,
                                                  // 监测到用户想要获取数据的回调 （内部填写ajax代码）
                                                  getDataFn: (obj)=>{
                                                      that.getProgramList(obj)
                                                  }
                                              }}
                                >
                                    <ul>
                                        {lis}
                                    </ul>
                                </ReactIscroll>









                        </section>
                    </div>

                    <div className="footer">

                    </div>

                    <div onTouchStart={() => {
                        Utils.switchRoute('/indexpage')
                    }}>
                        indexpage
                    </div>
                    <div onTouchStart={() => {
                        Utils.switchRoute('/homeModule')
                    }}>
                        homeModule
                    </div>

                    <div onTouchStart={() => {
                        Utils.switchRoute('/biaodi_detail')
                    }}>
                        biaodi_detail
                    </div>



                    <Icon type='check'/>
                    <Icon type='check-circle'/>

                    <div>
                        <Button className="btn" type="primary">primary 按钮</Button>
                        <Button className="btn" disabled onClick={e => console.log(e)}>disabled 按钮</Button>
                        <Button className="btn" loading>loading 按钮</Button>
                    </div>

                    <div onClick={(e) => {
                        e.preventDefault(); // 修复 Android 上点击穿透
                        Popup.show(<PopupContent></PopupContent>, {
                            function(){
                                debugger;
                            }
                        });
                    }}>
                        PopupTest
                    </div>


                </div>



            </div>
        )
    }

}

export default Dome;
