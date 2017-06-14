/**
 * Created by 李永帅 on 2017/3/21.
 */

//导入样式 start
import './navTitle.scss'
//导入样式 end

import React,{Component, propTypes } from "react" ;

import {Router , Route, Link , hashHistory} from "react-router";

//导入样式
import "./navTitle.scss";
//定义公共标题组件以及二级导航

class Title extends Component{
    constructor(){
        super();
    };
    componentWillMount(){
        this.state={
            bn:"none",
            title:'this is navTitle'
        }
    };
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
    handChange(){
        /*console.log(this)*/
        var btn=this.state.bn;

        if(btn == "none"){
            this.setState({
                bn:"block"
            })
        }else{
            this.setState({
                bn:"none"
            })
        }
    };
    cityList(){//选择城市按钮
        this.props.citys();
    };
    retreat(){//返回按钮
        this.props.retreat()
    }
    //跳转
    toHomePage(){
        this.props.toHomePage();
    }
    toInvestPage(){
        this.props.toInvestPage();
    }
    toMyPage(){
        this.props.toMyPage();
    }
    render(){
        //定义导航的等级 一级导航还是二级导航
        var grade=this.props.grade;
        var grade_child=this.props.grade_child;
        var addState=this.props.addState;

        if(grade==1){
            if(grade_child==1){
                return(
                    <div className="navPtion">
                        <ul className="glbTatle clearfix" >
                            <li onTouchStart={this.cityList.bind(this)}>{this.props.addr}</li>
                            <li>{this.props.title}</li>
                            <li onTouchStart={this.handChange.bind(this)}><img src={this.props.munIng} alt=""/></li>
                        </ul>
                        <ul className="twoNav" style={{display:this.state.bn}} >
                            <li>
                                <div className="navCont" onTouchStart={this.toHomePage.bind(this)}>
                                    <div className="navImg navImg1"></div>
                                    <div className="indexText">首页</div>
                                </div>
                            </li>
                            <li>
                                <div className="navCont"  onTouchStart={this.toInvestPage.bind(this)}>
                                    <div className="navImg navImg2"></div>
                                    <div className="investText">投资</div>
                                </div>
                            </li>
                            <li>
                                <div  className="navCont"  onTouchStart={this.toMyPage.bind(this)}>
                                    <div className="navImg navImg3">{/*<img src={require("../../../image/iconMy.png")} alt=""/>*/}</div>
                                    <div className="myText">我的</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }else if(grade_child==2){
                return(
                    <div className="navPtion">
                        <ul className="glbTatle clearfix" >
                            <li style={{display:this.props.addState}} onTouchStart={this.cityList.bind(this)}>{this.props.addr}</li>
                            <li>{this.props.title}</li>
                            <li onTouchStart={this.handChange.bind(this)}><img src={this.props.munIng} alt=""/></li>
                        </ul>
                        <ul className="twoNav" style={{display:this.state.bn}} >
                            <li>
                                <div className="navCont" onTouchStart={this.toHomePage.bind(this)}>
                                    <div className="navImg navImg1 navImg-1"></div>
                                    <div className="investText">首页</div>
                                </div>
                            </li>
                            <li>
                                <div className="navCont" onTouchStart={this.toInvestPage.bind(this)}>
                                    <div className="navImg navImg2 grade_child_2"></div>
                                    <div className="indexText">投资</div>
                                </div>
                            </li>
                            <li>
                                <div  className="navCont" onTouchStart={this.toMyPage.bind(this)}>
                                    <div className="navImg navImg3">{/*<img src={require("../../../image/iconMy.png")} alt=""/>*/}</div>
                                    <div className="myText">我的</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }else if(grade_child==3){
                return(
                    <div className="navPtion">
                        <ul className="glbTatle clearfix" >
                            <li style={{display:this.props.addState}} onTouchStart={this.cityList.bind(this)}>{this.props.addr}</li>
                            <li>{this.props.title}</li>
                            <li onTouchStart={this.handChange.bind(this)}><img src={this.props.munIng} alt=""/></li>
                        </ul>
                        <ul className="twoNav" style={{display:this.state.bn}} >
                            <li>
                                <div className="navCont" onTouchStart={this.toHomePage.bind(this)}>
                                    <div className="navImg navImg1 navImg-1"></div>
                                    <div className="investText">首页</div>
                                </div>
                            </li>
                            <li>
                                <div className="navCont" onTouchStart={this.toInvestPage.bind(this)}>
                                    <div className="navImg navImg2"></div>
                                    <div className="myText">投资</div>
                                </div>
                            </li>
                            <li>
                                <div  className="navCont" onTouchStart={this.toMyPage.bind(this)}>
                                    <div className="navImg navImg3 navImg-3">{/*<img src={require("../../../image/iconMy.png")} alt=""/>*/}</div>
                                    <div className="indexText">我的</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }
        }else if(grade==2){
            return(
                <div className="navPtion">
                    <ul className="glbTatle clearfix" >
                        <li style={{display:this.props.addState}} onTouchStart={this.retreat.bind(this)}><a className="icon_left"><img src={require("../../../image/icon/g_left_icon.png")} alt=""/></a></li>
                        <li>{this.props.title}</li>
                        <li></li>
                    </ul>
                </div>
            )
        }
    }
}
export default Title;