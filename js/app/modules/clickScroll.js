"use strict";
appMakeBeCool.gateway.addClass('ClickScroll', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _clickScroll = this,
        _defaults = {
            // elements
            sourceClick: '.source-click'
            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            sourceClick: null,
            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_clickScroll, [_properties]);
            if (!_globals.preloaded) {
                return _clickScroll.init();
            }
            _clickScroll.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _clickScroll.create();
        },

        _config = function () {
            _globals.sourceClick = $(_properties.sourceClick);
        },

        _setup = function () {
            _globals.sourceClick.click(function (e) {
                e.preventDefault();
                var sourceId = $(this).attr('href');
                var $nodeToScroll = $(sourceId);
                $('html, body').animate({
                    scrollTop: $nodeToScroll.offset().top
                }, 600);
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
            _clickScroll.globals.customResurrect = function () {}
            _clickScroll.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _clickScroll.addMethod('init', function () {
        _clickScroll.bind($window, _clickScroll.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});