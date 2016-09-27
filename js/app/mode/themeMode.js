"use strict";
appMakeBeCool.gateway.addClass('ThemeMode', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _themeMode = this,
        _defaults = {
            // classes ans styles
            classMode: 'theme-mode'
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            siteObj: null,
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.classes.SiteMode.apply(_themeMode, [_properties])
            if (!_globals.preloaded) {
                return _themeMode.init();
            }
            _config();
            _extendClasses();
            _instantiateClasses();
            _setup();
            _setBinds();
            _setCustomMethods();
            _themeMode.trigger(_themeMode.globals.classType + '_Complete');
        },

        _config = function () {
            _globals.siteObj = _themeMode.getSiteObj();
        },

        _extendClasses = function () {
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Slider, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Sponsors, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Reviews, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.StickyHeader, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Waves, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.ScrollMenu, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Counters, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.ClickScroll, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Masonry, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Magnific, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Fixblock, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Popover, _globals.siteObj.base.Class);
            _globals.siteObj.utils.extend(_globals.siteObj.classes.Droptable, _globals.siteObj.base.Class);
        },

        _instantiateClasses = function () {
            _globals.siteObj.createClassInstance('slider', _globals.siteObj.classes.Slider, {
                classId: 'Slider'
            });
            _globals.siteObj.createClassInstance('sponsors', _globals.siteObj.classes.Sponsors, {
                classId: 'Sponsors'
            });
            _globals.siteObj.createClassInstance('reviews', _globals.siteObj.classes.Reviews, {
                classId: 'Reviews'
            });
            _globals.siteObj.createClassInstance('stickyHeader', _globals.siteObj.classes.StickyHeader, {
                classId: 'StickyHeader'
            });
            _globals.siteObj.createClassInstance('waves', _globals.siteObj.classes.Waves, {
                classId: 'Waves'
            });
            _globals.siteObj.createClassInstance('scrollMenu', _globals.siteObj.classes.ScrollMenu, {
                classId: 'ScrollMenu'
            });
            _globals.siteObj.createClassInstance('counters', _globals.siteObj.classes.Counters, {
                classId: 'Counters'
            });
            _globals.siteObj.createClassInstance('clickScroll', _globals.siteObj.classes.ClickScroll, {
                classId: 'ClickScroll'
            });
            _globals.siteObj.createClassInstance('masonry', _globals.siteObj.classes.Masonry, {
                classId: 'Masonry'
            });
            _globals.siteObj.createClassInstance('magnific', _globals.siteObj.classes.Magnific, {
                classId: 'Magnific'
            });
            _globals.siteObj.createClassInstance('fixblock', _globals.siteObj.classes.Fixblock, {
                classId: 'Fixblock'
            });
            _globals.siteObj.createClassInstance('popover', _globals.siteObj.classes.Popover, {
                classId: 'Popover'
            });
            _globals.siteObj.createClassInstance('droptable', _globals.siteObj.classes.Droptable, {
                classId: 'Droptable'
            });

        },

        _setup = function () {
            $('body').addClass(_properties.classMode);
        },

        _setBinds = function () {
            _binds().setCompleteBind();
            _binds().setImage_CompleteBind();
        },

        _binds = function () {
            return {
                setCompleteBind: function () {
                    _themeMode.bind($window, _themeMode.globals.classType + '_Complete', function (e, data) {
                        _themeMode.trigger('Slider_Init', data);
                        _themeMode.trigger('Sponsors_Init', data);
                        _themeMode.trigger('Reviews_Init', data);
                        _themeMode.trigger('StickyHeader_Init', data);
                        _themeMode.trigger('Waves_Init', data);
                        _themeMode.trigger('ScrollMenu_Init', data);
                        _themeMode.trigger('Counters_Init', data);
                        _themeMode.trigger('ClickScroll_Init', data);
                        _themeMode.trigger('Masonry_Init', data);
                        _themeMode.trigger('Magnific_Init', data);
                        _themeMode.trigger('Fixblock_Init', data);
                        _themeMode.trigger('Popover_Init', data);
                        _themeMode.trigger('Droptable_Init', data);
                    });
                },
                setImage_CompleteBind: function () {
                    _themeMode.bind($window, 'Images_ImagesComplete', function (e, data) {

                    });
                }
            }
        },

        _setCustomMethods = function () {
            _themeMode.globals.customResurrect = function () {};
            _themeMode.globals.customDestroy = function () {};
        };

    //PUBLIC METHODS
    _themeMode.addMethod('init', function () {
        _themeMode.bind($window, 'siteConfigComplete', function () {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});