'use strict';

const http = require('http');
const https = require('https');
const qs = require('querystring');

$(document).ready(function(){
  var arg = new Object;
  var pair=location.search.substring(1).split('&');
  for(var i=0;pair[i];i++) {
      var kv = pair[i].split('=');
          arg[kv[0]]=kv[1];
  }

  setInterval(function(){
    var iframe= document.getElementById('pdf');
    var idoc= iframe.contentDocument || iframe.contentWindow.document; // ie compatibility

    getAccessToken((token) => {
      translate(token, idoc.getSelection().toString(), (translated) => {
        console.log(translated);
      });
    });
     //  console.log(arg.url);
     //$("#pdf").attr('src', arg.url);
  },3000);

});

// アクセストーク取得
function getAccessToken(callback) {
    let body = '';
    let data = {
        'client_id': 'translation__',
        'client_secret': 'KAWt0zKAaUR4ZJ12oSXVLyug3ZTPpd4HLsiWm6fMbmo=',
        'scope': 'http://api.microsofttranslator.com',
        'grant_type': 'client_credentials'
    };
    let req = https.request({
        host: 'datamarket.accesscontrol.windows.net',
        path: '/v2/OAuth2-13',
        method: 'POST'
    }, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            body += chunk;
        }).on('end', () => {
            let resData = JSON.parse(body);
            callback(resData.access_token);
        });
    }).on('error', (err) => {
        console.log(err);
    });
    req.write(qs.stringify(data));
    req.end();
}

// 翻訳
function translate(token, text, callback) {
    let options = 'from=en'+
                  '&to=ja' +
                  '&text=' +
                  qs.escape(text) +
                  '&oncomplete=translated';
    let body = '';
    let req = http.request({
        host: 'api.microsofttranslator.com',
        path: '/V2/Ajax.svc/Translate?' + options,
        method: 'GET',
        headers: {
          "Authorization": 'Bearer ' + token
        }
    }, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            body += chunk;
        }).on('end', () => {
            eval(body);
        });
    }).on('error', (err) => {
        console.log(err);
    });
    req.end();

    function translated(text) {
        callback(text);
    }
}