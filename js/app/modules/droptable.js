"use strict";
appMakeBeCool.gateway.addClass('Droptable', function (properties, $, $window, $document) {
  //PRIVATE VARIABLES
  var _droptable = this,
    _defaults = {
      // elements
      drop: '.dropdown-wrap',
      button: '.table-drop',
      common: '.dropdown-wrap, .table-drop'

      // prop
      // data
      // classes ans styles
    },
    _properties = $.extend(_defaults, properties),
    _globals = {
      // elements
      drop: null,
      button: null,
      common: null,
      // prop
      preloaded: false
    },

  //PRIVATE METHODS
    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_droptable, [_properties]);
      if (!_globals.preloaded) {
        return _droptable.init();
      }
      _droptable.globals.customCreate = function () {
        _config();
        _setup();
        _setBinds();
        _setCustomMethods();
      }
      _droptable.create();
    },

    _config = function () {
      _globals.drop = $(_properties.drop);
      _globals.button = $(_properties.button);
      _globals.common = $(_properties.common);
    },

    _setup = function () {
      //_globals.common.hover(
      //  function () {
      //    _globals.drop.css('display', 'block');
      //    _globals.button.addClass('active', 500);
      //  },
      //
      //  function () {
      //    _globals.drop.css('display', 'none');
      //    _globals.button.removeClass('active', 500);
      //  }
      //);
    },

    _setBinds = function () {
      _binds().setDropBindMouseOver();
      _binds().setDropBindMouseOut();
    },

    _binds = function () {
      return {
        setDropBindMouseOver: function () {
          _droptable.bind(_globals.common, 'mouseover', function (e, data, el) {
            _globals.drop.css('display', 'block');
            _globals.button.addClass('active', 500);
          });
        },
        setDropBindMouseOut: function () {
          _droptable.bind(_globals.common, 'mouseout', function (e, data, el) {
            _globals.drop.css('display', 'none');
            _globals.button.removeClass('active', 500);
          });
        }
      }
    },


    _triggers = function () {
      return {}
    },

    _setCustomMethods = function () {
      _droptable.globals.customResurrect = function () {
      }
      _droptable.globals.customDestroy = function () {
      }
    }

  //PUBLIC METHODS
  _droptable.addMethod('init', function () {
    _droptable.bind($window, _droptable.globals.classType + '_Init', function (e, data, el) {
      _globals.preloaded = true;
      _init();
    });
  });

  //GO!
  _init();
});