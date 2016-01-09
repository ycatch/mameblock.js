'use strict';

window.addEventListener('load', function (){
  
  var v = 0;
  navigator.setGpioPort(198,"out").then( port=>{
    setInterval(function(){
      v = v ? 0 : 1;
      port.write(v);
    },500);
  });

}, false);
