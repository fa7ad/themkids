"use strict";
appMakeBeCool.gateway.addClass('Masonry', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _masonry = this,
        _defaults = {
            // elements
            masonry: '.masonry-container, .gallery-masonry',
            masonryItem: '.masonry-container .item, .gallery-masonry .img-item'

            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            masonry: null,
            masonryitem: null,
            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_masonry, [_properties]);
            if (!_globals.preloaded) {
                return _masonry.init();
            }
            _masonry.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _masonry.create();
        },

        _config = function () {
            _globals.masonry = $(_properties.masonry);
        },

        _setup = function () {
            _globals.masonry.masonry({
                columnWidth: _properties.masonryItem,
                itemSelector: _properties.masonryItem,
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
            _masonry.globals.customResurrect = function () {}
            _masonry.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _masonry.addMethod('init', function () {
        _masonry.bind($window, _masonry.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});