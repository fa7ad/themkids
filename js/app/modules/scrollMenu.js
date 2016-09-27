"use strict";

appMakeBeCool.gateway.addClass('ScrollMenu', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _scrollMenu = this,
        _defaults = {
            // elements
            navs: '.navbar-nav > li a',
            navsDisabled: '.navbar-nav > li.dropdown > a',
            navbar: '#navbar-collapse',
            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            navs: null,
            navsDisabled: null,
            navbar: null,
            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_scrollMenu, [_properties]);
            if (!_globals.preloaded) {
                return _scrollMenu.init();
            }
            _scrollMenu.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _scrollMenu.create();
        },

        _config = function () {
            _globals.navs = $(_properties.navs);
            _globals.navsDisabled = $(_properties.navsDisabled);
            _globals.navbar = $(_properties.navbar);
        },

        _setup = function () {
            $.scrollIt({
                activeClass: 'active',
            });

            _globals.navs.click(function (e) {
                if (!$(this).parent().hasClass('dropdown')) {
                    //e.preventDefault();
                    //if ($window.width() < 1280) {
                    //    _globals.navbar.collapse('hide');
                    //}
                } else if ($(this).parent().hasClass('dropdown') && $window.width() < 1280) {
                    e.preventDefault();
                    if ($(this).closest('ul').hasClass('dropdown-menu')) {
                        _globals.navbar.collapse('hide');
                    }
                } else if ($(this).parent().hasClass('dropdown') && $window.width() > 1280) {
                    e.preventDefault();
                    return false;
                }
            });
        },

        _setBinds = function () {

        },

        _binds = function () {
            return {

            }
        },

        _triggers = function () {
            return {

            }
        },

        _setCustomMethods = function () {
            _scrollMenu.globals.customResurrect = function () {}
            _scrollMenu.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _scrollMenu.addMethod('init', function () {
        _scrollMenu.bind($window, _scrollMenu.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});