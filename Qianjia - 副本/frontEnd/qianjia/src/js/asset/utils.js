/*
*   2017.4.13 唐丹
*       新增 : 处理状态码判断
*       使用方法 ：
                 error: {
                     '502' : function () {
                        Toast.info('连接服务器失败', 2);
                     },
                     '404' : function () {
                        Toast.info('页面不存在', 2);
                     }
                 }

* */

import 'babel-polyfill';

/* eruda start*/
var isUseEruda = location.href.match(config.debug.mobile);
if( isUseEruda ){
    const eruda = require('eruda');
    var el = document.createElement('div');
    document.body.appendChild(el);
    eruda.init({
        container: el,
        tool: ['console', 'elements']
    });
}
/* eruda end*/


import promise from 'es6-promise';
promise.polyfill();

import fetch from 'isomorphic-fetch';
import { browserHistory} from 'react-router';

class Utils{
    constructor(){

    }

    requestData(opts){
        var url = opts.url || null;
        var method = opts.method || 'post';
        var data = opts.data || {};
        var callback = opts.callback;
        var error = opts.error;


        if(method.toLowerCase() == 'get'){
            var arr = [];
            for(var key in data){
                var subStr = (key + '=' + data[key])
                arr.push(subStr)
            }

            var req = new Request(url+ '?' + arr.join('&'), {
                method: method,
                //不缓存响应的结果
                cache: 'reload'
            });
        }
        else if(method.toLowerCase() == 'post'){
            var req = new Request(url, {
                method: method,
                //不缓存响应的结果
                cache: 'reload',
                body: JSON.stringify(data)
            });
        }


       /* fetch(req)
            .then(response => response.json())
            .then(data => {
                callback && callback(data)
            })*/

        fetch(req)
            .then(response => {
                // 处理状态码
                let status = response.status;
                switch (status){
                    case 502:
                        error[502]();
                        break;
                    case 404:
                        error[404]();
                        break;
                    default:
                        return response.json(); //此处必须有返回值，否则数据返回
                        break;
                }
            })
            .then(data => {
                if (!data)return false;
                callback && callback(data)
            })
    };

    //切换路由
    switchRoute(routeStr){
        //页面无刷新切换路由
        browserHistory.push(routeStr);
    }

    //返回路由
    backRoute(){
        //页面无刷新切换路由
        let scrollTop = browserHistory.getCurrentLocation().query.scrollTop;
        if(scrollTop){
            setTimeout(function () { //定时器是为了解决进入页面直接调用window.scrollTo不执行
                window.scrollTo(0,scrollTop);
            },30)
        }
        browserHistory.goBack();
    }

    eventHanlder(callback){

        //跟踪组件更新
        var isDebug = location.href.match(config.debug.event);
        if(isDebug){
            debugger;
        }

        callback && callback()


    }

    //阻止移动端浏览器自带默认行为->页面整体上拉下拉
    preventPull(container, selectorScrollable){
        /*
        * container : 最外层元素
        * selectorScrollable : 滚动区域元素
        * */
        // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
        if (!selectorScrollable || container.getAttribute('isBindScroll')) {
            return;
        }

        // 是否是搓浏览器
        // 自己在这里添加判断和筛选
        let isSBBrowser;

        let data = {
            posY: 0,
            maxscroll: 0
        };
        let checkHasParent = function (elTarget,targetParent){  //检测父级

            if(elTarget==targetParent){
                return true;
            }
            let el = elTarget;
            while (el.parentNode){
                if(el.parentNode == targetParent){
                    el = targetParent;
                    return true;
                }else{
                    el = el.parentNode;
                }
            }
            return false;
        }
        // 事件处理
        container.addEventListener('touchstart',function (event) {

            let events = event.touches[0] || event;

            // 先求得是不是滚动元素或者滚动元素的子元素
            let elTarget = event.target;

            let elScroll;

            // 获取标记的滚动元素，自身或子元素皆可
            if ( checkHasParent(elTarget,selectorScrollable) ){
                elScroll = selectorScrollable;
            }else{
                elScroll = null;
            }

            if (!elScroll) {
                return;
            }

            // 当前滚动元素标记
            data.elScroll = elScroll;

            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop;
            // 是否可以滚动
            data.maxscroll = elScroll.scrollHeight - elScroll.clientHeight;
        })
        container.addEventListener('touchmove',function (event) {
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 || isSBBrowser) {
                // 禁止滚动
                event.preventDefault();
            }
            // 滚动元素

            let elScroll = data.elScroll;
            // 当前的滚动高度
            let scrollTop = elScroll.scrollTop;

            // 现在移动的垂直位置，用来判断是往上移动还是往下
            let events = event.touches[0] || event;
            // 移动距离
            let distanceY = events.pageY - data.posY;

            if (isSBBrowser) {
                elScroll.scrollTop(data.scrollY - distanceY);
                elScroll.trigger('scroll');
                return;
            }

            // 上下边缘检测
            if (distanceY > 0 && scrollTop == 0) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }

            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }
        });
        container.addEventListener('touchend',function (event) {
            data.maxscroll = 0;
        });

        // 防止多次重复绑定
        container.setAttribute('isBindScroll', true);
    }

    hasClass(obj,sClass){   //判断是否包含class

        var aClass = obj.className.split(' ');

        if(!aClass[0])return false;

        for(var i=0; i<aClass.length; i++){
            if(aClass[i]==sClass){
                return true;
            }
        }

        return false;
    }

    removeClass(obj,sClass){     //删除lass


        var aClass = obj.className.split(' ');

        if(!aClass[0])return;

        for(var i=0; i<aClass.length; i++){
            if(aClass[i]==sClass){
                aClass.splice(i,1);
                obj.className = aClass.join(' ');
                return;
            }
        }

    }

    addClass(obj,sClass){     //添加class

        var aClass = obj.className.split(' ');
        if(!aClass[0]){
            obj.className = sClass;
            return;
        }

        for(var i=0; i<aClass.length; i++){
            if(aClass[i]==sClass)return;
        }


        obj.className += ' ' + sClass;

    }
};
window.Utils = new Utils();


class Storage {
    constructor(){

    };

    set(name,data){
        localStorage.setItem(name,JSON.stringify(data));
    }

    get(name){
        return JSON.parse(localStorage[name])
    }

}
window.Utils.Storage = new Storage()


