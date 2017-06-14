import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import LazyLoad from '../../src/index';
import Widget from '../../src/Widget';
import _ from 'underscore';
import classNames from 'classnames';
//引入公共部分组件语法import...from....
import Title from '../../module/navTitle/navTitle';             //引入头部及导航组件
import ProjectList from '../../module/projectList/projectList';//引入项目列表组件
import {Result , RefreshControl, ListView , SwipeAction , Progress , Steps,NoticeBar, Icon, Card, WingBlank, WhiteSpace  , Carousel , Accordion, List ,Grid ,Tag , ActivityIndicator ,Popup, Button, InputItem} from 'antd-mobile';          //蚂蚁金服插件
import Modal from '../../module/modal/modal'                      //弹窗提示组件

//导入样式 start
//引入scss语法 import...跟样式文件位置
import '../../../scss/base/common.scss';
import './home.scss';
//导入样式 end
//定义组件语法class ... extends Component{...}
var _that=null;
class HomeModule extends Component {
    //_that = this;
    constructor(){
        super();
        this.state={
            bannerImg: ['1.','2.','3.'],
            initialHeight: 200,
            ggList:['公告1','公告2','公告3','公告4','公告5'],
            isDownload:"block"
        }
    };
    componentWillMount(){

    }
    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end
        /*setTimeout(function(){
            this.setState({
                data: ['1.','2.','3.'],
            });
        }.bind(this), 100);*/
    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    handClick(){
        this.setState({
            btnSt:true
        })
    }
    cityList(){
        alert("请选择城市")
    }
    //下载app提示
    onTouch(){
        alert("你点击了下载按钮！")
    }
    //点击取消
    onClose(){
        this.setState({
            isDownload:"none"
        })
    }
    //二级导航跳转
    homePage(){
        Utils.switchRoute('home')
    }
    investPage(){
        //alert('invest');
        Utils.switchRoute('/invest')
    }
    myPage(){
        Utils.switchRoute('/my')
    }
    render(){
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        /*console.log("btnSt----:"+this.state.btnSt);*/

        return (
            <div>
                <div className="home clearfix">
                    <Title
                        title={"钱夹"}
                        $id="navTitle"
                        munIng={require("../../../image/mbtn.png")}
                        addr={"北京"}
                        citys={this.cityList}
                        grade="1"
                        grade_child="1"
                        toHomePage={this.homePage.bind(this)}
                        toInvestPage={this.investPage.bind(this)}
                        toMyPage={this.myPage.bind(this)}
                    >
                    </Title>
                </div>
                {/* 轮播 */}
                <Carousel
                    className="my-carousel" autoplay={true} infinite selectedIndex={0}
                >
                    {this.state.bannerImg.map(i => (
                        <a href="" onTouchStart={function(){alert('这是轮播图的跳转地址！')}} key={i} style={hProp}>
                            <img
                                src={require("../../../image/advertising/demo"+i+"jpg")}
                            />
                        </a>
                    ))}
                </Carousel>
                {/* 公告 */}
                <div className="gg_module">
                    <span className="span span_left">
                        <span><img src={require('../../../image/icon/gg_text.png')} alt=""/></span>
                    </span>
                    <span className="span span_center">
                        <Carousel className="my-carousel"
                                  dots={false} dragging={false} swiping={false} autoplay infinite vertical
                        >
                            {this.state.ggList.map(function(n){
                                return (
                                    <a href="" onTouchStart={function (n) {alert("这是一个公告跳转未加地址呢")}} key={n}>
                                        <span className="v-item">{n}</span>
                                    </a>
                                )
                            })}
                        </Carousel>
                    </span>
                    <span className="span span_right">
                        <span onTouchStart={function(){alert('这是跳转到公告列表的地址')}}><img src={require('../../../image/icon/gg_search.png')} alt=""/></span>
                    </span>
                </div>
                {/* 项目列表 */}
                <div className="project">
                    <LoadingList>
                    </LoadingList>
                </div>
                {/*  下载app提示 */}
                <DownloadApp $id="DownloadApp" isDownLoad={this.state.isDownload} onClose={this.onClose.bind(this)} onTouch={this.onTouch.bind(this)}>

                </DownloadApp>
            </div>

        )
    }

};
//项目列表逻辑层业务处理
const dataD = [
    {
        projectImg:require("../../../image/project-img-1.png"),//项目图片
        projectTitle:"新项目标题",                                //项目标题
        income:"18",                                               //项目的年化收益率
        staten:"block",                                            //是否有浮动收益有就block无则none
        time:"20",                                                  //标的的时间(例如：20个月的标)
        wholeMoney:"500",                                          //融资总金额
        progressValue:"60",                                        //融资进度（60代表60%）
        moneyProgress:"300",                                       //已经投资了多少金额
        differ:"200",                                               //还剩多少金额可投资
        giftName:"一车空气",                                        //赠品的名称
        floatRate:require("../../../image/floatRate.png"),       //浮动收益的图片
        giftState:"none",                                            //项目是否有满赠活动（有就 block 无则 none）
        countDownBtn:"block",                                        //倒计时项目block 可以投资的项目就隐藏此处none  注意：：：这个状态与下面的状态时刻相反不能同时保持一样
        stateBtn:"none"                                               //可以投资的是block 若是倒计时的项目none
    },
    {
        projectImg:require("../../../image/project-img-1.png"),//项目图片
        projectTitle:"新项目标题2",                                //项目标题
        income:"18",                                               //项目的年化收益率
        staten:"none",                                            //是否有浮动收益有就block无则none
        time:"20",                                                  //标的的时间(例如：20个月的标)
        wholeMoney:"500",                                          //融资总金额
        progressValue:"60",                                        //融资进度（60代表60%）
        moneyProgress:"300",                                       //已经投资了多少金额
        differ:"200",                                               //还剩多少金额可投资
        giftName:"一车空气",                                        //赠品的名称
        floatRate:require("../../../image/floatRate.png"),       //浮动收益的图片
        giftState:"none",                                            //项目是否有满赠活动（有就 block 无则 none）
        countDownBtn:"none",                                        //倒计时项目block 可以投资的项目就隐藏此处none  注意：：：这个状态与下面的状态时刻相反不能同时保持一样
        stateBtn:"block"                                               //可以投资的是block 若是倒计时的项目none
    }

]
let indexC = dataD.length - 1;

const NUM_ROWSC = 20;
let pageIndexC = 0;
class LoadingList extends Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.genData = (pIndex = 0) => {
            const dataBlob = {};
            for (let i = 0; i < NUM_ROWSC; i++) {
                const ii = (pIndex * NUM_ROWSC) + i;
                dataBlob[`${ii}`] = `row - ${ii}`;
            }
            return dataBlob;
        };

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            isLoading: true,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        this.refs.lv.refs.listview.scrollTo(15, 15);


        // 数据请求Ajax
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }
    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
            });
        }
    }
    onEndReached (event) {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        //console.log('reach end', event);
    }
    toRegister(){
        Utils.switchRoute('/register')
    }

    render() {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} style={{

            }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (indexC < 0) {
                indexC = dataD.length - 1;
            }
            const obj = dataD[indexC--];
            //console.log(obj)
            return (
                <div>
                    <ProjectList
                        $id={rowID}
                        btn={obj.btn}
                        projectImg={obj.projectImg}
                        staten={obj.staten}
                        stateBtn={obj.stateBtn}
                        projectTitle={obj.projectTitle}
                        income={obj.income}
                        time={obj.time}
                        wholeMoney={obj.wholeMoney}
                        moneyProgress={obj.moneyProgress}
                        differ={obj.differ}
                        floatRate={obj.floatRate}
                        pjtState={obj.pjtState}
                        giftName={obj.giftName}
                        giftState={obj.giftState}
                        progressValue={obj.progressValue}
                        countDownBtn={obj.countDownBtn}
                    >
                    </ProjectList>
                </div>
            )
        };
        return (
            <ListView ref="lv"
                      dataSource={this.state.dataSource}
                      renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                          {this.state.isLoading ? '加载中...' : '加载完毕'}
                      </div>}
                      renderRow={row}
                      renderSeparator={separator}
                      className="am-list"
                      pageSize={4}
                      scrollRenderAheadDistance={500}
                      scrollEventThrottle={20}
                //onScroll={() => { console.log('scroll'); }}
                      useBodyScroll
                      onEndReached={this.onEndReached.bind(this)}
                      onEndReachedThreshold={10}
            />
        );
    }
}
//下载app提示模块
class DownloadApp extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){

    }
    componentDidMount(){
        componentStore.set(this);
    }
    componentWillUnmont(){
        componentStore.clear(this);
    }
    //取消
    onClose(){
        this.props.onClose();
    }
    //下载
    onTouch(){
        this.props.onTouch();
    }
    render(){
        return (
                <div className="download_box" style={{display:this.props.isDownLoad}}>
                    <div className="download_close">
                        <div onTouchStart={this.onClose.bind(this)}>
                            <img src={require('../../../image/icon/download_close.png')} />
                        </div>
                    </div>
                    <div className="download_logo">
                        <div>
                            <img src={require("../../../image/icon/download_logo.png")} />
                        </div>
                    </div>
                    <div className="download_text">
                        钱夹APP<br />
                        <span>短标高息助力实体，上市公司还本付息</span>
                    </div>
                    <a name="__首页_APP_下载" href="" onTouchStart={this.onTouch.bind(this)} className="download_btn" >
                        <div>立即下载</div>
                    </a>
                </div>
        )
    }
}
//一个页面只能抛出一个默认组件
export default HomeModule;
