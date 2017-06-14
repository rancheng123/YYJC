import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import LazyLoad from '../../src/index';
import Widget from '../../src/Widget';
import _ from 'underscore';
import classNames from 'classnames';
//引入公共部分组件语法import...from....
import Title from '../../module/navTitle/navTitle';             //引入头部及导航组件
import ProjectList from '../../module/projectList/projectList';//引入项目列表组件
import Banner from '../../module/banner/banner';                //引入banner组件
import Trundle from '../../module/trundle/trundle';              //引入消息轮播组件
//import Button from '../../../scss/button/button';                //引入按钮组件
//import Input from '../../module/input/input'                     //引入按钮的组件
import {Result , RefreshControl, ListView , SwipeAction , Progress , Steps,NoticeBar, Icon, Card, WingBlank, WhiteSpace  , Carousel , Accordion, List ,Grid ,Tag , ActivityIndicator ,Popup, Button, InputItem} from 'antd-mobile';          //蚂蚁金服插件
import Modal from '../../module/modal/modal'                      //弹窗提示组件

//导入样式 start
//引入scss语法 import...跟样式文件位置
import '../../../scss/base/common.scss';
import './homeModule.scss';
//导入样式 end
//定义组件语法class ... extends Component{...}
var _that=null;
class HomeModule extends Component {
    //_that = this;
    constructor(){
        super();
    };
    componentWillMount(){

        this.state={
            st:'1',
            btnSt:false,
            data : [
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

            ],
            imges:[//轮播图的维护此处
                {
                    src:require("../../../image/advertising/demo1.jpg"),
                    alt: 'images-1',
                },
                {
                    src: require("../../../image/advertising/demo2.jpg"),
                    alt: 'images-2',
                },
                {
                    src:require("../../../image/advertising/demo3.jpg"),
                    alt: 'images-3',
                }
            ],
            infos:["新闻1","新闻2","新闻3","新闻4"],
            motailState:'display'
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
    handClick(){
        this.setState({
            btnSt:true
        })
    }
    cityList(){
        alert("请选择城市11111")
    }
    render(){
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
                    {/*<Title
                        title={"钱夹"}
                        $id="navTitle"
                        munIng={require("../../../image/mbtn.png")}
                        addr={"北京"}
                        citys={this.cityList}
                        grade="1"
                    >
                    </Title>*/}
                </div>
                <Banner $id="Banner" imges={this.state.imges}
                        play={true}//是否自动轮播 true  禁止轮播 false
                        delayTime={2}//轮播停留的时间（2-3）不宜太大或者太小   太大轮播的太慢   太小轮播的停留时间过短用户体验太差
                        interval={0.5}//轮播的过度时间越小越好
                >
                </Banner>
                <Carousel autoplay{...settings} >
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
                <Trundle  $id="trundle" intervalTime={3} infos={this.state.infos} overTime={1} >
                </Trundle>
                <div className="hull">
                    {
                        this.state.data.map(function(item,i){
                            return (
                                <ProjectList
                                    $id={"List"+i}
                                    key={i} btn={item.btn}
                                    projectImg={item.projectImg}
                                    staten={item.staten}
                                    stateBtn={item.stateBtn}
                                    projectTitle={item.projectTitle}
                                    income={item.income}
                                    time={item.time}
                                    wholeMoney={item.wholeMoney}
                                    moneyProgress={item.moneyProgress}
                                    differ={item.differ}
                                    floatRate={item.floatRate}
                                    pjtState={item.pjtState}
                                    giftName={item.giftName}
                                    giftState={item.giftState}
                                    progressValue={item.progressValue}
                                    countDownBtn={item.countDownBtn}
                                >
                                </ProjectList>
                            )
                        })
                    }
                </div>
                <Link to="/module2">测试跳转，点击我调到module2</Link>
               {/* <Input $id="input" />*/}
                {/*<Button content="点我看看" click={this.handClick.bind(this)} $id="modulA" bkg="blur"  ></Button>*/}
                {/*<Normal></Normal>*/}
                <Modal $id="modal"
                       leftBtn="下次再说"
                       rightBtn="立即开通"
                       text="钱夹理财交易资金由汇付天下全程托管"
                       title="开通汇付账单"
                       defaultState={this.state.motailState}
                       st={this.state.st}
                       safe="1"
                       btnSt={this.state.btnSt}
                >
                </Modal>
                {/*<InputList></InputList>*/}
                <Cards></Cards>
                <Grids></Grids>
                <Notice></Notice>
                <ProgressStep></ProgressStep>
                <TagSpan></TagSpan>
                <Lodings></Lodings>
                <ProgressLys $id="ProgressLys"></ProgressLys>
                <Test $id="PopupLys"></Test>
                <TestBottom $id="TestBottom"></TestBottom>
                <SwipeActionExample $id="SwipeActionExample"></SwipeActionExample>
                <div>上拉刷新</div>
                <BottomScroll $id="BottomScroll"></BottomScroll>
                <div>列表</div>
                {/*<LanLoding></LanLoding>*/}
                <div>body作为滚动条</div>
                <LanLodingBody></LanLodingBody>
                <div>成功失败组件</div>
                <ErrorOrSuce></ErrorOrSuce>
            </div>

        )
    }

};
//一个页面只能抛出一个默认组件
export default HomeModule;
//懒加载组件测试阶段代码

//定义一个方法截取  ID
function uniqueId() {
    return (Math.random().toString(36) + '00000000000000000').slice(2, 10);
}
//组件代码
var numA=30;
class Normal extends Component {
    constructor() {
        super();

        const id = uniqueId();//独特的ID
        this.state = {
            arr: Array.apply(null,Array(numA)).map((a, index) => {
                return {
                    uniqueId: id,
                    once: [3, 4].indexOf(index) > -1
                };
            })
        };
    }

    handleClick() {
        const id = uniqueId();

        this.setState({
            arr: this.state.arr.map(function(el){
                return {
                    uniqueId: id
                };
            })
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div>
                    {this.state.arr.map((el, index) => {
                        return (
                            <LazyLoad once={el.once} key={index} height={200} offset={[-100, 0]}>
                                <Widget once={el.once} id={el.uniqueId} count={index + 1} />
                            </LazyLoad>
                        );
                    })}
                </div>
            </div>
        );
    }
}

//手风琴下拉框展示
    /*class InputList extends React.Component {
        constructor(){
            super()
        }
        componentWillMount(){
            this.state={
                listBtns:["XIXI","HAHA","GAGA","HOHO"]
            }
        }
        onChange (key) {
            console.log(key)
        }
        render() {
            let bb=this.state.listBtns;
            let aa=[];
            bb.map(function(btn){
                aa.push(<List.Item >{btn}</List.Item>)
            })
            return (
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Accordion defaultActiveKey="tt1" className="my-accordion" >
                        <Accordion.Panel header="标题一" key="tt1" >
                            <List className="my-list">
                                {aa}
                            </List>
                        </Accordion.Panel>
                        <Accordion.Panel header="标题二" className="pad">this is panel content2 or other</Accordion.Panel>
                        <Accordion.Panel header="标题三" className="pad">
                            文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本
                        </Accordion.Panel>
                    </Accordion>
                </div>
            );
        }
    }

*/
//卡片
class Cards extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card full>
                        <Card.Header
                            title="这是四号餐厅的商铺"
                            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                            extra={<div>离开几乎都是</div>}
                        />
                        <Card.Body>
                            <div>这是卡片内容这是卡片内容这是卡片内容这是卡片内容这是卡片内容这是卡片内容这是卡片内容这是卡片内容这是卡片内容这是卡片内容这是卡片内容</div>
                        </Card.Body>
                        <Card.Footer content="这是卡尾" extra={<div>这是尾部介绍</div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        )
    }
}
//九宫格

const data = Array.from(new Array(9)).map((_val, i) => ({
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: `名字${i}`,
}));

const data1 = Array.from(new Array(5)).map((_val, i) => ({
    img: 'https://zos.alipayobjects.com/rmsportal/wIjMDnsrDoPPcIV.png',
    text: `名字${i}`,
}));

class Grids extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Grid data={data} columnNum={5} hasLine={true} onClick={function(index){console.log(index.text);console.log(index.icon)}} />
            </div>
        )
    }
}
//通知栏样式组件
class Notice extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <WhiteSpace size="lg" />
                <NoticeBar mode="closable" marqueeProps={{ loop:true, style: { padding: '0 0.15rem' } }} icon={<Icon type="check-circle-o" size="xxs" />}>
                    通告庆期间大放价大减价大放价大减价大放价大减价大放价大减价大放价大减价，特此通知--循环轮播国可以关闭组件
                </NoticeBar>
                <WhiteSpace size="lg" />
                <NoticeBar mode="link" onClick={() => alert('1')} marqueeProps={{ loop:false, style: { padding: '0 0.15rem' } }}>
                    国庆期间大放价大减价大放价大减价大放价大减价大放价大减价大放价大减价大放价大减价大放价大减价，特此通知--只播放一次可以跳转组件
                </NoticeBar>
                <WhiteSpace size="lg" />

            </div>
        )
    }
}
//银行提现完成进展
const Step = Steps.Step;
class ProgressStep extends Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <WingBlank size="lg">
                    <div className="sub-title">退款进度</div>
                    <WhiteSpace />
                    <Steps size="small" current={1}>
                        <Step title="正在处理" description="正在处理订单" />
                        <Step title="处理中" description="退款订单处理中" />
                        <Step title="退款完成" description="退款完成300元" />
                    </Steps>
                    <div className="sub-title">投资成功</div>
                    <WhiteSpace />
                    <Steps size="small" current={0}>
                        <Step title="投资成功" />
                        <Step title="收益20.55元" />
                        <Step title="收益27.55元" />
                    </Steps>

                </WingBlank>
            </div>
        )
    }
}
//标签
function onChanges(selected) {
    console.log(`tag selected: ${selected}`);
}
class TagSpan extends Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <div className="tag-container">
                    <Tag data-seed="logId">基本的标签</Tag>
                    <Tag selected>默认的</Tag>
                    <Tag disabled>只读</Tag>
                    <Tag onChange={onChanges}>选中取消标签</Tag>
                    <Tag closable onClose={() => {
                        console.log('关闭时的回调');
                    }} afterClose={() => {
                        console.log('关闭后的回调');
                    }}
                    >
                        可以关闭
                    </Tag>
                    <Tag small>只读最小的的标签</Tag>
                </div>
            </div>
        )
    }
}
//加载中的展示效果
class Lodings extends Component {
    //_this = this;
    constructor(props) {
        super(props);

    }
    componentWillMount(){
        this.state = {
            animating: false,
        };
    }
    componentWillUnmount() {
        clearTimeout(this.closeTimer);
    }
    showToast () {
        //alert('1111')
        console.log(this)
        this.setState({ animating: !this.state.animating });
        this.closeTimer = setTimeout(() => {
            this.setState({ animating: !this.state.animating });
        }, 1000);
    }
    render() {
        return (
            <div>
                <WingBlank>
                    <div className="loading-container">
                        <p className="sub-title">icon无文案</p>
                        <div className="loading-example">
                            <ActivityIndicator animating />
                        </div>
                        <WhiteSpace size="xl" />
                        <p className="sub-title">icon带文案</p>
                        <div className="loading-example">
                            <ActivityIndicator
                                text="加载中..."
                            />
                        </div>
                        <WhiteSpace size="xl" />
                        <p className="sub-title">大号icon，自定义文案样式</p>
                        <div className="loading-example">
                            <div className="align">
                                <ActivityIndicator size="large" />
                                <span style={{ marginTop: 8 }}>加载中...</span>
                            </div>
                        </div>
                    </div>
                    <div className="toast-container">
                        <WhiteSpace size="xl" />
                        <Button onClick={this.showToast.bind(this)}>点击显示 Toast</Button>
                        <div className="toast-example">
                            <ActivityIndicator
                                toast
                                text="正在加载"
                                animating={this.state.animating}
                            />
                        </div>
                    </div>
                </WingBlank>
            </div>
        );
    }
}
//进度条
class ProgressLys extends Component{
    constructor(){
        super()
    }
    componentWillMount(){
        this.state={
            percent:60
        }

    }
    componentDidMount(){
        //存储
        componentStore.set(this);
    }
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
    }
    //点击添加进度条
    add(){
        let activState = this.state.percent+10;
        if(this.state.percent>=100){
            activState=0;
        }
        this.setState({
            percent:activState
        })

    }
    render(){
       // console.log(this)
        let progressNum=this.state.percent;
        return (
            <div>
                <div className="progress-container">
                    <div className="show-info">
                        <div className="progress"><Progress percent={progressNum} position="normal" /></div>
                        <div>{progressNum}%</div>
                    </div>
                    <Button inline style={{ marginTop: 20 }} onClick={this.add.bind(this)}>进度条加10</Button>
                </div>
            </div>
        )
    }
}

//顶部下拉选择列表
//此函数可以作为组件使用
 const Test = function() {
    const onMaskClose = function(){
        console.log('onMaskClose');
        // also support Promise
        // return new Promise((resolve) => {
        //   console.log('1000ms 后关闭');
        //   setTimeout(resolve, 1000);
        // });
    };
    const onClick = function (e){
        e.preventDefault(); // 修复 Android 上点击穿透
        Popup.show(<PopupLys onClose={() => Popup.hide()} />, { onMaskClose });
    };
    // newInstance() {
    //  const ins = Popup.newInstance();
    //  ins.show(<Button onClick={() => ins.hide()}>关闭</Button>);
    // },
    return (
        <div style={{ padding: '0.15rem' }}>
            <Button onClick={onClick}>顶部下拉窗口</Button>
        </div>
    );
};
//定义备用组件当点击显示按钮时候触发此组件激活
class PopupLys extends Component{
    constructor(){
        super()
    }
    componentWillMount(){
        this.state={
            sel: '',
        }
    }
    componentDidMount(){
         componentStore.set(this)
    }
    componentWillUnmount(){
        componentStore.clear(this)
    }
    onSel (sel){
        this.setState({ sel });
        this.props.onClose();
    };
    render(){
        return (
            <div>
                <List renderHeader={() => `账户总览，选择了：${this.state.sel}`}>
                    <List.Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        onClick={() => { this.onSel('东吴证券'); }}
                    >东吴证券</List.Item>
                    <List.Item
                        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                        onClick={() => { this.onSel('西吴证券'); }}
                    >西吴证券</List.Item>
                    <InputItem value={this.state.val} onChange={val => this.setState({ val })}>输入内容</InputItem>
                </List>
            </div>
        )
    }
}
//底部上拉显示
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
    // Note: the popup content will not scroll.
    maskProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
class TestBottom extends Component{
    constructor(){
        super()
    }

    componentWillMount(){
        _that=this;
        this.state = {
            sel: '',
        };
    }
    componentDidMdount(){
        componentStore.set(this)
    }
    componentWillUnmount(){
        componentStore.clear(this)
    }
    /*   <span></span><i></i>   */
    onClick () {
        Popup.show(<div>
            <List renderHeader={() => (
                <div style={{ position: 'relative' }}>
                    委托买入
                    <span
                        style={{
                            position: 'absolute', right: 3, top: -5,
                        }}
                        onClick={() => _that.onClose('cancel')}
                    >
            <Icon type="cross" />
          </span>
                </div>)}
                  className="popup-list"
            >
                {['股票名称', '股票代码', '买入价格', '买入数量', '更多'].map((i, index) => (
                    <List.Item key={index}>{i}</List.Item>
                ))}
            </List>
            <ul style={{ padding: '0.18rem 0.3rem', listStyle: 'none' }}>
                <li>投资说明投资说明...</li>
                <li style={{ marginTop: '0.18rem' }}>
                    <Button type="primary" onClick={() => _that.onClose('cancel')}>买入</Button>
                </li>
            </ul>
        </div>, { animationType: 'slide-up', maskProps, maskClosable: false });
    };
    onClose (sel){
        this.setState({ sel });
        Popup.hide();
    };
    render() {
        return (<div style={{ padding: '0.15rem' }}>
            <Button onClick={this.onClick}>底部弹出窗口</Button>
        </div>);
    }
}
//左右滑动操作
class SwipeActionExample extends Component{
    constructor(){
        super()
    }
    componentWillMount(){
        /*this.state({

        })*/
    }
    componentDidMount(){
        componentStore.set(this)
    }
    componentWillUnmount(){
        componentStore.clear(this)
    }
    render(){
        return(
            <div>
                <List>
                    <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        right={[
                            {
                                text: '取消',
                                onPress: () => alert('您点右侧取消了'),
                                style: { backgroundColor: '#ddd', color: 'white' },
                            },
                            {
                                text: '删除',
                                onPress: () => alert('删除成功'),
                                style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}
                        left={[
                            {
                                text: '回复',
                                onPress: () => alert('回复回调'),
                                style: { backgroundColor: '#108ee9', color: 'white' },
                            },
                            {
                                text: '取消',
                                onPress: () => alert('您点左侧取消了'),
                                style: { backgroundColor: '#ddd', color: 'white' },
                            },
                        ]}
                        onOpen={() => console.log('打开')}
                        onClose={() => console.log('关闭')}
                    >
                        <List.Item
                            extra="更多"
                            arrow="horizontal"
                        >
                            左右滑动试试
                        </List.Item>
                    </SwipeAction>
                </List>

            </div>
        )
    }
}
//下拉刷新
const dataA = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: '相约酒店',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: '麦当劳邀您过周末',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '食惠周',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
let index = dataA.length - 1;

let pageIndex = 0;

class BottomScroll extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.initData = [];
        for (let i = 0; i < 20; i++) {
            this.initData.push(`r${i}`);
        }
        this.state = {
            dataSource: dataSource.cloneWithRows(this.initData),
            refreshing: false,
        };
    }
    onRefresh (){
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.initData = [`ref${pageIndex++}`, ...this.initData];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.initData),
                refreshing: false,
            });
        }, 1000);
    };
    onScroll (){
        console.log('sss');
    };
    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = dataA.length - 1;
            }
            const obj = dataA[index--];
            return (
                <div key={rowID}
                     style={{
                         padding: '0.08rem 0.16rem',
                         backgroundColor: 'white',
                     }}
                >
                    <h3 style={{ padding: 2, marginBottom: '0.08rem', borderBottom: '1px solid #F6F6F6' }}>
                        {obj.title}
                    </h3>
                    <div style={{ display: '-webkit-box', display: 'flex' }}>
                        <img style={{ height: '1.28rem', marginRight: '0.08rem' }} src={obj.img} />
                        <div style={{ display: 'inline-block' }}>
                            <p>{obj.des}-{rowData}</p>
                            <p><span style={{ fontSize: '1.6em', color: '#FF6E27' }}>35</span>元/任务</p>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={row}
                renderSeparator={separator}
                initialListSize={5}
                pageSize={5}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                onScroll={this.onScroll}
                style={{
                    height: document.documentElement.clientHeight,
                    border: '1px solid #ddd',
                    margin: '0.1rem 0',
                }}
                scrollerOptions={{ scrollbars: true }}
                refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />}
            />
        );
    }
}

//懒加载列表
//固定高度懒加载
function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const dataB = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: '相约酒店',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: '麦当劳邀您过周末',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '食惠周',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
let indexA = dataB.length - 1;

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndexA = 0;
class LanLoding extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.dataBlob = {};
        this.sectionIDs = [];
        this.rowIDs = [];
        this.genData = (pIndex = 0) => {
            for (let i = 0; i < NUM_SECTIONS; i++) {
                const ii = (pIndex * NUM_SECTIONS) + i;
                const sectionName = `Section ${ii}`;
                this.sectionIDs.push(sectionName);
                this.dataBlob[sectionName] = sectionName;
                this.rowIDs[ii] = [];

                for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                    const rowName = `S${ii}, R${jj}`;
                    this.rowIDs[ii].push(rowName);
                    this.dataBlob[rowName] = rowName;
                }
            }
            // new object ref
            this.sectionIDs = [].concat(this.sectionIDs);
            this.rowIDs = [].concat(this.rowIDs);
        };

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: true,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // this.refs.lv.refs.listview.scrollTo(0, 200);

        // simulate initial Ajax
        setTimeout(() => {
            this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                isLoading: false,
            });
        }, 600);
    }

    onEndReached (event) {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        alert('已经到底了！');
    }
    render() {
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
            }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (indexA < 0) {
                indexA = dataB.length - 1;
            }
            const obj = dataB[indexA--];
            return (
                <div key={rowID} className="row">
                    <div className="row-title">{obj.title}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
                        <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={obj.img} />
                        <div className="row-text">
                            <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>35</span>元/任务</div>
                        </div>
                    </div>
                </div>
            );
        };

        return (<div style={{ margin: '0 auto', width: '96%' }}>
            <ListView ref="lv"
                      dataSource={this.state.dataSource}
                      renderHeader={() => <span>header</span>}
                      renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                          {this.state.isLoading ? '加载中...' : '加载完毕'}
                      </div>}
                      renderSectionHeader={sectionData => (
                          <div>{`任务 ${sectionData.split(' ')[1]}`}</div>
                      )}
                      renderBodyComponent={() => <MyBody />}
                      renderRow={row}
                      renderSeparator={separator}
                      className="fortest"
                      style={{
                          height: document.documentElement.clientHeight * 3 / 4,
                          overflow: 'auto',
                          border: '1px solid #ddd',
                          margin: '0.1rem 0',
                      }}
                      pageSize={4}
                      scrollRenderAheadDistance={500}
                      scrollEventThrottle={20}
                      onScroll={() => { console.log('scroll'); }}
                      onEndReached={this.onEndReached.bind(this)}
                      onEndReachedThreshold={10}
            />
        </div>);
    }
}
//用body作为滚动下滑
/*const dataC = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: '相约酒店',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: '麦当劳邀您过周末',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '食惠周',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];*/
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
class LanLodingBody extends Component{
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
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
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
                    <div>
                        <div>
                            <span>第{rowID}条</span>
                            <i><a onTouchStart={this.toRegister}>点我呀哈哈</a></i>
                        </div>
                    </div>
                </div>
            )
        };
        return (
            <ListView ref="lv"
                      dataSource={this.state.dataSource}
                      renderHeader={() => <span>header</span>}
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


{/*<div key={rowID} className="row">
 <div className="row-title">{obj.title}</div>
 <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
 <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={obj.img} />
 <div className="row-text">
 <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.des}</div>
 <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>{rowID}</span>元/任务</div>
 </div>
 </div>

 </div>*/}
 //成功失败页面
class ErrorOrSuce extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

    }
    componentDidMount(){
        componentStore.set(this)
    }
    componentWillUnmount(){
        componentStore.clear(this)
    }
    render(){
        return (
            <div>
                <div className="result-example">
                    <div className="sub-title">支付成功</div>
                    <Result
                        img={<Icon type={require('../../../image/svg/success.svg')} className="icon" />}
                        title="支付成功"
                        message={<div><div style={{ fontSize: '0.72rem', color: '#000', lineHeight: 1 }}>998.00</div><del>1098元</del></div>}
                    />
                    <WhiteSpace />
                    <div className="sub-title">验证成功</div>
                    <Result
                        img={<Icon type="check-circle" className="icon" style={{ fill: '#1F90E6' }} />}
                        title="验证成功"
                        message="所提交内容已成功完成验证"
                    />
                    <WhiteSpace />
                    <div className="sub-title">支付失败</div>
                    <Result
                        img={<Icon type="cross-circle-o" className="icon" style={{ fill: '#F13642' }} />}
                        title="支付失败"
                        message="所选银行卡余额不足"
                    />
                    <WhiteSpace />
                    <div className="sub-title">等待处理</div>
                    <Result
                        img={<Icon type={require('../../../image/svg/wait.svg')} className="icon" />}
                        title="等待处理"
                        message="已提交申请，等待银行处理"
                    />
                    <WhiteSpace />
                    <div className="sub-title">操作失败</div>
                    <Result
                        img={<Icon type={require('../../../image/svg/operateError.svg')} className="icon" />}
                        title="操作失败"
                        message="由于你的XXX原因请您联系客服010-01000000"
                    />
                </div>
            </div>
        )
    }
}