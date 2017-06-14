
let localData = {
    'iphone' : false
}

const validate_rules = {

    //必填项
    'require': {
        "messages": function(value, element,params,validator,code){
            switch (code){
                case 1:
                    return "为必填项～";
                    break
                default:
                    break
            }
        },
        "reg": (value, element,params,validator,currentRuleName,callback)=>{
            var res = value.trim() != '';
            if (res){
                callback( {
                    code : 0,
                    isBool : true,
                    currentRuleName : currentRuleName
                } );
            }else {
                callback( {
                    code : 1,
                    isBool : false,
                    currentRuleName : currentRuleName
                } );
            }
        }
    },
    //区间
    "range": {
        "messages": function(value, element,params,validator,code){
            switch (code){
                case 1:
                    return "请输"+ params[0] +"到"+ params[1] +"之间的数字～";
                    break
                default:
                    break
            }

        },
        "reg": function (value, element,params,validator,callback) {
            var res = Number(value)>=params[0] && Number(value)<=params[1];
            if (res){
                callback( {
                    code : 0,
                    isBool : true
                } );
            }else {
                callback( {
                    code : 1,
                    isBool : false
                } );
            }
        }
    },

    //正整数
    "isIntGt0": {
        "messages": function(value, element,params,validator,code){
            switch (code){
                case 1:
                    return "请输入大于0的正整数～";
                    break
                default:
                    break
            }
        },
        "reg": function (value, element,params,validator,callback) {
            value = value.trim();
            var res = ((/^\d+$/.test(value)) && value>0);
            if (res){
                callback( {
                    code : 0,
                    isBool : true
                } );
            }else {
                callback( {
                    code : 1,
                    isBool : false
                } );
            }
        }
    },
    //是否相等
    "equal": {
        "messages": function(value, element,params,validator,code){
            switch (code){
                case 1:
                    return "与"+ params.chinese +"不一致～";
                    break
                default:
                    break
            }
        },
        "reg": function (value, element,params,validator,currentRuleName,callback) {
            var value2 = validator.getNativeElementByName(params.name).value.trim();
            value = value.trim();

            if(value == value2){
                callback( {
                    code : 0,
                    isBool : true,
                    currentRuleName : currentRuleName
                } );
            }else{
                callback( {
                    code : 1,
                    isBool : false,
                    currentRuleName : currentRuleName
                } );
            }

        }
    },
    //手机号
    "iphone": {
        "messages": function(value, element,params,validator,code){
            switch (code){
                case 1:
                    return "格式不正确！";
                    break
                case 2:
                    return "该手机号未注册";
                    break
                case 3:
                    return "该手机号已存在";
                    break
                default:
                    break
            }

        },
        "reg": function (value, element,params,validator,currentRuleName,callback) {
            var res =  /^1[34578]\d{9}$/.test(value);

            if (!res){
                callback({
                    code : 1,
                    isBool : false,
                    currentRuleName : currentRuleName
                });

            }else if(res&&params.url){
                setTimeout(function () {    //模拟向后台发送验证手机号是否存在
                    callback({
                        code : 2,
                        isBool : false,
                        currentRuleName : currentRuleName
                    });
                },50)
            }else {
                callback({
                    code : 0,
                    isBool : true,
                    currentRuleName : currentRuleName
                });
            }



        }
    },
    //密码
    "password": {
        "messages": function(value, element,params,validator,code){

            switch (code){
                case 1:
                    return "不可以包含特殊字符";
                    break
                case 2:
                    return "请输入6-16位字母/数字";
                    break
                default:
                    break
            }
        },
        "reg": function (value, element,params,validator,currentRuleName,callback) {
            var res =  /^(?![^a-zA-Z]+$)(?!\D+$)/.test(value);
            var ts = /[`~!@#$%^&*_+<>{}\/'[\]]/im.test(value);  //包含特殊字符
            if(ts){
                callback({
                    code : 1,
                    isBool : false,
                    currentRuleName : currentRuleName
                });
            }else if(!res){
                callback({
                    code : 2,
                    isBool : false,
                    currentRuleName : currentRuleName
                });
            } else{
                callback({
                    code : 0,
                    isBool : true,
                    currentRuleName : currentRuleName
                });
            }
        }
    },
    //原始密码
    "originalPassword": {
        "messages": function(value, element,params,validator,code){

            switch (code){
                case 1:
                    return "请输入正确的密码";
                    break
                default:
                    break
            }
        },
        "reg": function (value, element,params,validator,currentRuleName,callback) {

            setTimeout(function () {    //模拟ajax请求
                if(false){
                    callback({
                        code : 1,
                        isBool : false,
                        currentRuleName : currentRuleName
                    });
                }else{
                    console.log('设置原始密码');
                    callback({
                        code : 0,
                        isBool : true,
                        currentRuleName : currentRuleName
                    });
                }

            },50)

        }
    },

    //短信验证码
    "message_code":{
        "messages": function(value, element,params,validator,code){
            switch (code){
                case 1:
                    return "请先获取验证码"
                    break
                case 2:
                    return "验证码不正确"
                    break
                default:
                    break
            }

        },
        "reg": function (value, element,params,validator,currentRuleName,callback) {

            let message = params.message();

            if( value=="" && message.value=="" ){
                callback({
                    code : 2,
                    isBool : false,
                    currentRuleName : currentRuleName
                })
            }else if( value != message.value ){
                callback({
                    code : 2,
                    isBool : false,
                    currentRuleName : currentRuleName
                })
            }else if( value == message.value ){
                callback({
                    code : 0,
                    isBool : true,
                    currentRuleName : currentRuleName
                })
            }

        }
    }
}

export default validate_rules;