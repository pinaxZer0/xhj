webpackJsonp([6,5],{80:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=window.TDGA;u||(u={Account:o,onPageLeave:o,onReward:o,onChargeRequest:o,onChargeSuccess:o,onItemPurchase:o,onMissionBegin:o,onMissionCompleted:o,onEvent:o},u.Account.setLevel=o);var a=function(){function e(){n(this,e),this._delayOp=[],this._inited=!0}return r(e,[{key:"init",value:function(e){this._inited=!0}},{key:"_delay",value:function(e){return this._inited?void e():this._delayOp.push({f:e})}},{key:"userin",value:function(e){this._delay(function(){var t=0;if(window.cordova){var n={Android:1,"BlackBerry 10":2,browser:3,iOS:4,WinCE:5,Tizen:6,"Mac OS X":7};t=n[device.platform]||8}else"wechat"==startup_param.pf&&(t=101);u.Account({accountId:e.id,level:e.level,accountName:e.nickname,gameServer:"通用",accountType:t,gender:startup_param.sex})})}},{key:"userout",value:function(){this._delay(u.onPageLeave.bind(u))}},{key:"levelup",value:function(e){this._delay(u.Account.setLevel.bind(u.Account,e))}},{key:"reward",value:function(e,t){this._delay(u.onReward.bind(u,e,t))}},{key:"beginCharge",value:function(e,t,n,o,i){"string"==typeof n&&(i=o,o=n,n=Math.floor(t/3)),this._delay(function(){u.onChargeRequest({orderId:e,iapId:o,currencyAmount:t,currencyType:"CNY",virtualCurrencyAmount:n,paymentType:i})})}},{key:"endCharge",value:function(e,t){this._delay(function(){u.onChargeSuccess({orderId:e,paymentType:t})})}},{key:"enterGame",value:function(e){this._delay(function(){u.onMissionBegin(e.toString())})}},{key:"startGame",value:function(e,t,n){this._delay(function(){u.onItemPurchase({item:t,itemNumber:1,priceInVirtualCurrency:n}),u.onEvent(t,{})})}},{key:"endGame",value:function(e){this._delay(function(){u.onMissionCompleted(e.toString())})}},{key:"share",value:function(){this._delay(function(){u.onEvent("share",{user:{id:me.id,nickname:me.nickname}})})}},{key:"invite",value:function(e,t){this._delay(function(){u.onEvent("invite",{user:{id:me.id,nickname:me.nickname},table:{id:e,msg:t}})})}},{key:"event",value:function(e,t){this._delay(function(){u.onEvent(e,"object"==("undefined"==typeof t?"undefined":i(t))?t:{data:t})})}}]),e}(),c=new a;window.onunload=c.userout.bind(c),e.exports=c},87:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(){}function a(e,t,n){n=n||"post";var o=document.createElement("form");o._submit_function_=o.submit,o.setAttribute("method",n),o.setAttribute("action",e),o.setAttribute("target","_blank");for(var i in t){var r=document.createElement("input");r.setAttribute("type","hidden"),r.setAttribute("name",i),r.setAttribute("value",t[i]),o.appendChild(r)}document.body.appendChild(o),o._submit_function_()}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function e(t,n,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,n,o)}if("value"in i)return i.value;var u=i.get;if(void 0!==u)return u.call(o)},s=window.tongji=n(80);document.addEventListener("gameLoaded",function(){netmsg.on("rechargeComplete",null,function(e){s.endCharge(e.orderid,e.money,"和付")})}),e.exports=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"hepayRc"))}return r(t,e),c(t,[{key:"onInit",value:function(){l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"onInit",this).call(this);var e=this.contentPane;e.getChild("n5").getChild("n7").getChildAt(0).selected=!0,e.getChild("n8").promptText="最少20元",e.getChild("n10").onClick(this,function(){var t=e.getChild("n5").getChild("n7").getSelection();if(3==t)return tipon("请转至微信加 bjl8000 为好友，谢谢").popup();if(1==t)return tipon("微信充值暂不支持").popup();var n=Number(e.getChild("n8").text);if(n<20)return e.getChild("n8").text="20",tipon("最少充值20元").popup();if(0==t){var o=[20,30,40,50,60,80,90,100,120,140,150,160,180,200,210,220,240,250,260,270,280,300],i=o.findIndex(function(e){return e>=n});if(i<0)return e.getChild("n8").text=""+o[o.length-1],tipon("支付宝每次最多充"+o[o.length-1]+"元").popup();if(o[i]!=n)return i>0?(e.getChild("n8").text=""+o[i],tipon("支付宝不能充"+n+"元，但是可以充"+o[i-1]+"或"+o[i]+"元").popup()):alert("you should never see this msg")}fairygui.GRoot.inst.showModalWait(),getAjax("createOrder",{userid:me.id,packid:"userdefine",rmb:n,payment:"hepay"},function(e,n){return fairygui.GRoot.inst.closeModalWait(),e||n.err?tipon(e||n.err).popup():f(n.orderid,n.money,"userdefine",t)})})}}]),t}(wins.Win);var f=function(e,t,n,o,i){return!i&&(i=u),s.beginCharge(e,t,n,"和付"),fairygui.GRoot.inst.showModalWait(),getAjax("pf/hepay/sign",{orderid:e,money:t,type:o},function(e,t){return e?(fairygui.GRoot.inst.closeModalWait(),tipon&&tipon(e.responseText).popup(i)):(delete t.result,a("http://hf.qzwygl.cn/biz_inter_sys/services/wap/pay",t),setTimeout(function(){fairygui.GRoot.inst.closeModalWait()},4e3),void i())})}},88:function(e,t,n){"use strict";n(87)}});