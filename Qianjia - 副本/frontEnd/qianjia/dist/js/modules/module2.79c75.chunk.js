webpackJsonp([15],{1240:function(module,exports){},726:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_react=__webpack_require__(11),_react2=_interopRequireDefault(_react);__webpack_require__(73);__webpack_require__(1240);var Module2=function(_Component){function Module2(){return _classCallCheck(this,Module2),_possibleConstructorReturn(this,(Module2.__proto__||Object.getPrototypeOf(Module2)).call(this))}return _inherits(Module2,_Component),_createClass(Module2,[{key:"componentWillMount",value:function(){this.state={link:"1"}}},{key:"componentDidMount",value:function(){componentStore.set(this)}},{key:"componentWillUnmount",value:function(){componentStore.clear(this)}},{key:"toModule3",value:function(){Utils.switchRoute("/module3")}},{key:"render",value:function(){return _react2.default.createElement("div",{className:"module2"},_react2.default.createElement("section",{className:"module2_head"},_react2.default.createElement("div",{className:"module2_address"},"北京"),_react2.default.createElement("div",{className:"module2_address"},"钱夹"),_react2.default.createElement("div",{className:"module2_address"},"北京"),_react2.default.createElement("div",{onClick:this.toModule3.bind(this)},"toModule3")))}}]),Module2}(_react.Component);exports.default=Module2}});
//# sourceMappingURL=module2.79c75.chunk.js.map