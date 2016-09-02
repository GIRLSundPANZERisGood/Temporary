$(document).ready(function(){
  var arg = new Object;
  var pair=location.search.substring(1).split('&');
  for(var i=0;pair[i];i++) {
      var kv = pair[i].split('=');
          arg[kv[0]]=kv[1];
  }

  //setInterval(function(){
  //  console.log(arg.url);
   //$("#pdf").attr('src', arg.url);
  //},3000);

});
