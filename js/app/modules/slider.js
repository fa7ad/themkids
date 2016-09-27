"use strict";
appMakeBeCool.gateway.addClass('Slider', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _slider = this,
        _defaults = {
            // elements
            toys: '#main-slider'
            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            toys: null,

            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_slider, [_properties]);
            if (!_globals.preloaded) {
                return _slider.init();
            }
            _slider.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _slider.create();
        },

        _config = function () {
            _globals.toys = $(_properties.toys);
        },

        _setup = function () {
            _sliderSlider();
        },

        _setBinds = function () {},

        _binds = function () {
            return {}
        },

        _triggers = function () {
            return {}
        },

        _sliderSlider = function () {
            // if (window.innerWidth < 768) {
            _globals.toys.slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                pauseOnHover: false,
                touchMove: false,
                slidesToScroll: 1,
                prevArrow: '<button type="button" class="slick-prev waves-effect waves-button waves-float waves-classic"><span class="mdi-navigation-arrow-back"></span></button>',
                nextArrow: '<button type="button" class="slick-next waves-effect waves-button waves-float waves-classic"><span class="mdi-av-loop"></span></button>',
            });
        },

        _setCustomMethods = function () {
            _slider.globals.customResurrect = function () {}
            _slider.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _slider.addMethod('init', function () {
        _slider.bind($window, _slider.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});