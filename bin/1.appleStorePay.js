webpackJsonp([1],{79:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){var t=Math.floor(e/3600);e-=3600*t;var n=Math.floor(e/60);return e-=60*n,f("%02d%02d%02d",t,n,e)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=function e(t,n,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,n,o)}if("value"in i)return i.value;var a=i.get;if(void 0!==a)return a.call(o)},l=n(16),s=window.tongji=n(80),f=n(20);netmsg.on("rechargeComplete",null,function(e){s.endCharge(e.orderid,e.money,"appleStore")}),e.exports=function(e){function t(){o(this,t);var e=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"appleStoreRc"));return e._timer=null,e}return r(t,e),c(t,[{key:"hide",value:function(){this._timer&&((0,l.clearInterval)(this._timer),this._timer=null),u(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"hide",this).call(this)}},{key:"refreshTimer",value:function(e){for(var t=this.contentPane,n=a(e),o=0;o<6;o++)t.getChild("n"+(28+o)).text=n[o]}},{key:"onInit",value:function(){function e(){(0,l.clearInterval)(o._timer),o._timer=null,o.contentPane.getChild("n14").onClick(null,function(){_socket.sendp({c:"applestore.freecoin"}),tipon("恭喜您获得10000金币").popup(),_socket.sendp({c:"applestore.cd"}),netmsg.once("applestore.cd",this,n)})}function n(t){return fairygui.GRoot.inst.closeModalWait(),o.refreshTimer(t.sec),t.sec<=0?e():void(o._timer=(0,l.setInterval)(function(){t.sec--,0==t.sec&&e(),t.sec<0||o.refreshTimer(t.sec)},1e3))}u(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"onInit",this).call(this);var o=this;fairygui.GRoot.inst.showModalWait(),_socket.sendp({c:"applestore.cd"}),netmsg.once("applestore.cd",this,n)}}]),t}(wins.Win)},80:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=window.TDGA;a||(a={Account:o,onPageLeave:o,onReward:o,onChargeRequest:o,onChargeSuccess:o,onItemPurchase:o,onMissionBegin:o,onMissionCompleted:o,onEvent:o},a.Account.setLevel=o);var c=function(){function e(){n(this,e),this._delayOp=[],this._inited=!0}return r(e,[{key:"init",value:function(e){this._inited=!0}},{key:"_delay",value:function(e){return this._inited?void e():this._delayOp.push({f:e})}},{key:"userin",value:function(e){this._delay(function(){var t=0;if(window.cordova){var n={Android:1,"BlackBerry 10":2,browser:3,iOS:4,WinCE:5,Tizen:6,"Mac OS X":7};t=n[device.platform]||8}else"wechat"==startup_param.pf&&(t=101);a.Account({accountId:e.id,level:e.level,accountName:e.nickname,gameServer:"通用",accountType:t,gender:startup_param.sex})})}},{key:"userout",value:function(){this._delay(a.onPageLeave.bind(a))}},{key:"levelup",value:function(e){this._delay(a.Account.setLevel.bind(a.Account,e))}},{key:"reward",value:function(e,t){this._delay(a.onReward.bind(a,e,t))}},{key:"beginCharge",value:function(e,t,n,o,i){"string"==typeof n&&(i=o,o=n,n=Math.floor(t/3)),this._delay(function(){a.onChargeRequest({orderId:e,iapId:o,currencyAmount:t,currencyType:"CNY",virtualCurrencyAmount:n,paymentType:i})})}},{key:"endCharge",value:function(e,t){this._delay(function(){a.onChargeSuccess({orderId:e,paymentType:t})})}},{key:"enterGame",value:function(e){this._delay(function(){a.onMissionBegin(e.toString())})}},{key:"startGame",value:function(e,t,n){this._delay(function(){a.onItemPurchase({item:t,itemNumber:1,priceInVirtualCurrency:n}),a.onEvent(t,{})})}},{key:"endGame",value:function(e){this._delay(function(){a.onMissionCompleted(e.toString())})}},{key:"share",value:function(){this._delay(function(){a.onEvent("share",{user:{id:me.id,nickname:me.nickname}})})}},{key:"invite",value:function(e,t){this._delay(function(){a.onEvent("invite",{user:{id:me.id,nickname:me.nickname},table:{id:e,msg:t}})})}},{key:"event",value:function(e,t){this._delay(function(){a.onEvent(e,"object"==("undefined"==typeof t?"undefined":i(t))?t:{data:t})})}}]),e}(),u=new c;window.onunload=u.userout.bind(u),e.exports=u}});