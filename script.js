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

    console.log(idoc.getSelection().toString());
     //  console.log(arg.url);
     //$("#pdf").attr('src', arg.url);
  },3000);

});
