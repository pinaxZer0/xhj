webpackJsonp([9,1],{

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

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var async = __webpack_require__(15),
	    me = __webpack_require__(76),
	    printf = __webpack_require__(20),
	    etc = __webpack_require__(19),
	    EventEmitter = __webpack_require__(25),
	    clone = __webpack_require__(10);
	var wins = __webpack_require__(95);
	var ROAD = __webpack_require__(158),
	    BeadPlate = ROAD.BeadPlate,
	    BigRoad = ROAD.BigRoad,
	    BigEye = ROAD.BigEye;

	var Loader = laya.net.Loader;
	var Handler = laya.utils.Handler;

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var HallUI = function () {
		function HallUI(opt) {
			_classCallCheck(this, HallUI);

			this.opt = opt;
		}

		_createClass(HallUI, [{
			key: 'renderTables',
			value: function renderTables(index, obj) {
				var tbl = this.tables[index];
				obj.getChild('n94').text = printf('房间%s', tbl.roomid);
				obj.getChild('n95').text = printf('限红：%d-%d', tbl.minZhu, tbl.maxZhu);
				obj.getChild('n85').text = '-';
				obj.getChild('n87').text = '-';
				obj.getChild('n89').text = '-';
				obj.getChild('n91').text = tbl.online;
				var btn = obj.getChild('n93');
				btn.offClick(obj, obj._clickHandler);
				obj._clickHandler = function () {
					_socket.sendp({ c: 'join', code: tbl.roomid });
				};
				btn.onClick(obj, obj._clickHandler);
				var his = tbl.his;
				// if (!his ||his.length==0) return;
				new BeadPlate(obj.getChild('n17').getChild('n1')).refreshRoad(tbl.his);
				var bigr = new BigRoad(obj.getChild('n19').getChild('n19'));
				bigr.refreshRoad(tbl.his);
				var lr = bigr.logicalRoad(tbl.his);
				new BigEye(obj.getChild('n20').getChild('n20')).refreshRoad(lr);
				new BigEye(obj.getChild('n22').getChild('n23'), 2).refreshRoad(lr);
				new BigEye(obj.getChild('n23').getChild('n23'), 3).refreshRoad(lr);

				var bankerWins = 0,
				    playerWins = 0,
				    tieWins = 0,
				    bankerPair = 0,
				    playerPair = 0,
				    tian = 0;
				for (var i = 0; i < his.length; i++) {
					if (his[i].win == 'banker') bankerWins++;else if (his[i].win == 'player') playerWins++;else tieWins++;
					if (his[i].bankerPair) bankerPair++;
					if (his[i].playerPair) playerPair++;
					if (his[i].playerTian) tian++;
					if (his[i].bankerTian) tian++;
				}
				obj.getChild('n85').text = bankerWins;
				obj.getChild('n87').text = playerWins;
				obj.getChild('n89').text = tieWins;
			}
		}, {
			key: 'assignAllBtns',
			value: function assignAllBtns() {
				'use strict';

				var _this = this;

				var cl = this._view._children;
				var fairyguiNamedEle = /[A-Za-z]\d+/;
				for (var i = 0; i < cl.length; i++) {
					var btn = cl[i].asButton;
					if (btn instanceof fairygui.GButton) {
						var _ret = function () {
							if (fairyguiNamedEle.test(btn.name)) return 'continue';
							var _n = btn.name.split('.');
							var _idx = _n[1] || 1;
							_n = _n[0];
							var ctrl = _this._view.getController(_n);
							if (ctrl) {
								btn.onClick(_this, function () {
									ctrl.selectedIndex = _idx;
								});
								ctrl.setSelectedIndex(0);
							} else {
								btn.onClick(_this, function () {
									var candiName = capitalizeFirstLetter(_n) + 'Win';
									if (wins[candiName]) {
										var win = new wins[candiName]();
									} else var win = new wins.Win(_n);
									win.modal = true;
									win.show();
								});
							}
						}();

						if (_ret === 'continue') continue;
					}
				}
			}
		}, {
			key: 'active',
			value: function active() {
				var self = this;
				fairygui.GRoot.inst.showModalWait();
				_socket.sendp({ c: 'alltables' });
				netmsg.once('alltables', this, function (pack) {
					fairygui.GRoot.inst.closeModalWait();
					console.log(pack);
					this.tables = [];
					for (var id in pack.tables) {
						pack.tables[id].roomid = id;
						this.tables.push(pack.tables[id]);
					}
					var list = this._view.getChild('n39').asList;
					var num = this.tables.length;
					if (num != list.numItems) list.numItems = num;else list.refreshVirtualList();
				});
			}
		}, {
			key: 'deactive',
			value: function deactive() {}
		}], [{
			key: 'create',
			value: function create(opt, cb) {
				if (typeof opt === 'function') {
					cb = opt;opt = {};
				}
				async.parallel([function loadres(cb) {
					Laya.loader.load([{ url: __webpack_require__(149), type: Loader.IMAGE }, { url: __webpack_require__(159), type: Loader.IMAGE }, { url: __webpack_require__(160), type: Loader.IMAGE }, { url: __webpack_require__(151), type: Loader.BUFFER }], Handler.create(null, function () {
						cb();
					}));
				}, function queryPayment(cb) {
					var device = /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.exec(navigator.userAgent);
					if (!device) device = 'pc';
					_socket.sendp({ c: 'rc.querymethod', inapp: startup_param.inApp, device: device });
					netmsg.once('rc.querymethod', null, function (pack) {
						cb(null, pack);
					});
				}], function fin(err, r) {
					if (!!window.magiclink) {
						magiclink.reg(function (room) {
							console.log('magiclink ret', room);
							_socket.sendp({ c: 'join', code: room });
						});
					}
					var hall = new HallUI(opt);
					fairygui.UIPackage.addPackage("baccarat");
					fairygui.UIConfig.buttonSound = null;
					fairygui.UIConfig.buttonSoundVolumeScale = 0;
					var _view = fairygui.UIPackage.createObject("Package1", "大厅").asCom;

					var supportedPayment = r[1];
					// for (var i=0; i<supportedPayment.length; i++) {
					if (supportedPayment.method == 'appleStorePayItem') {
						// ios dedicated
						_view.getController('c1').selectedIndex = 1;
						_view.getChild('n61').onClick(null, function () {
							var Rcwin = __webpack_require__(79);
							var win = new Rcwin();
							win.show();
						});
					}
					// }

					hall._view = _view;
					hall.usernick = _view.getChild('n4').asTextField;
					hall.usericon = _view.getChild('account').getChild('n3').asLoader;
					hall.usericon.onClick(null, function () {
						var win = new wins.AccountWin();
						win.modal = true;
						win.show();
					});
					hall.assignAllBtns();

					me.removeAllListeners('nicknamechgd').on('nicknamechgd', function () {
						hall.usernick.text = me.nickname;
					});
					me.removeAllListeners('facechgd').on('facechgd', function () {
						me.face && (hall.usericon.url = me.face);
					});
					me.removeAllListeners('coinschgd').on('coinschgd', function () {
						_view.getChild('n10').asTextField.text = me.coins || 0;
					});
					function buy() {
						var win = new wins.BuyTicketsWin();
						win.modal = true;
						win.show();
					}
					var list = _view.getChild('n39').asList;
					list.setVirtual();
					list.itemRenderer = Handler.create(hall, hall.renderTables, null, false);
					list.numItems = 0;

					_view.getChild('n45').onClick(null, function () {
						// 选择服务器
						if (hall.tables.length == 0) return;
						var tbls = clone(hall.tables);
						tbls.sort(function (a, b) {
							return b.minZhu - a.minZhu;
						});
						for (var i = 0; i < tbls.length; i++) {
							if (me.coins > tbls[i].minZhu) return _socket.sendp({ c: 'join', code: tbls[i].roomid });
						}
						_socket.sendp({ c: 'join', code: tbls[i - 1].roomid });
					});
					cb(null, hall);
				});
			}
		}]);

		return HallUI;
	}();

	module.exports = HallUI.create;

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ = __webpack_require__(96);

	var BeadPlate = function () {
		/**
	  * 
	  * @param {fairygui.GObject} view 
	  */
		function BeadPlate(view) {
			_classCallCheck(this, BeadPlate);

			this.view = view; //.getChild('n2').getChild('n17').getChild('n1');
			this.roadBeadPlate = view.getChildAt(0).asCom;
			this.cols = this._orgCols = Math.max(9, Math.ceil(this.view.width / 27));
			this.roadBeadPlate.getChild('n90').asList.removeChildren();

			var self = this;
		}

		_createClass(BeadPlate, [{
			key: 'refreshRoad',
			value: function refreshRoad(his) {
				var road = this.roadBeadPlate.getChild('n90').asList;
				road.removeChildren();
				// if (his.length<road._children.length) {
				// 	road.removeChildren();
				// 	// this.cols=this._orgCols;
				// 	// return;
				// }
				var curCol = Math.floor(his.length / 6) + 1;
				var width = Math.max(curCol, this._orgCols);
				// if (width>this.cols) {
				this.cols = width;
				if (curCol >= this._orgCols) this.view.scrollPane.setPosX(this.roadBeadPlate.width - this.view.width);else this.view.scrollPane.setPosX(0);
				// }
				for (var i = road._children.length; i < his.length; i++) {
					var obj = fairygui.UIPackage.createObject('Package1', '路格1');
					var pan = his[i];
					var winCtrl = obj.getController('c1');
					winCtrl.selectedIndex = 0;
					if (!pan) return;
					if (pan.win == 'banker') winCtrl.selectedIndex = 1;else if (pan.win == 'player') winCtrl.selectedIndex = 2;else winCtrl.selectedIndex = 3;
					if (pan.demo) obj.getTransition('t0').play();else obj.getTransition('t0').stop();

					obj.getChild('n6').visible = pan.bankerPair;
					obj.getChild('n7').visible = pan.playerPair;
					road.addChild(obj);
				}
			}
		}, {
			key: 'cols',
			get: function get() {
				return this._cols;
			},
			set: function set(n) {
				this._cols = n;
				this.roadBeadPlate.width = 28 * this._cols + 1;
			}
		}]);

		return BeadPlate;
	}();

	var BigRoad = function () {
		function BigRoad(view) {
			_classCallCheck(this, BigRoad);

			this.view = view; //.getChild('n2').getChild('n19').getChild('n19');
			this.roadBig = view.getChildAt(0).asCom;
			this.cols = this._orgCols = Math.max(24, Math.ceil(this.view.width / 13));
			var self = this;
		}

		_createClass(BigRoad, [{
			key: 'bigRoad',
			value: function bigRoad() {
				var gameResults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

				var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
				    _ref$columns = _ref.columns,
				    columns = _ref$columns === undefined ? 12 : _ref$columns,
				    _ref$rows = _ref.rows,
				    rows = _ref$rows === undefined ? 6 : _ref$rows;

				var tieStack = [];
				var placementMap = {};
				var logicalColumnNumber = 0;
				var lastItem = void 0;
				var returnList = [];
				var maximumColumnReached = 0;

				gameResults.forEach(function (gameResult) {
					if (gameResult.win === 'tie') {
						tieStack.push(gameResult);
					} else {
						if (lastItem) {
							// Add the ties that happened inbetween the last placed big road item
							// and this new big road item to the last entered big road item.
							var lastItemInResults = _.last(returnList);
							if (lastItem.win === 'tie') {
								if (lastItemInResults) {
									lastItemInResults.ties = _.cloneDeep(tieStack);
									tieStack = [];
									lastItem = lastItemInResults.result;
								}
								// else lastItem.win=null;
							}
							if (lastItemInResults) {
								// If this item is different from the outcome of the last game
								// then we must place it in another column
								if (lastItem.win && lastItem.win !== gameResult.win) {
									logicalColumnNumber++;
								}
							}
						}

						var probeColumn = logicalColumnNumber;
						var probeRow = 0;
						var done = false;

						while (!done) {
							var keySearch = probeColumn + '.' + probeRow;
							var keySearchBelow = probeColumn + '.' + (probeRow + 1);

							// Position available at current probe location
							if (!_.get(placementMap, keySearch)) {
								var newEntry = _.merge({}, {
									row: probeRow,
									column: probeColumn,
									logicalColumn: logicalColumnNumber,
									ties: _.cloneDeep(tieStack)
								}, { result: gameResult });
								_.set(placementMap, keySearch, newEntry);
								returnList.push(placementMap[probeColumn][probeRow]);

								done = true;
							}
							// The spot below would go beyond the table bounds.
							else if (probeRow + 1 >= rows) {
									probeColumn++;
								}
								// The spot below is empty.
								else if (!_.get(placementMap, keySearchBelow)) {
										probeRow++;
									}
									// The result below is the same outcome.
									else if (_.get(placementMap, keySearchBelow).result.win === gameResult.win) {
											probeRow++;
										} else {
											probeColumn++;
										}
						}
						tieStack = [];
						maximumColumnReached = Math.max(maximumColumnReached, probeColumn);
					}

					lastItem = gameResult;
				});
				// There were no outcomes added to the placement map.
				// We only have ties.
				if (_.isEmpty(returnList) && tieStack.length > 0) {
					returnList.push({
						ties: _.cloneDeep(tieStack),
						column: 0,
						row: 0,
						logicalColumn: 0,
						result: {} });
				} else if (!_.isEmpty(returnList) && tieStack.length) {
					_.last(returnList).ties = _.cloneDeep(tieStack);
				}

				returnList.maximumColumnReached = maximumColumnReached;
				return returnList;
			}
		}, {
			key: 'logicalRoad',
			value: function logicalRoad() {
				var gameResults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

				var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
				    _ref2$columns = _ref2.columns,
				    columns = _ref2$columns === undefined ? 12 : _ref2$columns,
				    _ref2$rows = _ref2.rows,
				    rows = _ref2$rows === undefined ? 6 : _ref2$rows;

				var tieStack = [];
				var placementMap = [];
				var logicalColumnNumber = 0;
				var lastItem = void 0;
				var returnList = [];
				var maximumColumnReached = 0;

				// Build the logical column definitions that doesn't represent
				// the actual "drawn" roadmap.
				gameResults.forEach(function (gameResult) {
					if (gameResult.win === 'tie') return;else {
						if (lastItem) {
							// Add the ties that happened inbetween the last placed big road item
							// and this new big road item to the last entered big road item.
							// If this item is different from the outcome of the last game
							// then we must place it in another column
							if (lastItem.win && lastItem.win !== gameResult.win) {
								logicalColumnNumber++;
							}
						}

						if (!placementMap[logicalColumnNumber]) placementMap[logicalColumnNumber] = [{ result: gameResult }];else placementMap[logicalColumnNumber].push({ result: gameResult });
					}

					lastItem = gameResult;
				});
				return placementMap;
			}
		}, {
			key: 'refreshRoad',
			value: function refreshRoad(his) {
				var road = this.roadBig;
				// var data=this.bigRoad(his);
				var data = this.bigRoad(his);
				var width = Math.max(data.maximumColumnReached, this._orgCols);
				// if (width>this.cols) {
				this.cols = Math.floor(width / 2) * 2 + 2;
				if (data.maximumColumnReached >= this._orgCols) this.view.scrollPane.setPosX(this.roadBig.width - this.view.width);else this.view.scrollPane.setPosX(0);
				// }
				// if(his.length==0) 
				// if (data.maximumColumnReached>=this.cols-1) {
				// 	this.cols=Math.floor(data.maximumColumnReached/2)*2+2;
				// 	this.view.scrollPane.setPosX(this.roadBig.width-this.view.width);
				// }
				road.removeChildren(2);
				for (var i = 0; i < data.length; i++) {
					var obj = fairygui.UIPackage.createObject('Package1', '路格2');
					var pan = data[i].result;
					var winCtrl = obj.getController('c1');
					if (pan.win == null) winCtrl.selectedIndex = 0;else if (pan.win == 'banker') winCtrl.selectedIndex = 1;else if (pan.win == 'player') winCtrl.selectedIndex = 2;
					if (pan.demo) obj.getTransition('t0').play();else obj.getTransition('t0').stop();

					obj.getChild('n68').visible = pan.bankerPair;
					obj.getChild('n69').visible = pan.playerPair;
					obj.getChild('n72').visible = data[i].ties != null && data[i].ties.length > 0;
					obj.x = data[i].column * 14 + 2;
					obj.y = data[i].row * 14 + 2;
					road.addChild(obj);
				}
			}
		}, {
			key: 'cols',
			get: function get() {
				return this._cols;
			},
			set: function set(n) {
				this._cols = n;
				this.roadBig.width = 14 * this._cols + 1;
			}
		}]);

		return BigRoad;
	}();

	var BigEye = function () {
		function BigEye(view, circle, cols) {
			_classCallCheck(this, BigEye);

			this.view = view;
			this.road = view.getChildAt(0).asCom;
			this.circle = circle || 1;
			this.cols = this._orgCols = cols || Math.max(12 * 2, Math.ceil(this.view.width / 7));
			// if (this.circle==2) this.cols*=2;
			var self = this;
		}

		_createClass(BigEye, [{
			key: 'makeResult',
			value: function makeResult(thisHigh, preHigh) {
				if (thisHigh <= preHigh) return 'red';
				if (thisHigh == preHigh + 1) return 'blue';
				return 'red';
			}
		}, {
			key: 'reverseResult',
			value: function reverseResult(r) {
				if (r == 'red') return 'blue';
				return 'red';
			}
		}, {
			key: 'bigEye',
			value: function bigEye(bigRoadPlacement, withDemo) {
				var tieStack = [];
				var placementMap = {};
				var logicalColumnNumber = 0;
				var lastItem = void 0;
				var returnList = [];
				var maximumColumnReached = 0;

				for (var col = this.circle; col < bigRoadPlacement.length; col++) {
					var brCol = bigRoadPlacement[col];
					var compareCol = col - this.circle,
					    high = bigRoadPlacement[compareCol].length - 1;
					// for first cell in each col
					var preCompareCol = compareCol - 1;
					if (preCompareCol >= 0) {
						var preHigh = bigRoadPlacement[preCompareCol].length - 1;
						var firstCellHigh = high + 1;
						returnList.push(this.reverseResult(this.makeResult(firstCellHigh, preHigh)));
					}
					for (var row = 1; row < brCol.length; row++) {
						returnList.push(this.makeResult(row, high));
					}
				}
				returnList[returnList.length - 1] = { color: returnList[returnList.length - 1], isDemo: withDemo };

				return this.turn2Map(returnList);
			}
		}, {
			key: 'turn2Map',
			value: function turn2Map(results) {
				var rows = 6;
				var placementMap = {};
				var logicalColumnNumber = 0;
				var lastItem = void 0;
				var returnList = [];
				var maximumColumnReached = 0;
				results.forEach(function (gameResult) {
					var isDemo;
					if ((typeof gameResult === 'undefined' ? 'undefined' : _typeof(gameResult)) == 'object') {
						isDemo = gameResult.isDemo;
						gameResult = gameResult.color;
					}
					if (lastItem && lastItem != gameResult) logicalColumnNumber++;
					var probeColumn = logicalColumnNumber;
					var probeRow = 0;
					var done = false;

					while (!done) {
						var keySearch = probeColumn + '.' + probeRow;
						var keySearchBelow = probeColumn + '.' + (probeRow + 1);

						// Position available at current probe location
						if (!_.get(placementMap, keySearch)) {
							var newEntry = _.merge({}, {
								row: probeRow,
								column: probeColumn,
								logicalColumn: logicalColumnNumber
							}, { result: gameResult, isDemo: isDemo });
							_.set(placementMap, keySearch, newEntry);
							returnList.push(placementMap[probeColumn][probeRow]);

							done = true;
						}
						// The spot below would go beyond the table bounds.
						else if (probeRow + 1 >= rows) {
								probeColumn++;
							}
							// The spot below is empty.
							else if (!_.get(placementMap, keySearchBelow)) {
									probeRow++;
								}
								// The result below is the same outcome.
								else if (_.get(placementMap, keySearchBelow).result === gameResult) {
										probeRow++;
									} else {
										probeColumn++;
									}
					}

					lastItem = gameResult;
					maximumColumnReached = Math.max(maximumColumnReached, probeColumn);
				});

				returnList.maximumColumnReached = maximumColumnReached;
				return returnList;
			}
		}, {
			key: 'refreshRoad',
			value: function refreshRoad(bigRoadPlacement, withDemo) {
				var road = this.road;
				// var data=this.bigRoad(his);
				var data = this.bigEye(bigRoadPlacement, withDemo);
				var width = Math.max(data.maximumColumnReached, this._orgCols);
				// if (width>this.cols) {
				this.cols = Math.round(width / 2 + 1) * 2;
				if (data.maximumColumnReached >= this._orgCols) this.view.scrollPane.setPosX(road.width - this.view.width);else this.view.scrollPane.setPosX(0);
				// }
				// if (data.maximumColumnReached>=this.cols-1) {
				// 	this.cols=Math.floor(data.maximumColumnReached/2)*2+2;
				// 	this.view.scrollPane.setPosX(this.road.width-this.view.width);
				// }
				road.removeChildren(2);
				for (var i = 0; i < data.length; i++) {
					var obj = fairygui.UIPackage.createObject('Package1', '路格' + (2 + this.circle));
					var r = data[i].result,
					    isDemo = data[i].isDemo;
					var winCtrl = obj.getController('c1');
					if (r == 'red') winCtrl.selectedIndex = 0;else winCtrl.selectedIndex = 1;
					if (isDemo) obj.getTransition('t0').play();else obj.getTransition('t0').stop();

					obj.x = data[i].column * 7 + 1;
					obj.y = data[i].row * 7 + 1;
					road.addChild(obj);
				}
				// this.view.scroll
			}
		}, {
			key: 'cols',
			get: function get() {
				return this._cols;
			},
			set: function set(n) {
				this._cols = n;
				this.road.width = 7 * this._cols + 1;
			}
		}]);

		return BigEye;
	}();

	;

	module.exports = {
		BeadPlate: BeadPlate,
		BigRoad: BigRoad,
		BigEye: BigEye
	};

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "baccarat@atlas1.png?06e0d6eddbb09cabb80b490997600f65";

/***/ }

});