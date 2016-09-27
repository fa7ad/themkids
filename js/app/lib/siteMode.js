"use strict";

appMakeBeCool.gateway.addClass('SiteMode', function(properties, $window, $document) {
    //PRIVATE VARIABLES
    var _siteMode = this,
        _defaults = {},
        _properties = $.extend(_defaults, properties),
        _globals = {},

    //PRIVATE METHODS
        _init = function() {
            appMakeBeCool.gateway.base.Class.apply(_siteMode, [_properties]);
            _siteMode.globals.customCreate = function() {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods()
            }
            _siteMode.create();
        },
        _config = function() {},
        _setup = function() {},
        _setBinds = function() {},
        _setCustomMethods = function() {
            _siteMode.globals.customResurrect = function() {}
            _siteMode.globals.customDestroy = function() {}
        }
	
    //PUBLIC METHODS
    _siteMode.addMethod('init', function() {
        //Demo Public Fn
    });
    _siteMode.addMethod('getSiteGlobals', function() {
        return appMakeBeCool.gateway.getGlobals();
    });
    _siteMode.addMethod('getSiteObj', function() {
        return appMakeBeCool.gateway;
    });

    //GO!
    _init();
});