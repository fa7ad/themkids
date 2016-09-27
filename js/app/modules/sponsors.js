"use strict";

appMakeBeCool.gateway.addClass('Sponsors', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _sponsors = this,
        _defaults = {
            // elements
            slider: '#slider-sp'
            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            slider: null,

            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_sponsors, [_properties]);
            if (!_globals.preloaded) {
                return _sponsors.init();
            }
            _sponsors.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _sponsors.create();
        },

        _config = function () {
            _globals.slider = $(_properties.slider);
        },

        _setup = function () {
            _sponsorsSlider();
        },

        _setBinds = function () {},

        _binds = function () {
            return {}
        },

        _triggers = function () {
            return {}
        },

        _sponsorsSlider = function () {
            // if (window.innerWidth < 768) {
            _globals.slider.slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                pauseOnHover: false,
                slidesToScroll: 1,
                prevArrow: '<button type="button" class="slick-prev"><span class="mdi-navigation-arrow-back waves-effect waves-effect waves-circle waves-classic"></span></button>',
                nextArrow: '<button type="button" class="slick-next"><span class="mdi-navigation-arrow-forward waves-effect waves-circle waves-classic"></span></button>',
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
            });
        },

        _setCustomMethods = function () {
            _sponsors.globals.customResurrect = function () {}
            _sponsors.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _sponsors.addMethod('init', function () {
        _sponsors.bind($window, _sponsors.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});