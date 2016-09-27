"use strict";
appMakeBeCool.gateway.addClass('Popover', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _popover = this,
        _defaults = {
            // elements
            popover: '.create-tooltip',
            ableclose: '.ableclose'

            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            popover: null,
            ableclose: null,
            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_popover, [_properties]);
            if (!_globals.preloaded) {
                return _popover.init();
            }
            _popover.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _popover.create();
        },

        _config = function () {
            _globals.popover = $(_properties.popover);
            _globals.ableclose = $(_properties.ableclose);
        },

        _setup = function () {
            _globals.popover.webuiPopover({
                trigger: 'hover',
                width: '28%',
                arrow: false,
                closeable: false,
                style:'inverse',
                placement: 'top'
            });
            _globals.ableclose.webuiPopover({
                trigger: 'hover',
                width: '30%',
                arrow: false,
                placement: 'top',
                style:'inverse',
                trigger:'click',
                closeable: true
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
            _popover.globals.customResurrect = function () {}
            _popover.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _popover.addMethod('init', function () {
        _popover.bind($window, _popover.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});