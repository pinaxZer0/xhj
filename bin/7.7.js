webpackJsonp([7],{150:function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e){return e.charAt(0).toUpperCase()+e.slice(1)}var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),l=(i(15),i(76)),r=i(20),s=(i(19),i(25),i(10)),c=i(88),h=i(151),u=h.BeadPlate,d=h.BigRoad,g=h.BigEye,f=laya.net.Loader,v=laya.utils.Handler,m=function(){function e(t){n(this,e),this.opt=t}return a(e,[{key:"renderTables",value:function(e,t){var i=this.tables[e];t.getChild("n94").text=r("房间%s",i.roomid),t.getChild("n95").text=r("限红：%d-%d",i.minZhu,i.maxZhu),t.getChild("n85").text="-",t.getChild("n87").text="-",t.getChild("n89").text="-",t.getChild("n91").text=i.online;var n=t.getChild("n93");n.offClick(t,t._clickHandler),t._clickHandler=function(){_socket.sendp({c:"join",code:i.roomid})},n.onClick(t,t._clickHandler);var o=i.his;new u(t.getChild("n17").getChild("n1")).refreshRoad(i.his);var a=new d(t.getChild("n19").getChild("n19"));a.refreshRoad(i.his);var l=a.logicalRoad(i.his);new g(t.getChild("n20").getChild("n20")).refreshRoad(l),new g(t.getChild("n22").getChild("n23"),2).refreshRoad(l),new g(t.getChild("n23").getChild("n23"),3).refreshRoad(l);for(var s=0,c=0,h=0,f=0,v=0,m=0,C=0;C<o.length;C++)"banker"==o[C].win?s++:"player"==o[C].win?c++:h++,o[C].bankerPair&&f++,o[C].playerPair&&v++,o[C].playerTian&&m++,o[C].bankerTian&&m++;t.getChild("n85").text=s,t.getChild("n87").text=c,t.getChild("n89").text=h}},{key:"assignAllBtns",value:function(){for(var e=this,t=this._view._children,i=/[A-Za-z]\d+/,n=0;n<t.length;n++){var a=t[n].asButton;if(a instanceof fairygui.GButton){var l=function(){if(i.test(a.name))return"continue";var t=a.name.split("."),n=t[1]||1;t=t[0];var l=e._view.getController(t);l?(a.onClick(e,function(){l.selectedIndex=n}),l.setSelectedIndex(0)):a.onClick(e,function(){var e=o(t)+"Win";if(c[e])var i=new c[e];else var i=new c.Win(t);i.modal=!0,i.show()})}();if("continue"===l)continue}}}},{key:"active",value:function(){fairygui.GRoot.inst.showModalWait(),_socket.sendp({c:"alltables"}),netmsg.once("alltables",this,function(e){fairygui.GRoot.inst.closeModalWait(),console.log(e),this.tables=[];for(var t in e.tables)e.tables[t].roomid=t,this.tables.push(e.tables[t]);var i=this._view.getChild("n39").asList,n=this.tables.length;n!=i.numItems?i.numItems=n:i.refreshVirtualList()})}},{key:"deactive",value:function(){}}],[{key:"create",value:function(t,n){"function"==typeof t&&(n=t,t={}),Laya.loader.load([{url:i(142),type:f.IMAGE},{url:i(152),type:f.IMAGE},{url:i(153),type:f.IMAGE},{url:i(144),type:f.BUFFER}],v.create(null,function(){window.magiclink&&magiclink.reg(function(e){console.log("magiclink ret",e),_socket.sendp({c:"join",code:e})});var i=new e(t);fairygui.UIPackage.addPackage("baccarat"),fairygui.UIConfig.buttonSound=null,fairygui.UIConfig.buttonSoundVolumeScale=0;var o=fairygui.UIPackage.createObject("Package1","大厅").asCom;i._view=o,i.usernick=o.getChild("n4").asTextField,i.usericon=o.getChild("account").getChild("n3").asLoader,i.usericon.onClick(null,function(){var e=new c.AccountWin;e.modal=!0,e.show()}),i.assignAllBtns(),l.removeAllListeners("nicknamechgd").on("nicknamechgd",function(){i.usernick.text=l.nickname}),l.removeAllListeners("facechgd").on("facechgd",function(){l.face&&(i.usericon.url=l.face)}),l.removeAllListeners("coinschgd").on("coinschgd",function(){o.getChild("n10").asTextField.text=l.coins||0});var a=o.getChild("n39").asList;a.setVirtual(),a.itemRenderer=v.create(i,i.renderTables,null,!1),a.numItems=0,o.getChild("n45").onClick(null,function(){if(0!=i.tables.length){var e=s(i.tables);e.sort(function(e,t){return t.minZhu-e.minZhu});for(var t=0;t<e.length;t++)if(l.coins>e[t].minZhu)return _socket.sendp({c:"join",code:e[t].roomid});_socket.sendp({c:"join",code:e[t-1].roomid})}}),n(null,i)}))}}]),e}();e.exports=m.create},151:function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),l=i(89),r=function(){function e(t){n(this,e),this.view=t,this.roadBeadPlate=t.getChildAt(0).asCom,this.cols=this._orgCols=Math.max(9,Math.ceil(this.view.width/27)),this.roadBeadPlate.getChild("n90").asList.removeChildren()}return a(e,[{key:"refreshRoad",value:function(e){var t=this.roadBeadPlate.getChild("n90").asList;t.removeChildren();var i=Math.floor(e.length/6)+1,n=Math.max(i,this._orgCols);this.cols=n,i>=this._orgCols?this.view.scrollPane.setPosX(this.roadBeadPlate.width-this.view.width):this.view.scrollPane.setPosX(0);for(var o=t._children.length;o<e.length;o++){var a=fairygui.UIPackage.createObject("Package1","路格1"),l=e[o],r=a.getController("c1");if(r.selectedIndex=0,!l)return;"banker"==l.win?r.selectedIndex=1:"player"==l.win?r.selectedIndex=2:r.selectedIndex=3,l.demo?a.getTransition("t0").play():a.getTransition("t0").stop(),a.getChild("n6").visible=l.bankerPair,a.getChild("n7").visible=l.playerPair,t.addChild(a)}}},{key:"cols",get:function(){return this._cols},set:function(e){this._cols=e,this.roadBeadPlate.width=28*this._cols+1}}]),e}(),s=function(){function e(t){n(this,e),this.view=t,this.roadBig=t.getChildAt(0).asCom,this.cols=this._orgCols=Math.max(24,Math.ceil(this.view.width/13))}return a(e,[{key:"bigRoad",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=(t.columns,t.rows),n=void 0===i?6:i,o=[],a={},r=0,s=void 0,c=[],h=0;return e.forEach(function(e){if("tie"===e.win)o.push(e);else{if(s){var t=l.last(c);"tie"===s.win&&t&&(t.ties=l.cloneDeep(o),o=[],s=t.result),t&&s.win&&s.win!==e.win&&r++}for(var i=r,u=0,d=!1;!d;){var g=i+"."+u,f=i+"."+(u+1);if(l.get(a,g))u+1>=n?i++:l.get(a,f)?l.get(a,f).result.win===e.win?u++:i++:u++;else{var v=l.merge({},{row:u,column:i,logicalColumn:r,ties:l.cloneDeep(o)},{result:e});l.set(a,g,v),c.push(a[i][u]),d=!0}}o=[],h=Math.max(h,i)}s=e}),l.isEmpty(c)&&o.length>0?c.push({ties:l.cloneDeep(o),column:0,row:0,logicalColumn:0,result:{}}):!l.isEmpty(c)&&o.length&&(l.last(c).ties=l.cloneDeep(o)),c.maximumColumnReached=h,c}},{key:"logicalRoad",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=(t.columns,t.rows,[]),n=0,o=void 0;return e.forEach(function(e){"tie"!==e.win&&(o&&o.win&&o.win!==e.win&&n++,i[n]?i[n].push({result:e}):i[n]=[{result:e}],o=e)}),i}},{key:"refreshRoad",value:function(e){var t=this.roadBig,i=this.bigRoad(e),n=Math.max(i.maximumColumnReached,this._orgCols);this.cols=2*Math.floor(n/2)+2,i.maximumColumnReached>=this._orgCols?this.view.scrollPane.setPosX(this.roadBig.width-this.view.width):this.view.scrollPane.setPosX(0),t.removeChildren(2);for(var o=0;o<i.length;o++){var a=fairygui.UIPackage.createObject("Package1","路格2"),l=i[o].result,r=a.getController("c1");null==l.win?r.selectedIndex=0:"banker"==l.win?r.selectedIndex=1:"player"==l.win&&(r.selectedIndex=2),l.demo?a.getTransition("t0").play():a.getTransition("t0").stop(),a.getChild("n68").visible=l.bankerPair,a.getChild("n69").visible=l.playerPair,a.getChild("n72").visible=null!=i[o].ties&&i[o].ties.length>0,a.x=14*i[o].column+2,a.y=14*i[o].row+2,t.addChild(a)}}},{key:"cols",get:function(){return this._cols},set:function(e){this._cols=e,this.roadBig.width=14*this._cols+1}}]),e}(),c=function(){function e(t,i,o){n(this,e),this.view=t,this.road=t.getChildAt(0).asCom,this.circle=i||1,this.cols=this._orgCols=o||Math.max(24,Math.ceil(this.view.width/7))}return a(e,[{key:"makeResult",value:function(e,t){return e<=t?"red":e==t+1?"blue":"red"}},{key:"reverseResult",value:function(e){return"red"==e?"blue":"red"}},{key:"bigEye",value:function(e,t){for(var i=[],n=this.circle;n<e.length;n++){var o=e[n],a=n-this.circle,l=e[a].length-1,r=a-1;if(r>=0){var s=e[r].length-1,c=l+1;i.push(this.reverseResult(this.makeResult(c,s)))}for(var h=1;h<o.length;h++)i.push(this.makeResult(h,l))}return i[i.length-1]={color:i[i.length-1],isDemo:t},this.turn2Map(i)}},{key:"turn2Map",value:function(e){var t=6,i={},n=0,a=void 0,r=[],s=0;return e.forEach(function(e){var c;"object"==("undefined"==typeof e?"undefined":o(e))&&(c=e.isDemo,e=e.color),a&&a!=e&&n++;for(var h=n,u=0,d=!1;!d;){var g=h+"."+u,f=h+"."+(u+1);if(l.get(i,g))u+1>=t?h++:l.get(i,f)?l.get(i,f).result===e?u++:h++:u++;else{var v=l.merge({},{row:u,column:h,logicalColumn:n},{result:e,isDemo:c});l.set(i,g,v),r.push(i[h][u]),d=!0}}a=e,s=Math.max(s,h)}),r.maximumColumnReached=s,r}},{key:"refreshRoad",value:function(e,t){var i=this.road,n=this.bigEye(e,t),o=Math.max(n.maximumColumnReached,this._orgCols);this.cols=2*Math.round(o/2+1),n.maximumColumnReached>=this._orgCols?this.view.scrollPane.setPosX(i.width-this.view.width):this.view.scrollPane.setPosX(0),i.removeChildren(2);for(var a=0;a<n.length;a++){var l=fairygui.UIPackage.createObject("Package1","路格"+(2+this.circle)),r=n[a].result,s=n[a].isDemo,c=l.getController("c1");"red"==r?c.selectedIndex=0:c.selectedIndex=1,s?l.getTransition("t0").play():l.getTransition("t0").stop(),l.x=7*n[a].column+1,l.y=7*n[a].row+1,i.addChild(l)}}},{key:"cols",get:function(){return this._cols},set:function(e){this._cols=e,this.road.width=7*this._cols+1}}]),e}();e.exports={BeadPlate:r,BigRoad:s,BigEye:c}},152:function(e,t,i){e.exports=i.p+"baccarat@atlas1.png?06e0d6eddbb09cabb80b490997600f65"}});