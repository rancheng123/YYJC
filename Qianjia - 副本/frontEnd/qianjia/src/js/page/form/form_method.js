/**
 * Created by 唐丹 on 2017/4/28.
 */


const formMethod = { //表单验证的所有方法
    errorStyle : {  //错误提示的样式显示规则
        right : {
            showError : (obj)=>{
                console.log('obj------------',obj);
                var nativeEle = obj.nativeEle;
                var nextSibling = nativeEle.nextSibling;
                var parentNode = nativeEle.parentNode;

                var oEle = document.createElement('div');
                oEle.className = 'form-error-box';
                oEle.style.display = 'block';
                oEle.innerHTML = '<div class="form-tip"><div class="error-icon"><span></span></div><div class="tip-text">'+obj.errorMsg+'</div></div>';

                if(nextSibling){ //判断input下是否有兄弟节点
                    if(Utils.hasClass(nextSibling,'form-error-box')){  //如果已经包含了错误节点则不去添加错误提示节点
                        var formErrorBox = parentNode.getElementsByClassName('form-error-box')[0];
                        var tipText = formErrorBox.getElementsByClassName('tip-text')[0];
                        tipText.innerHTML = obj.errorMsg;
                        formErrorBox.style.display = 'block';
                        return false;
                    }else{
                        parentNode.insertBefore(oEle,nextSibling);
                    }
                }else{
                    parentNode.appendChild(oEle);
                }

                formMethod.errorStyle.right.errorHandle(obj);
            },
            hideError : (obj)=>{
                var parentNode = null;
                if(obj.target){
                    parentNode = obj.target.parentNode;
                }else{
                    parentNode = obj.parentNode;
                }
                var allEle = parentNode.getElementsByClassName('form-error-box')[0];
                if(allEle){
                    allEle.style.display='none';
                }

                let oErrorText = parentNode.getElementsByClassName('tip-text')[0];
                if (oErrorText){
                    Utils.removeClass(oErrorText,'bounceOut');
                }

            },
            errorHandle : (obj)=>{
                let oErrorIcon = obj.nativeEle.parentNode.getElementsByClassName('error-icon')[0];
                let oErrorText = obj.nativeEle.parentNode.getElementsByClassName('tip-text')[0];

                Utils.addClass(oErrorText,'bounceIn');
                oErrorIcon.removeEventListener('touchend',touch,false);
                oErrorIcon.addEventListener('touchend',touch,false);

                function touch() {
                    console.log(Utils.hasClass(oErrorText,'bounceOut'));
                    if( Utils.hasClass(oErrorText,'bounceOut') ){
                        Utils.addClass(oErrorText,'bounceIn');
                        Utils.removeClass(oErrorText,'bounceOut');
                    }else{
                        Utils.removeClass(oErrorText,'bounceIn');
                        Utils.addClass(oErrorText,'bounceOut');
                    }
                }

            }
        },
        pop : {

        }
    }

}

export default formMethod;