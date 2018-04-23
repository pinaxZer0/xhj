webpackJsonp([13],{

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

/***/ 259:
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

/***/ }

});