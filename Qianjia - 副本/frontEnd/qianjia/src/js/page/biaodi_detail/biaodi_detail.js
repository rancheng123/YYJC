import React, { Component, PropTypes } from 'react';

import { Button ,Checkbox } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;





//导入样式 start
import './biaodi_detail.scss'
//导入样式 end



class ChildComponent extends Component{
    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <div ref="bbb">this is childComponent</div>
            </div>
        )
    }
}


class Dome extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            dataList: [{
                isChecked: true,
                value: 11111,
                obj: {
                    a: false
                }
            },{
                isChecked: false,
                value: 2222
            },{
                isChecked: false,
                value: 3333
            }],
            imgList: []
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

    doubleBind(obj){

        var index = obj.target['data-index']
        this.state.dataList[index].checked = obj.target.checked;
        componentStore.update(this,{
            dataList: this.state.dataList
        })
    }
    deleteItem(ev){

        var li = closest(ev.target, '.aa')



        var index = li.getAttribute('data-index');
        delete this.state.dataList[index];
        componentStore.update(this,{
            dataList: this.state.dataList
        })
    }





    render(){
        var that = this;




        var lis = that.state.dataList.map(function(ele,i){

            return (
                <li className="aa" key={i} data-index={i} data-aaa={ele}>
                    <Checkbox ref={'checkbox'+i} className="checkbox-ran1"
                              defaultChecked={ ele.isChecked }
                              multipleLine
                              onChange={that.doubleBind.bind(that)}
                    ></Checkbox>
                    {ele.value}

                    <span onTouchStart={that.deleteItem.bind(that)}>
                        删除
                    </span>
                </li>
            )
        });


        return (
            <div className="biaodi_detail">

                <ChildComponent ref="12"></ChildComponent>

                <div ref="aaa" className="btn-container">

                    {/*
                     loading状态
                     disabled不能禁止 onTouchStart

                     1.icon="check-circle-o"
                     2.icon={require('!svg-sprite!./reload.svg')}

                     //点击反馈
                     activeStyle={{ backgroundColor: 'red',color:'white' }}

                    */}
                    <Button
                            className="btn-ran1"
                            activeStyle={{ backgroundColor: 'red',color:'white' }}


                            onClick={()=>{
                                console.log('btn-ran1')
                            }}


                            icon="check-circle-o"
                    >btn-ran1</Button>


                </div>


                <div>


                    <CheckboxItem  className="checkbox-ran1" key="disabled" data-seed="logId"  defaultChecked multipleLine>
                        初中辅助文字内容<br/>1111
                    </CheckboxItem>

                    <ul>
                        {lis}
                    </ul>
                </div>

            </div>
        )
    }

}

function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
}



export default Dome;


/*
  jquery
     dom 状态

  react
     数据状态



*/
