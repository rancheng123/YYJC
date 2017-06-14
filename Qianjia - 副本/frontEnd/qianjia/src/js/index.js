
require('../scss/base/base.scss');
require('../scss/base/common.scss');
require('../scss/font.scss');

require('../scss/icon/icon.scss');
require('../scss/button/button.scss');




//react
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link ,browserHistory} from 'react-router';
//组件管理器
import {} from './asset/config';
import {} from './asset/componentStore';
import {} from './asset/utils';

/* 开发帮助模块  start */
const input = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./module/input/input').default)
    }, 'input')
};
const icon = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../scss/icon/icon').default)
    }, 'icon')
};
const button = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../scss/button/button').default)
    }, 'button')
};
//安全认证页面safe
const safe = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/safe/safe').default)
    },'safe')
}
//注册页面register
const register = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/register/register').default)
    },'register')
}
//登录页面login
const login = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/login/login').default)
    },'login')
}
//找回密码
//retrievePassword
const retrievePassword = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/retrievePassword/retrievePassword').default)
    },'retrievePassword')
}
//首页home
const home = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/home/home').default)
    },'home')
}
//my(我的)
const my =(location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/my/my').default)
    },'my')
}
//invest(投资)
const invest = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/invest/invest').default)
    },'invest')
}
//myInvest我的投资
const myInvest = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/myInvest/myInvest').default)
    },'myInvest')
}
//优惠券
const projectList = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/projectList/projectList').default)
    },'projectList')
}
//测试项目列表
const coupon = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/coupon/coupon').default)
    },'coupon')
}
/* 开发帮助模块  end */



/* 业务模块  start */
const module1 = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/module1/module1').default)
    }, 'module1')
}

const module2 = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/module2/module2').default)
    }, 'module2')
}
const module3 = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/module3/module3').default)
    }, 'module3')
}
const module4 = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/module4/module4').default)
    }, 'module4')
}

const biaodi_detail = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/biaodi_detail/biaodi_detail').default)
    }, 'biaodi_detail')
}


const homeModule = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/homeModule/homeModule').default)
    }, 'homeModule')
}

const multiMenu = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./module/multiMenu/multiMenu').default)
    }, 'multiMenu')
}

const indexPage = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/indexPage/indexPage').default)
    }, 'indexPage')
}
const detail = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/common_flex/detail').default)
    }, 'detail')
}
const first = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/form/first').default)
    }, 'first')
}

/* 表单页面 */
const zhuce = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/form/zhuce').default)
    }, 'zhuce')
}
const findback_password = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/form/findback_password').default)
    }, 'findback_password')
}
const reset_password = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/form/reset_password').default)
    }, 'reset_password')
}
const new_password = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/form/new_password').default)
    }, 'new_password')
}
const security = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/form/security').default)
    }, 'security')
}
/* 表单页面 */

/* 查看svg */
const show_list_svg = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/form/show_list_svg').default)
    }, 'show_list_svg')
}
/* 查看svg */

/* 业务模块  end */



render((
    <div>
        <Router history={browserHistory}>


            {/*业务模块路由  start */}
            <Route title="module3" path="/" getComponent={module3}></Route>
            <Route title="module1" path="/module1" getComponent={module1}></Route>
            <Route title="module2" path="/module2" getComponent={module2}></Route>
            <Route title="module3" path="/module3" getComponent={module3}></Route>
            <Route title="module4" path="/module4" getComponent={module4}></Route>
            <Route title="biaodi_detail" path="/biaodi_detail" getComponent={biaodi_detail}></Route>
            <Route title="multiMenu" path="/multiMenu" getComponent={multiMenu}></Route>

            <Route title="indexPage" path="/indexPage" getComponent={indexPage}></Route>
            <Route title="detail" path="/detail/:id" getComponent={detail}></Route>

            <Route title="zhuce" path="/zhuce" getComponent={zhuce}></Route>
            <Route title="findback_password" path="/findback_password" getComponent={findback_password}></Route>
            <Route title="reset_password" path="/reset_password" getComponent={reset_password}></Route>
            <Route title="new_password" path="/new_password" getComponent={new_password}></Route>
            <Route title="security" path="/security" getComponent={security}></Route>


            <Route title="show_list_svg" path="/show_list_svg" getComponent={show_list_svg}></Route>



            <Route title="homeModule" path="/homeModule" getComponent={homeModule}></Route>
            {/* home页面 --李  */}
            <Route title="钱夹" path="/home" getComponent={home}></Route>
            {/* invest(投资)页面 --李 */}
            <Route title="投资" path="/invest" getComponent={invest}></Route>
            {/* my(我的)页面 --李 */}
            <Route title="我的" path="/my" getComponent={my}></Route>
            {/* myInvest(我的投资)页面 --李 */}
            <Route title="我的投资" path="/myInvest" getComponent={myInvest}></Route>
            {/* 安全认证页面---李 */}
            <Route title="安全认证" path="/safe" getComponent={safe}></Route>
           {/* 注册页面 --李*/}
            <Route title="注册" path="/register" getComponent={register}></Route>
            {/* 登录页面 --李 */}
            <Route title="登录" path="/login" getComponent={login}></Route>
            {/* 找回密码 --李 */}
            <Route title="找回密码" path="/retrievePassword" getComponent={retrievePassword}></Route>
            {/* 优惠券 --李 */}
            <Route title="优惠券" path="/coupon" getComponent={coupon}></Route>
            {/*业务模块路由  end */}


            {/*开发帮助模块路由  start */}
            <Route title="icon" path="/icon" getComponent={icon}></Route>
            <Route title="button" path="/button" getComponent={button}></Route>
            <Route title="input" path="/input" getComponent={input}></Route>
            <Route title="项目列表测试" path="/projectList" getComponent={projectList}></Route>

            {/*开发帮助模块路由  end */}

        </Router>
    </div>

), document.getElementById('app'));



