webpackJsonp([17],{391:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();__webpack_require__(910);var _react=__webpack_require__(11),_react2=_interopRequireDefault(_react),Input=(__webpack_require__(73),function(_Component){function Input(){return _classCallCheck(this,Input),_possibleConstructorReturn(this,(Input.__proto__||Object.getPrototypeOf(Input)).call(this))}return _inherits(Input,_Component),_createClass(Input,[{key:"componentWillMount",value:function(){this.state={stErr:"none",stNull:"none",password:"none",passNull:"none",passLength:"none",rule:"none",pasSucs:!1,useSucs:!1}}},{key:"componentDidMount",value:function(){componentStore.set(this)}},{key:"componentWillUnmount",value:function(){componentStore.clear(this)}},{key:"handBlur",value:function(){var phone=this.refs.phone.value,reg=new RegExp(/^0?1[3|4|5|7|8][0-9]\d{8}$/),phones=phone.length,tel=phone.match(reg);""==phone?(this.setState({stNull:"block"}),this.setState({useSucs:!1})):11!=phones?(this.setState({stErr:"block"}),this.setState({useSucs:!1})):tel?(this.setState({stErr:"none"}),this.setState({useSucs:!0})):(this.setState({stErr:"block"}),this.setState({useSucs:!1}))}},{key:"handPass",value:function(){var patrn=new RegExp(/^(\w){6,20}$/),pass=this.refs.password.value,pw=pass.match(patrn);console.log("pw:"+pw),""==pass?(this.setState({password:"block"}),this.setState({pasSucs:!1})):pass.length<6||pass.length>20?(this.setState({passLength:"block"}),this.setState({pasSucs:!1})):null===pw?(this.setState({rule:"block"}),this.setState({pasSucs:!1})):this.setState({pasSucs:!0})}},{key:"handFocus",value:function(){this.setState({stErr:"none"}),this.setState({stNull:"none"})}},{key:"handPassFocus",value:function(){this.setState({passLength:"none"}),this.setState({password:"none"}),this.setState({rule:"none"})}},{key:"btnClick",value:function(){this.state.useSucs&&this.state.pasSucs?alert("提交成功！"):alert("请检查账号与密码")}},{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"input"},_react2.default.createElement("div",null,_react2.default.createElement("span",null,"手机号："),_react2.default.createElement("input",{type:"number",onBlur:this.handBlur.bind(this),onFocus:this.handFocus.bind(this),ref:"phone",placeholder:"请输入用户名"}),_react2.default.createElement("p",{className:"user",style:{display:this.state.stErr}},"*请输入正确的手机号"),_react2.default.createElement("p",{className:"user",style:{display:this.state.stNull}},"手机号不能为空，请重新输入")),_react2.default.createElement("div",null,_react2.default.createElement("span",null,"密码："),_react2.default.createElement("input",{type:"password",onFocus:this.handPassFocus.bind(this),onBlur:this.handPass.bind(this),ref:"password",placeholder:"请输入密码"}),_react2.default.createElement("p",{className:"pass",style:{display:this.state.password}},"*密码不能为空请重新输入"),_react2.default.createElement("p",{className:"pass",style:{display:this.state.passLength}},"*请输入6-20位密码"),_react2.default.createElement("p",{className:"pass",style:{display:this.state.rule}},"*密码必须有字母或数字、下划线组成的6-20位")),_react2.default.createElement("div",null,_react2.default.createElement("div",{className:"divBtn",onClick:this.btnClick.bind(this)},"立即登录"))))}}]),Input}(_react.Component));exports.default=Input},910:function(module,exports){}});
//# sourceMappingURL=input.13dbe.chunk.js.map