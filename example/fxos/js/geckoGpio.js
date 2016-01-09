'use strict';

navigator.requestGPIOAccess = function(port) {
  return new Promise(function(resolve, reject) {
    if (!navigator.mozGpio) {
      navigator.mozGpio = new Object();
      navigator.mozGpio.export = function(portno) {
      };
      navigator.mozGpio.unexport = function(portno) {
      };
      navigator.mozGpio.setValue = function(portno, value) {
        console.log('setValue(' + portno + ',' + value + ')');
      };
      navigator.mozGpio.getValue = function(portno) {
        return portno;
      };
      navigator.mozGpio.setDirection = function(portno, direction) {
        console.log('setDirection(' + portno + ',' + direction + ')');
      };
      navigator.mozGpio.getDirection = function() {
        return 'out';
      };
    }

    var gpioAccess = new GPIOAccess(port);
    resolve(gpioAccess);
  });
};

function GPIOAccess(port) {
  this.init(port);
}

GPIOAccess.prototype = {
  init: function(port) {
    this.ports = new Map();
    
    navigator.mozGpio.export(port);  //PWM
    this.ports.set(port - 0, new GPIOPort(port));
    
    console.log('size=' + this.ports.size);
  }
};

function GPIOPort(portNumber) {
  this.init(portNumber);
}

GPIOPort.prototype = {
  init: function(portNumber) {
    this.portNumber = portNumber;
    this.direction = 'out';
    this.interval = 30;
    this.value = null;
    this.timer = null;
  },

  setDirection: function(direction) {
    return new Promise(function(resolve, reject) {
      if (direction === 'in' || direction === 'out') {
        this.direction = direction;
        navigator.mozGpio.setDirection(this.portNumber, direction === 'out');
        if(direction === "in"){
          console.log("in");
          var self = this;
          this.timer = setInterval(this.checkValue,this.interval,self);
        }else{
          console.log("out");
          if(this.timer){
            clearInterval(this.timer);            
          }
          console.log("time");
        }
        resolve();
      } else {
        reject({'message':'invalid direction'});
      }
    }.bind(this));
  },

  isInput: function() {
    return this.direction === 'in';
  },

  read: function() {
    return new Promise(function(resolve, reject) {
      if (this.isInput()) {
        resolve(navigator.mozGpio.getValue(this.portNumber));
      } else {
        reject({'message':'invalid direction'});
      }
    }.bind(this));
  },

  write: function(value) {
    return new Promise(function(resolve, reject) {
      if (this.isInput()) {
        reject({'message':'invalid direction'});
      } else {
        navigator.mozGpio.setValue(this.portNumber, value);
        resolve(value);
      }
    }.bind(this));
  },
  
  checkValue:function(port){
    port.read().then(
      function(value){
        if(port.value != null){
          if(parseInt(value) != parseInt(port.value)){
            if(typeof(port.onchange) === "function"){
              port.onchange(value);  
            }else{
              console.log("port.onchange is not a function.");
            }
          }        
        }
        port.value = value;
      },
      function(){
        console.log("check value error");
      }
    );
  },
  onchange:null
};

navigator.setGpioPort = function(portno,dist){
  
  return new Promise(function(resolve, reject){
    navigator.requestGPIOAccess(portno).then(
      function(gpioAccess){
        console.log("gpioAccess" + portno);
        var port = gpioAccess.ports.get(portno);
        port.setDirection(dist).then(
          function(){
            console.log('export OK');
            resolve(port);
          },
          function() {
            console.log('export NG'); 
            reject();
          }
        );
      }
    );
  });
};