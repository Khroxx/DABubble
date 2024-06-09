'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">da-bubble documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links"' : 'data-bs-target="#xs-components-links"', ">\n                            <span class=\"icon ion-md-cog\"></span>\n                            <span>Components</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="components-links"' : 'id="xs-components-links"', ">\n                            <li class=\"link\">\n                                <a href=\"components/AddChannelCardComponent.html\" data-type=\"entity-link\" >AddChannelCardComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AddMemberCardComponent.html\" data-type=\"entity-link\" >AddMemberCardComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" >AppComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AvatarComponent.html\" data-type=\"entity-link\" >AvatarComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ChannelComponent.html\" data-type=\"entity-link\" >ChannelComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/CheckEmailComponent.html\" data-type=\"entity-link\" >CheckEmailComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DialogAddMemberComponent.html\" data-type=\"entity-link\" >DialogAddMemberComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DialogAddMemberMobileComponent.html\" data-type=\"entity-link\" >DialogAddMemberMobileComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DialogEditChannelComponent.html\" data-type=\"entity-link\" >DialogEditChannelComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DialogEditProfileComponent.html\" data-type=\"entity-link\" >DialogEditProfileComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DialogEmojiPickerComponent.html\" data-type=\"entity-link\" >DialogEmojiPickerComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DialogShowMembersComponent.html\" data-type=\"entity-link\" >DialogShowMembersComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DialogShowProfileComponent.html\" data-type=\"entity-link\" >DialogShowProfileComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/EmailSnackbarComponent.html\" data-type=\"entity-link\" >EmailSnackbarComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/HeaderComponent.html\" data-type=\"entity-link\" >HeaderComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ImprintComponent.html\" data-type=\"entity-link\" >ImprintComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/LoginComponent.html\" data-type=\"entity-link\" >LoginComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/LoginPageComponent.html\" data-type=\"entity-link\" >LoginPageComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/LoginSnackbarComponent.html\" data-type=\"entity-link\" >LoginSnackbarComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/LogOutDialogComponent.html\" data-type=\"entity-link\" >LogOutDialogComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MainHeaderComponent.html\" data-type=\"entity-link\" >MainHeaderComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MainMenuChannelsComponent.html\" data-type=\"entity-link\" >MainMenuChannelsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MainMenuComponent.html\" data-type=\"entity-link\" >MainMenuComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MainMenuDmComponent.html\" data-type=\"entity-link\" >MainMenuDmComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MainMenuHeaderComponent.html\" data-type=\"entity-link\" >MainMenuHeaderComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MainPageComponent.html\" data-type=\"entity-link\" >MainPageComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MessageComponent.html\" data-type=\"entity-link\" >MessageComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MessageInputComponent.html\" data-type=\"entity-link\" >MessageInputComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/PrivacyPolicyComponent.html\" data-type=\"entity-link\" >PrivacyPolicyComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ResetPasswordComponent.html\" data-type=\"entity-link\" >ResetPasswordComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SearchBarComponent.html\" data-type=\"entity-link\" >SearchBarComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SearchResultsComponent.html\" data-type=\"entity-link\" >SearchResultsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SignInComponent.html\" data-type=\"entity-link\" >SignInComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ThreadComponent.html\" data-type=\"entity-link\" >ThreadComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/UserCreatedSnackbarComponent.html\" data-type=\"entity-link\" >UserCreatedSnackbarComponent</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#directives-links"' : 'data-bs-target="#xs-directives-links"', ">\n                                <span class=\"icon ion-md-code-working\"></span>\n                                <span>Directives</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"directives/OpenProfileDirective.html\" data-type=\"entity-link\" >OpenProfileDirective</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/ChannelFirebaseService.html\" data-type=\"entity-link\" >ChannelFirebaseService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/CustomDialogService.html\" data-type=\"entity-link\" >CustomDialogService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/MessageService.html\" data-type=\"entity-link\" >MessageService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProfileService.html\" data-type=\"entity-link\" >ProfileService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ReactionService.html\" data-type=\"entity-link\" >ReactionService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/SearchService.html\" data-type=\"entity-link\" >SearchService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/SharedService.html\" data-type=\"entity-link\" >SharedService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/StateManagementService.html\" data-type=\"entity-link\" >StateManagementService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ThreadService.html\" data-type=\"entity-link\" >ThreadService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserAuthService.html\" data-type=\"entity-link\" >UserAuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserManagementService.html\" data-type=\"entity-link\" >UserManagementService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserService.html\" data-type=\"entity-link\" >UserService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UtilityService.html\" data-type=\"entity-link\" >UtilityService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/Channel.html\" data-type=\"entity-link\" >Channel</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DialogParams.html\" data-type=\"entity-link\" >DialogParams</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Message.html\" data-type=\"entity-link\" >Message</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Reaction.html\" data-type=\"entity-link\" >Reaction</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));