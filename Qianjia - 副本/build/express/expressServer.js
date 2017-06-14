var path = require('path');
var request = require('request');
var ejs = require('ejs');
var fs = require('fs');
var current_path = path.resolve(__dirname);



var express = require('express');
var app = express();
app.set('view engine', 'ejs');



var router = express.Router();

var count = 0;
var root = '../../frontEnd/qianjia/dist/';







router.get('/*', function(req, res){

    var route = req.url.split('?')[0];

    //��
    if(route == '/'){
        responseIndexPage(req, res);
    }
    //��̬��Դ
    else if(route.match(/\.(js|css|html|gif|jpg|jpeg|png|bmp|ico|txt|swf)/)){
        var source = path.resolve(current_path, root + route  );
        res.sendFile( source  );
    }
    //�ӿ�ת��
    else if(route.match(/^\/api\//)){
        request({
            headers: {"Connection": "close"},
            //����·��
            url: 'http://localhost:3000'+ route,
            method: req.method.toUpperCase(),
            json: true,
            body: req.body
        },function (error, response, data) {
            if (!error && response.statusCode == 200) {
                res.jsonp(data);
            }
        });

    }
    //ҳ��·��
    else{
        responseIndexPage(req, res)
    }


});



function responseIndexPage(req, res){
    var currentRoute = req.url.split('?')[0];
    if(currentRoute == '/'){
        currentRoute = '/module3'
    }

    //������Ҫ����title
    //meta ��ǩ�ȵ�

    var routes = {
        'module2': {
            'title': 'module2',
            'keywords': '123dsadfdsaf4',
            'content': 'dsfdsfdsafd'
        },
        'module3': {
            'title': 'module3',
            'keywords': '1234',
            'content': 'content'
        },
        'module4': {
            'title': 'module4',
            'keywords': '1234',
            'content': 'content'
        }
    }


    var source = path.resolve(current_path, root + 'index.html')
    //res.sendFile( source  );


    var indexPageStr = fs.readFileSync(source, 'utf8');
    var newIndexPageStr = indexPageStr.replace(/\{\{(.+?)\}\}/g,function(match){
        var route = currentRoute.replace('/','');
        var key = match.replace(/[\{\}]/g,'')


        return routes[route][key]
    })

    res.end(newIndexPageStr);




    /*res.render(source, {
        title: 'No Found'
    })*/


   /* var indexPath = path.resolve(__dirname,'../frontEnd/qianjia/src//index.ejs')

    var str = fs.readFileSync(indexPath, 'utf8');

    var ret = ejs.render(str, {
        names: ['foo', 'bar', 'baz']
    });

    console.log(ret);

    res.end(ret);*/


}



app.use(router);

app.listen(8391,'192.168.0.173',function () {
    console.log('Listening on 8391');
});