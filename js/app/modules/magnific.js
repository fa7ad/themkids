"use strict";
appMakeBeCool.gateway.addClass('Magnific', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _magnific = this,
        _defaults = {
            // elements
            magnific: '.popup-gallery'

            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            magnific: null,
            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_magnific, [_properties]);
            if (!_globals.preloaded) {
                return _magnific.init();
            }
            _magnific.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _magnific.create();
        },

        _config = function () {
            _globals.magnific = $(_properties.magnific);
        },

        _setup = function () {
            _globals.magnific.magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                    }
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
            _magnific.globals.customResurrect = function () {}
            _magnific.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _magnific.addMethod('init', function () {
        _magnific.bind($window, _magnific.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});