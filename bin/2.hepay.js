webpackJsonp([2],{

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

	netmsg.on('rechargeComplete', null, function (pack) {
	    tongji.endCharge(pack.orderid, pack.money, '和付');
	});
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

/***/ }

});