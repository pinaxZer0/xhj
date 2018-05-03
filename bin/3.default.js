webpackJsonp([3,1,2,4,5,6],{

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _timers = __webpack_require__(16);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var tongji = window.tongji = __webpack_require__(80);
	var printf = __webpack_require__(20);
	function _noop() {}

	netmsg.on('rechargeComplete', null, function (pack) {
	    tongji.endCharge(pack.orderid, pack.money, 'appleStore');
	});

	function secToLongStr(sec) {
	    var hour = Math.floor(sec / 3600);
	    sec -= hour * 3600;
	    var minute = Math.floor(sec / 60);
	    sec -= minute * 60;
	    return printf('%02d%02d%02d', hour, minute, sec);
	}
	module.exports = function (_wins$Win) {
	    _inherits(AppleStoreRechargeWin, _wins$Win);

	    function AppleStoreRechargeWin() {
	        _classCallCheck(this, AppleStoreRechargeWin);

	        var _this = _possibleConstructorReturn(this, (AppleStoreRechargeWin.__proto__ || Object.getPrototypeOf(AppleStoreRechargeWin)).call(this, 'appleStoreRc'));

	        _this._timer = null;
	        return _this;
	    }

	    _createClass(AppleStoreRechargeWin, [{
	        key: 'hide',
	        value: function hide() {
	            if (this._timer) {
	                (0, _timers.clearInterval)(this._timer);
	                this._timer = null;
	            }
	            _get(AppleStoreRechargeWin.prototype.__proto__ || Object.getPrototypeOf(AppleStoreRechargeWin.prototype), 'hide', this).call(this);
	        }
	    }, {
	        key: 'refreshTimer',
	        value: function refreshTimer(sec) {
	            var cont = this.contentPane;
	            var str = secToLongStr(sec);
	            for (var i = 0; i < 6; i++) {
	                cont.getChild('n' + (28 + i)).text = str[i];
	            }
	        }
	    }, {
	        key: 'onInit',
	        value: function onInit() {
	            _get(AppleStoreRechargeWin.prototype.__proto__ || Object.getPrototypeOf(AppleStoreRechargeWin.prototype), 'onInit', this).call(this);
	            var self = this;
	            fairygui.GRoot.inst.showModalWait();
	            _socket.sendp({ c: 'applestore.cd' });
	            function afterCD() {
	                (0, _timers.clearInterval)(self._timer);
	                self._timer = null;
	                self.contentPane.getChild('n14').onClick(null, function () {
	                    _socket.sendp({ c: "applestore.freecoin" });
	                    tipon('恭喜您获得10000金币').popup();
	                    _socket.sendp({ c: 'applestore.cd' });
	                    netmsg.once('applestore.cd', this, handleAppleStoreCD);
	                });
	            }
	            function handleAppleStoreCD(pack) {
	                fairygui.GRoot.inst.closeModalWait();
	                self.refreshTimer(pack.sec);
	                if (pack.sec <= 0) {
	                    return afterCD();
	                }
	                self._timer = (0, _timers.setInterval)(function () {
	                    pack.sec--;
	                    if (pack.sec == 0) afterCD();
	                    if (pack.sec < 0) return;
	                    self.refreshTimer(pack.sec);
	                }, 1000);
	            }
	            netmsg.once('applestore.cd', this, handleAppleStoreCD);
	        }
	    }]);

	    return AppleStoreRechargeWin;
	}(wins.Win);

/***/ },

/***/ 80:
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function noop() {}

	var TDGA = window.TDGA;
	if (!TDGA) {
		TDGA = {
			Account: noop,
			onPageLeave: noop,
			onReward: noop,
			onChargeRequest: noop,
			onChargeSuccess: noop,
			onItemPurchase: noop,
			onMissionBegin: noop,
			onMissionCompleted: noop,
			onEvent: noop
		};
		TDGA.Account.setLevel = noop;
	}

	var Stat = function () {
		function Stat() {
			_classCallCheck(this, Stat);

			this._delayOp = [];
			this._inited = true;
		}

		_createClass(Stat, [{
			key: "init",
			value: function init(key) {
				this._inited = true;
				return;
			}
		}, {
			key: "_delay",
			value: function _delay(f) {
				if (!this._inited) {
					return this._delayOp.push({ f: f });
				}
				f();
			}
		}, {
			key: "userin",
			value: function userin(me) {
				this._delay(function () {
					var qudao = 0;
					if (!!window.cordova) {
						var o = { "Android": 1, "BlackBerry 10": 2, "browser": 3, "iOS": 4, "WinCE": 5, "Tizen": 6, "Mac OS X": 7 };
						qudao = o[device.platform] || 8;
					} else if (startup_param.pf == 'wechat') qudao = 101;
					TDGA.Account({
						accountId: me.id,
						level: me.level,
						accountName: me.nickname,
						gameServer: '通用',
						accountType: qudao,
						gender: startup_param.sex
					});
				});
			}
		}, {
			key: "userout",
			value: function userout() {
				this._delay(TDGA.onPageLeave.bind(TDGA));
			}
		}, {
			key: "levelup",
			value: function levelup(n) {
				this._delay(TDGA.Account.setLevel.bind(TDGA.Account, n));
			}
		}, {
			key: "reward",
			value: function reward(n, reason) {
				this._delay(TDGA.onReward.bind(TDGA, n, reason));
			}
		}, {
			key: "beginCharge",
			value: function beginCharge(orderid, money, tickets, desc, payment) {
				if (typeof tickets == 'string') {
					payment = desc;
					desc = tickets;
					tickets = Math.floor(money / 3);
				}
				this._delay(function () {
					TDGA.onChargeRequest({
						orderId: orderid,
						iapId: desc,
						currencyAmount: money,
						currencyType: 'CNY',
						virtualCurrencyAmount: tickets,
						paymentType: payment
					});
				});
			}
		}, {
			key: "endCharge",
			value: function endCharge(orderid, payment) {
				this._delay(function () {
					TDGA.onChargeSuccess({
						orderId: orderid,
						paymentType: payment
					});
				});
			}
		}, {
			key: "enterGame",
			value: function enterGame(tableid) {
				this._delay(function () {
					TDGA.onMissionBegin(tableid.toString());
				});
			}
		}, {
			key: "startGame",
			value: function startGame(tableid, name, tickets) {
				this._delay(function () {
					TDGA.onItemPurchase({ item: name, itemNumber: 1, priceInVirtualCurrency: tickets });
					TDGA.onEvent(name, {});
				});
			}
		}, {
			key: "endGame",
			value: function endGame(tableid) {
				this._delay(function () {
					TDGA.onMissionCompleted(tableid.toString());
				});
			}
		}, {
			key: "share",
			value: function share() {
				this._delay(function () {
					TDGA.onEvent('share', { user: { id: me.id, nickname: me.nickname } });
				});
			}
		}, {
			key: "invite",
			value: function invite(tableid, tabledesc) {
				this._delay(function () {
					TDGA.onEvent('invite', { user: { id: me.id, nickname: me.nickname }, table: { id: tableid, msg: tabledesc } });
				});
			}
		}, {
			key: "event",
			value: function event(name, data) {
				this._delay(function () {
					TDGA.onEvent(name, (typeof data === "undefined" ? "undefined" : _typeof(data)) == 'object' ? data : { data: data });
				});
			}
		}]);

		return Stat;
	}();

	var tongji = new Stat();
	window.onunload = tongji.userout.bind(tongji);

	module.exports = tongji;

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var tongji = window.tongji = __webpack_require__(80);

	function _noop() {}

	module.exports = function (_wins$Win) {
		_inherits(DebugRechargeWin, _wins$Win);

		function DebugRechargeWin() {
			_classCallCheck(this, DebugRechargeWin);

			return _possibleConstructorReturn(this, (DebugRechargeWin.__proto__ || Object.getPrototypeOf(DebugRechargeWin)).call(this, 'debugRc'));
		}

		_createClass(DebugRechargeWin, [{
			key: 'onInit',
			value: function onInit() {
				_get(DebugRechargeWin.prototype.__proto__ || Object.getPrototypeOf(DebugRechargeWin.prototype), 'onInit', this).call(this);
				this.contentPane.getChild('n10').onClick(this, function () {
					if (Number(this.contentPane.getChild('n8').text) < 10) return tipon('最少充值10元').popup();
					getAjax('createOrder', { userid: me.id, packid: 'userdefine', rmb: Number(this.contentPane.getChild('n8').text), payment: 'debugPayment' }, function (err, r) {
						if (err || r.err) return tipon(err || r.err).popup();
						return clientpay(r.orderid, r.money, 'userdefine');
					});
				});
			}
		}]);

		return DebugRechargeWin;
	}(wins.Win);
	var clientpay = function clientpay(orderid, money, desc, cb) {
		!cb && (cb = _noop);
		if (tipon) {
			tongji.beginCharge(orderid, money, desc, '测试通道');
			return getAjax('pf/default/pay', { orderid: orderid, money: money }, function (err, r) {
				if (err) return tipon(err.responseText).popup(cb);
				tipon('测试版，直接完成充值').popup(cb);
				tongji.endCharge(orderid, '测试通道');
			});
		}
		cb();
	};

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var tongji = window.tongji = __webpack_require__(80);

	function _noop() {}
	// function getAjax(url, data, callback) {
	// 	if (typeof data ==='function') {
	// 		callback =data;
	// 		data=null;
	// 	}
	// 	if (!callback) callback=function(){};
	// 	$.ajax({
	// 		type: "POST",
	// 		url: url,
	// 		dataType: "JSON",
	// 		data: data,
	// 		timeout:30000,
	// 		success: function (chunk) {
	// 			return callback(null, chunk);
	// 		},
	// 		error: function (e) {
	// 			//if (typeof console == "object") console.log(e);
	// 			callback(e);
	// 		}
	// 	})
	// }
	document.addEventListener('gameLoaded', function () {
		var defaultRechargeWin = new wins.RechargeWin();
		var device = /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.exec(navigator.userAgent);
		if (!device) device = 'pc';else device = device[0];
		wins.RechargeWin = function (_fairygui$Window) {
			_inherits(ServerDefinedRechargeWin, _fairygui$Window);

			function ServerDefinedRechargeWin() {
				_classCallCheck(this, ServerDefinedRechargeWin);

				return _possibleConstructorReturn(this, (ServerDefinedRechargeWin.__proto__ || Object.getPrototypeOf(ServerDefinedRechargeWin)).call(this));
			}

			_createClass(ServerDefinedRechargeWin, [{
				key: 'onInit',
				value: function onInit() {
					var self = this;
					fairygui.GRoot.inst.showModalWait();
					_socket.sendp({ c: 'rc.querymethod', inapp: startup_param.inApp, device: device });
					netmsg.once('rc.querymethod', null, function (pack) {
						fairygui.GRoot.inst.closeModalWait();
						self.hide();
						try {
							var Rcwin = __webpack_require__(85)("./" + pack.method.substring(0, pack.method.length - 4) + '.js');
						} catch (e) {
							return defaultRechargeWin.show();
						}
						var win = new Rcwin();
						win.show();
					});
				}
			}]);

			return ServerDefinedRechargeWin;
		}(fairygui.Window);
	});

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./appleStorePay.js": 79,
		"./debugpayment.js": 82,
		"./default.js": 84,
		"./defaultPayment.js": 86,
		"./hepay.js": 87,
		"./inapp.js": 88,
		"./wechat.js": 89
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 85;


/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var tongji = window.tongji = __webpack_require__(80);

	function _noop() {}

	module.exports = function (_wins$Win) {
	    _inherits(DefaultRechargeWin, _wins$Win);

	    function DefaultRechargeWin() {
	        _classCallCheck(this, DefaultRechargeWin);

	        return _possibleConstructorReturn(this, (DefaultRechargeWin.__proto__ || Object.getPrototypeOf(DefaultRechargeWin)).call(this, 'defaultRc'));
	    }

	    _createClass(DefaultRechargeWin, [{
	        key: 'onInit',
	        value: function onInit() {
	            _get(DefaultRechargeWin.prototype.__proto__ || Object.getPrototypeOf(DefaultRechargeWin.prototype), 'onInit', this).call(this);
	            this.contentPane.getChild('n10').onClick(this, function () {
	                tipon('请转至微信加 bjl8000 为好友，谢谢').popup();
	            });
	        }
	    }]);

	    return DefaultRechargeWin;
	}(wins.Win);

/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var tongji = window.tongji = __webpack_require__(80);
	function _noop() {}

	function post_to_url(path, params, method) {
	    method = method || "post";

	    var form = document.createElement("form");

	    //Move the submit function to another variable
	    //so that it doesn't get overwritten.
	    form._submit_function_ = form.submit;

	    form.setAttribute("method", method);
	    form.setAttribute("action", path);
	    form.setAttribute("target", "_blank");

	    for (var key in params) {
	        var hiddenField = document.createElement("input");
	        hiddenField.setAttribute("type", "hidden");
	        hiddenField.setAttribute("name", key);
	        hiddenField.setAttribute("value", params[key]);

	        form.appendChild(hiddenField);
	    }

	    document.body.appendChild(form);
	    form._submit_function_(); //Call the renamed function.
	}

	// document.addEventListener('gameLoaded', function() {
	netmsg.on('rechargeComplete', null, function (pack) {
	    tongji.endCharge(pack.orderid, pack.money, '和付');
	});
	// });

	module.exports = function (_wins$Win) {
	    _inherits(HepayRechargeWin, _wins$Win);

	    function HepayRechargeWin() {
	        _classCallCheck(this, HepayRechargeWin);

	        return _possibleConstructorReturn(this, (HepayRechargeWin.__proto__ || Object.getPrototypeOf(HepayRechargeWin)).call(this, 'hepayRc'));
	    }

	    _createClass(HepayRechargeWin, [{
	        key: "onInit",
	        value: function onInit() {
	            _get(HepayRechargeWin.prototype.__proto__ || Object.getPrototypeOf(HepayRechargeWin.prototype), "onInit", this).call(this);
	            var cont = this.contentPane;
	            cont.getChild('n5').getChild('n7').getChildAt(0).selected = true;
	            cont.getChild('n8').promptText = '最少20元';
	            cont.getChild('n10').onClick(this, function () {
	                var rechargeMethod = cont.getChild('n5').getChild('n7').getSelection();
	                if (rechargeMethod == 3) return tipon('请转至微信加 bjl8000 为好友，谢谢').popup();
	                if (rechargeMethod == 1) return tipon('微信充值暂不支持').popup();
	                var rmb = Number(cont.getChild('n8').text);
	                if (rmb < 20) {
	                    cont.getChild('n8').text = '20';
	                    return tipon('最少充值20元').popup();
	                }
	                if (rechargeMethod == 0) {
	                    var availble = [20, 30, 40, 50, 60, 80, 90, 100, 120, 140, 150, 160, 180, 200, 210, 220, 240, 250, 260, 270, 280, 300];
	                    var idx = availble.findIndex(function (ele) {
	                        return ele >= rmb;
	                    });
	                    if (idx < 0) {
	                        cont.getChild('n8').text = '' + availble[availble.length - 1];
	                        return tipon('支付宝每次最多充' + availble[availble.length - 1] + '元').popup();
	                    }
	                    if (availble[idx] != rmb) {
	                        if (idx > 0) {
	                            cont.getChild('n8').text = '' + availble[idx];
	                            return tipon('支付宝不能充' + rmb + '元，但是可以充' + availble[idx - 1] + '或' + availble[idx] + '元').popup();
	                        }
	                        return alert('you should never see this msg');
	                    }
	                }
	                fairygui.GRoot.inst.showModalWait();
	                getAjax('createOrder', { userid: me.id, packid: 'userdefine', rmb: rmb, payment: 'hepay' }, function (err, r) {
	                    fairygui.GRoot.inst.closeModalWait();
	                    if (err || r.err) return tipon(err || r.err).popup();
	                    return clientpay(r.orderid, r.money, 'userdefine', rechargeMethod);
	                });
	            });
	        }
	    }]);

	    return HepayRechargeWin;
	}(wins.Win);

	var clientpay = function clientpay(orderid, money, desc, type, cb) {
	    !cb && (cb = _noop);
	    tongji.beginCharge(orderid, money, desc, '和付');
	    fairygui.GRoot.inst.showModalWait();
	    return getAjax('pf/hepay/sign', { orderid: orderid, money: money, type: type }, function (err, r) {
	        if (err) {
	            fairygui.GRoot.inst.closeModalWait();
	            return tipon && tipon(err.responseText).popup(cb);
	        }
	        delete r.result;
	        post_to_url('http://hf.qzwygl.cn/biz_inter_sys/services/wap/pay', r);
	        setTimeout(function () {
	            fairygui.GRoot.inst.closeModalWait();
	        }, 4000);
	        cb();
	    });
	};

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// var _=require('../etc.js'), noop=_._noop;
	// var devicepf;
	// switch (device.platform) {
	// 	case 'iOS':
	// 		devicepf=require('./ios.js');
	// 	break;
	// 	case 'android':
	// 		devicepf=require('./android.js');
	// 	break;
	// 	default:
	// 		window.pay=function(orderid, money, desc, cb) {
	// 			!cb && (cb=_noop);
	// 			if (tipon) {
	// 				tipon(device.platfomr+'未实现').popup();
	// 			}
	// 			cb('not impl');
	// 		}
	// 		window.share=function() {
	// 			if (tipon) {
	// 				tipon(device.platfomr+'未实现').popup();
	// 			}
	// 		}
	// 		window.preShareResult=function(roomid, setnum, participants, winners, img) {
	// 			if (tipon) {
	// 				tipon(device.platfomr+'未实现').popup();
	// 			}
	// 		}
	// 	break;
	// }

	// module.exports=function() {
	// 	if (devicepf && typeof devicepf=='function') devicepf();
	// }

	__webpack_require__(84);

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var tongji = window.tongji = __webpack_require__(80);
	function _noop() {}
	function toRuleString(rule) {
		var str = '';
		rule['10'] && (str += '五小牛 ');
		rule['7'] && (str += '四炸牛 ');
		rule['5'] && (str += '五花牛 ');
		rule['4'] && (str += '四花牛 ');
		if (str.length == 0) str = '不带牛牛以上的牌型';else str = '带' + str;
		return str;
	}
	window.preInvite = function (v, opt) {
		if (!window.wechatObj) return;

		var shareObj = {
			type: 'link',
			title: '牛牛大作战，房号:' + v + '(' + opt.pan + '局)',
			link: 'http://h5.1357g.com/g/niuniu.app?room=' + v,
			//link:'http://h5.1357g.com/wnn/res244.jpg',
			imgUrl: location.origin + location.pathname + 'res/logo.png',
			//dataUrl:'http://h5.1357g.com/wnn/res244.jpg',
			desc: '轮庄，' + toRuleString(opt.rule) + ', ' + opt.dizhu + '底！'
			//success: function (){},
			//cancel: function (){}
		};
		window.wechatObj.shareOnChat(shareObj);
		window.wechatObj.shareOnMoment(shareObj);

		window.invite = function () {
			var tip = '点击' + (Laya.stage.canvasDegree == 0 ? '右' : '左') + '上角分享按钮，邀请好友加入游戏';
			tipon(tip).popup();
			tongji.invite(v, '轮庄，' + toRuleString(opt.rule) + ', ' + opt.dizhu + '底！');
		};
	};
	window.invite = function () {
		var tip = '点击' + (Laya.stage.canvasDegree == 0 ? '右' : '左') + '上角分享按钮，邀请好友加入游戏';
		tipon(tip).popup();
	};
	window.share = function () {
		var tip = '点击' + (Laya.stage.canvasDegree == 0 ? '右' : '左') + '上角分享按钮，分享到朋友圈';
		tipon(tip).popup();
		tongji.share();
	};
	window.preShareResult = function (roomid, setnum, participants, winners, img) {
		var shareObj = {
			type: 'link',
			title: '牛牛大作战，房号:' + roomid + (setnum != null ? ', 第' + setnum + '局' : ''),
			link: 'http://h5.1357g.com/g/niuniu.app' + img,
			//link:'http://h5.1357g.com/wnn/res244.jpg',
			imgUrl: 'http://h5.1357g.com/g/niuniu.app' + img,
			//dataUrl:'http://h5.1357g.com/wnn/res244.jpg',
			desc: (participants || []).join(',') + ' 胜利者 ' + (winners || []).join(',')
			//success: function (){},
			//cancel: function (){}		
		};
		window.wechatObj.shareOnChat(shareObj);
		window.wechatObj.shareOnMoment(shareObj);
	};
	window.pay = function (orderid, money, desc, cb) {
		!cb && (cb = _noop);
		tongji.beginCharge(orderid, money, desc, '微信公众号支付');
		getAjax('weixin/getWechatpayParams', { order: orderid, money: money, openid: startup_param.openid }, function (err, r) {
			if (err || r.err) return tipon(err || r.err).popup();
			r.success = function (res) {
				if (res.errMsg == "chooseWXPay:ok") {
					tongji.endCharge(orderid, '微信公众号支付');
					cb(null, true);
				} else {
					cb(null, false);
				}
			};
			wx.chooseWXPay(r);
		});
	};
	var async = __webpack_require__(15);
	var wxq = async.queue(function (task, cb) {
		if (typeof task == 'function') return task(cb);
		cb();
	});
	var wxr = { starting: false, stopping: false };
	function wxst(cb) {
		// window.log && window.log('stoping rec');
		function tryStop(_cb) {
			wx.stopRecord({
				success: function success(res) {
					// window.log && window.log('rec stopped');
					_cb(null, res);
				},
				fail: function fail(err) {
					// window.log && window.log('rec stop failed');
					_cb(err);
				}
			});
		}
		var timeoutVer = async.timeout(tryStop, 800);
		timeoutVer(cb);
	}
	window.startRecord = function (cb) {
		if (wxr.starting) return cb(wxr.starting);
		wxr.starting = true;
		wxq.push([
		// 先停下来
		// wxst, 
		// 再开始
		function (_cb) {
			// window.log && window.log('starting rec');
			wx.startRecord({
				fail: function fail(err) {
					// window.log&&  window.log('rec start failed');
					cb(err);
					cb = null;
				},
				sucess: function sucess() {
					// window.log && window.log('rec started');
				}
			});
			_cb();
		},
		// 保证500ms之后才能调用其它的
		function (_cb) {
			setTimeout(_cb, 500);
		}, function (_cb) {
			wxr.starting = false;
			cb && cb(wxr.starting);
			_cb();
		}]);
	};
	window.stopRecord = function (cb) {
		if (wxr.stopping) return cb('already stopping');
		wxr.stopping = true;
		wxq.push(wxst, function (err, res) {
			wxr.stopping = false;
			if (!cb) return;
			if (err) return cb(err);
			window.sendRecord(res.localId, cb);
		});
		// wx.stopRecord({
		// 	success: function (res) {
		// 		cb && window.sendRecord(res.localId, cb);
		// 	}
		// });
	};
	window.sendRecord = function (token, cb) {
		wx.uploadVoice({
			localId: token, // 需要上传的音频的本地ID，由stopRecord接口获得
			isShowProgressTips: 0, // 默认为1，显示进度提示
			success: function success(res) {
				var serverId = res.serverId; // 返回音频的服务器端ID
				cb(null, serverId);
			}
		});
	};
	var sndMap = {};
	window.playRecord = function (token, cb) {
		wx.downloadVoice({
			serverId: token, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
			isShowProgressTips: 0, // 默认为1，显示进度提示
			success: function success(res) {
				var localId = res.localId; // 返回音频的本地ID
				wx.playVoice({ localId: localId });
				sndMap[localId] = { cb: cb, t: new Date() };
			}
		});
	};

	function _init() {
		wx.onVoicePlayEnd({
			success: function success(res) {
				var o = sndMap[res.localId];
				console.log(res);
				if (typeof o.cb === 'function') {
					o.cb();
					delete sndMap[res.localId];
				}
			}
		});

		setInterval(function () {
			var now = new Date();
			for (var i in sndMap) {
				var o = sndMap[i];
				if (now - o.t >= 3000) {
					o.cb && o.cb();
					delete sndMap[i];
				}
			}
		}, 3000);
	}
	accWechatIntf('weixin/sign', {}, function (err, conf) {
		if (err) return console.log(err);
		var WechatJSSDK = __webpack_require__(90);
		conf.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice'];
		conf.success = function () {
			window.wxInit && window.wxInit();
		};
		var wechatObj = window.wechatObj = new WechatJSSDK(conf);
	});

	window.wxInit = function () {
		var shareObj = {
			type: 'link',
			title: '牛牛大作战，大家来斗牛',
			link: location.origin + location.pathname,
			imgUrl: location.origin + location.pathname + 'res/logo.png',
			desc: ''
			//success: function (){},
			//cancel: function (){}		
		};
		try {
			window.wechatObj.shareOnChat(shareObj);
			window.wechatObj.shareOnMoment(shareObj);
		} catch (e) {
			console.log(e);
		}

		wx.startRecord();
		function tryStop() {
			var _t = setInterval(function () {
				wx.stopRecord({
					success: function success(res) {
						clearInterval(_t);
					}
				});
			}, 300);
		}
		tryStop();

		_init();
	};

/***/ },

/***/ 90:
/***/ function(module, exports) {

	/*!
	 * @license MIT
	 * Client side js to use wechat-jssdk, also works with other server side service.
	 * https://github.com/JasonBoy/wechat-jssdk
	 */

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var document = window.document;
	var location = window.location;

	//default wechat script url
	var defaultScriptUrl = location.protocol + '//res.wx.qq.com/open/js/jweixin-1.0.0.js';

	//default apis with share-on-moment and share-on-chat
	var defaultApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];

	var WechatJSSDK = function () {
	  /**
	   * Initialize the WechatJSSDK instance
	   * @constructor
	   * @param {object} wechatConfig, should contain like:
	   *   {
	   *      appId: 'xxxx',
	   *      timestamp: '',
	   *      nonceStr: '',
	   *      signature: '',
	   *      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', ...],
	   *      success: function(){}, //sign success callback
	   *      error: function(){}, //sign error callback
	   *      customUrl: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js' // set custom weixin script url
	   *   }
	   * @returns {WechatJSSDK}
	   */
	  function WechatJSSDK(wechatConfig) {
	    _classCallCheck(this, WechatJSSDK);

	    //using new WechatJSSDK(config);
	    if (this instanceof WechatJSSDK) {
	      this.config = wechatConfig || {};
	      if (this.config.customUrl) {
	        defaultScriptUrl = this.config.customUrl;
	        delete this.config.customUrl;
	      }
	      var apiList = this.config.jsApiList;
	      //add more apis if passed in
	      if (!apiList || apiList.length <= 0) {
	        this.config.jsApiList = defaultApiList;
	      } else {
	        var i = 0;
	        var length = defaultApiList.length;
	        for (; i < length; i++) {
	          var defaultItem = defaultApiList[i];
	          if (apiList.indexOf(defaultItem) < 0) {
	            apiList.push(defaultItem);
	          }
	        }
	      }
	      this.debug = !!this.config.debug;
	      this.loadScript();
	      return this;
	    }
	    return new WechatJSSDK(wechatConfig);
	  }

	  /**
	   * Sign the signature now
	   * @param {object} [newSignConfig], debug mode, appId, jsApiList cannot be changed!!!
	   *        , should only provide new signature specific config
	   * @returns {WechatJSSDK} sdk instance
	   */


	  _createClass(WechatJSSDK, [{
	    key: 'signSignature',
	    value: function signSignature(newSignConfig) {
	      var _this = this;

	      var selfConfig = this.config;
	      var config = newSignConfig || selfConfig;
	      var signConfig = {
	        debug: this.debug,
	        appId: selfConfig.appId,
	        timestamp: config.timestamp || selfConfig.timestamp,
	        nonceStr: config.nonceStr || selfConfig.nonceStr,
	        signature: config.signature || selfConfig.signature,
	        jsApiList: selfConfig.jsApiList.slice(0, selfConfig.jsApiList.length)
	      };
	      var debug = this.debug;
	      if (!window.wx) {
	        console.warn('wechat js not defined');
	        return this;
	      }
	      var wx = window.wx;
	      wx.config(signConfig);
	      wx.ready(function () {
	        console.log('sign signature finished...');
	        debug && alert('sign signature finished...');
	        config.success && config.success.call(_this);
	      });

	      wx.error(function (err) {
	        debug && alert('sign error: ' + JSON.stringify(err));
	        config.error && config.error.call(_this, err);
	      });

	      //export original wx object
	      this.wx || (this.wx = wx);
	      return this;
	    }
	  }, {
	    key: 'loadScript',


	    /**
	     * Load wechat js script and sign the signature
	     * @returns {WechatJSSDK}
	     */
	    value: function loadScript() {
	      var _this2 = this;

	      var ele = document.createElement('script');
	      ele.type = 'text\/javascript';
	      ele.async = true;
	      ele.onload = function () {
	        console.log('Wechat script loaded successfully!');
	        //init the wechat config
	        _this2.signSignature();
	      };
	      ele.onerror = function (err) {
	        console.error('Failed to load wechat script!');
	        console.error(err);
	        _this2.debug && alert('Cannot load wechat script!');
	      };
	      var linkEle = document.getElementsByTagName('script')[0];
	      linkEle.parentNode.insertBefore(ele, linkEle);
	      ele.src = defaultScriptUrl;
	      return this;
	    }
	  }, {
	    key: 'shareOnMoment',


	    /**
	     * Quick way to set custom moment share configs
	     * @param {object} info
	     * @returns {WechatJSSDK}
	     */
	    value: function shareOnMoment(info) {
	      if (!info) return this;
	      return this.callWechatApi('onMenuShareTimeline', info);
	    }
	  }, {
	    key: 'shareOnChat',


	    /**
	     * Quick way to set custom chat share configs
	     * @param {object} info
	     * @returns {WechatJSSDK}
	     */
	    value: function shareOnChat(info) {
	      if (!info) return this;
	      return this.callWechatApi('onMenuShareAppMessage', info);
	    }
	  }, {
	    key: 'callWechatApi',


	    /**
	     * Call any wechat api
	     * @param {string} apiName
	     * @param {object} config specific api config
	     * @returns {WechatJSSDK}
	     */
	    value: function callWechatApi(apiName, config) {
	      if (!apiName) return this;
	      var debug = this.debug;
	      if (this.config.jsApiList.indexOf(apiName) < 0) {
	        debug && alert('the wechat api [' + apiName + '] you call was not registered, \npls add the api into your [jsApiList] config');
	        return this;
	      }
	      var customAPI = this.wx[apiName];
	      if (!customAPI || 'function' !== typeof customAPI) {
	        debug && alert('no such api [' + apiName + '] found!');
	        return this;
	      }
	      customAPI(config);
	      return this;
	    }
	  }]);

	  return WechatJSSDK;
	}();

	module.exports = WechatJSSDK;

/***/ }

});