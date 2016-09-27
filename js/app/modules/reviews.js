"use strict";
appMakeBeCool.gateway.addClass('Reviews', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _reviews = this,
        _defaults = {
            // elements
            slider: '#sn-slider'
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
            appMakeBeCool.gateway.base.Class.apply(_reviews, [_properties]);
            if (!_globals.preloaded) {
                return _reviews.init();
            }
            _reviews.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _reviews.create();
        },

        _config = function () {
            _globals.slider = $(_properties.slider);
        },

        _setup = function () {
            _reviewsSlider();
        },

        _setBinds = function () {},

        _binds = function () {
            return {}
        },

        _triggers = function () {
            return {}
        },

        _reviewsSlider = function () {
            // if (window.innerWidth < 768) {
            _globals.slider.slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                pauseOnHover: false,
                slidesToScroll: 1,
                prevArrow: '<button type="button" class="slick-prev"><span class="mdi-navigation-arrow-back waves-effect waves-effect waves-circle waves-classic"></span></button>',
                nextArrow: '<button type="button" class="slick-next"><span class="mdi-navigation-arrow-forward waves-effect waves-circle waves-classic"></span></button>',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
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
            _reviews.globals.customResurrect = function () {}
            _reviews.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _reviews.addMethod('init', function () {
        _reviews.bind($window, _reviews.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});