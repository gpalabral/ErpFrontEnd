/**
 * Created by VLADY on 17/01/2015.
 */

app.directive('updateMarginLeft', function () {
  return {
    restrict : 'A',
    scope : {
      level : '=updateMarginLeft'
    },
    link : function (scope, element){
      scope.$watch('level', function (level) {
        if(level && level > 0) {
          element.css({'margin-left': (135-((level-1)*15)) + 'px' })
        }
      });
    }
  }
});

app.directive('findClosestElement', function ($timeout,tempCache) {
  return {
    restrict : 'A',
    scope : {
      elementId    : '@',
      elementClass : '@',
      callback     : '&',
      rowModel     : '='
    },
    link : function (scope, element) {
      var prefix = scope.elementId ? '#' : (scope.elementClass ? '.' : '');
      var selector = prefix + (scope.elementId || scope.elementClass || '');
      //console.log("selector: " + selector);
      var row = element.closest(selector);
      var icon = row.find('.toggle').find('i');
      var enableWatchObject = null;

      function rgbToHex(color) {
        var bg = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
          return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return     "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
      }

      scope.tempCache = tempCache;
      $timeout( function () {
        icon.bind('click', function (event) {
          event.stopPropagation();
        });

        row.bind('click', function () {
          if ( scope.rowModel.idEntidad !== tempCache.idEntidadSeleccionada ) {
            row.css({'background-color': '#e1fe45'});
            scope.callback({item : scope.rowModel});

            enableWatchObject = scope.$watch('tempCache.idEntidadSeleccionada', function (idEntidad) {
              if( scope.rowModel.idEntidad !== idEntidad ) {
                row.css({'background-color': '#ffffff'});
                enableWatchObject();
              }
            });

          } else {
            row.css({'background-color': '#ffffff'});
            scope.callback({item : null});
            enableWatchObject();
          }
        });
      },1);
    }
  };
});
app.directive("detectarCambio",function(){
    return {
        restrict:"A",
        scope:{
          onChange:"&"
        },
        link:function($scope,element){
            element.bind("change",function(){
                console.log($("input[type='file']").val());
                $scope.onChange({nombreAdjunto:$("input[type='file']").val()})
            })
        }
    }
});

app.directive("sinRegistros", function () {
  return {
    restrict : 'E',
    replace: true,
    template: "<div class='sin-registros'><i class='fa fa-exclamation-triangle fa-1x'></i>&nbsp;No existen registros</div>"
  }
});

app.directive('angularMask', function() {
    return {
      restrict : 'A',
      link: function($scope, el, attrs) {
        var format = attrs.angularMask,
          arrFormat = format.split('|');

        if(arrFormat.length > 1){
          arrFormat.sort(function(a, b){
            return a.length - b.length;
          });
        }
        function mask(o) {
          var value = o.value.replace(/\D/g,'');
          if(arrFormat.length > 1){
            for(var a in arrFormat){
              if(value.replace(/\D/g,'').length <= arrFormat[a].replace(/\D/g,'').length){
                format = arrFormat[a];
                break;
              }
            }
          }
          var newValue = '';
          for(var nmI = 0, mI = 0; mI < format.length;){
            if(format[mI].match(/\D/)){
              newValue+=format[mI];
            }else{
              if(value[nmI] != undefined){
                newValue+=value[nmI];
                nmI++;
              }else{
                break;
              }
            }
            mI++;
          }
          o.value = newValue;
        }

        el.bind('focus', function () {
          // on focus is not applying masks.
        });

        el.bind('blur', function (e) {
          // on blur is setting the mask.
          var keyList = [8,37,39,46];
          if(keyList.indexOf(e.keyCode) == -1)mask(this);
        });
      }
    };
  });

app.directive('autoHeight', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      var watcher,
        parentContainer;

      function init () {
        parentContainer = $(element).closest('.panel-body');

        if( parentContainer ) {
          updateHeight( parentContainer.height() );
        }

        watcher = scope.$watchCollection(function () {
          return [parentContainer.height(),$(document).width(),$(document).height()];
        }, function (sizes) {
          updateHeight(sizes[0]);
        });
      }

      function updateHeight (height) {
        var grid = element.find('[ng-grid]');
        if( grid ) {
          grid.css({
            height: height+'px'
          });
        }

        if ( !scope.$$phase ) {
          scope.$apply();
        }
      }

      scope.$on('$destroy', function () {
        // destroying watcher
        watcher ? watcher() : null;
      });

      init();
    }
  };
});


app.directive('currencyInput', function($filter) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      var numberOfDecimals = parseInt(attrs.decimals) >= 0 ? parseInt(attrs.decimals) : 20;

      ctrl.$formatters.unshift(function (a) {
        return $filter('number')(ctrl.$modelValue,numberOfDecimals);
      });

      ctrl.$parsers.unshift(function(inputValue) {
        //return element.val()
        var inputVal = element.val();

        //clearing left side zeros
        while (inputVal.charAt(0) == '0') {
          inputVal = inputVal.substr(1);
        }

        inputVal = inputVal.replace(/[^\d.\',']/g, '');

        var point = inputVal.indexOf(".");
        if (point >= 0) {
          inputVal = inputVal.slice(0, point + numberOfDecimals + 1);
        }

        var decimalSplit = inputVal.split(".");
        var intPart = decimalSplit[0];
        var decPart = decimalSplit[1];

        intPart = intPart.replace(/[^\d]/g, '');

        if (intPart.length > 3) {
          var intDiv = Math.floor(intPart.length / 3);
          while (intDiv > 0) {
            var lastComma = intPart.indexOf(",");
            if (lastComma < 0) {
              lastComma = intPart.length;
            }

            if (lastComma - 3 > 0) {
              intPart = intPart.slice(0, lastComma - 3) + "," + intPart.slice(lastComma - 3);
            }
            intDiv--;
          }
        }

        if (decPart === undefined) {
          decPart = "";
        }
        else {
          decPart = "." + decPart;
        }

        var res;
        if( numberOfDecimals  === 0 ) {
          res = intPart
        } else {
          res = intPart + decPart;
        }



        if (res != inputValue) {
          ctrl.$setViewValue(res);
          ctrl.$render();
        }
        return res.replace(/,/g,"");
      });

      element.bind('focus', function () {
        var sInputVal = element.val().replace(/,/g,"") + "";
        if( sInputVal.indexOf('.00') > -1 ) {
          element.val( $filter('number')(sInputVal,0) );
        }

      });

      element.bind('blur', function (event) {
        var inputVal = element.val().replace(/,/g,"");
        if ( inputVal ) {
          element.val( $filter('number')(inputVal,numberOfDecimals) );
        }
      });

    }
  };
});
