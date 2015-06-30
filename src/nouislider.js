'use strict';
angular.module('nouislider', []).directive('slider', function () {
    return {
        restrict: 'A',
        scope: {
            start: '=',
            step: '=',
            end: '=',
            margin: '@',
            ngModel: '=',
            ngFrom: '=',
            ngTo: '='
        },
        link: function (scope, element, attrs, ctrl) {
            var slider = $(element)[0];
            ctrl.rebuildSlider(slider, false);
            scope.$watch('ngFrom', function (newVal, oldVal) {
                if (newVal !== ctrl.fromParsed) {
                    ctrl.fromParsed = newVal;
                    return slider.noUiSlider.set([
                        newVal,
                        null
                    ]);
                }
            });
            scope.$watch('ngTo', function (newVal, oldVal) {
                if (newVal !== ctrl.toParsed) {
                    ctrl.toParsed = newVal;
                    return slider.noUiSlider.set([
                        null,
                        newVal
                    ]);
                }
            });
            scope.$watch('start', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    ctrl.rebuildSlider(slider, true);
                }
            });
            scope.$watch('end', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    ctrl.rebuildSlider(slider, true);
                }
            });
            scope.$watch('step', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    ctrl.rebuildSlider(slider, true);
                }
            });
        },
        controller: function($scope) {
            var controller = this;
            this.fromParsed = null;
            this.toParsed = null;
            this.rebuildSlider = function (slider, destroyBefore) {
                if(destroyBefore) {
                    slider.noUiSlider.destroy();
                }
                noUiSlider.create(slider, {
                    start: [
                        $scope.ngFrom || $scope.start,
                        $scope.ngTo || $scope.end
                    ],
                    step: parseFloat($scope.step || 1),
                    connect: true,
                    margin: $scope.margin ? parseFloat($scope.margin) : undefined,
                    range: {
                        min: [parseFloat($scope.start)],
                        max: [parseFloat($scope.end)]
                    }
                });
                slider.noUiSlider.on('change', this.changeHandler);
                slider.noUiSlider.on('slide', this.changeHandler);
            };
            this.changeHandler = function( values, handle ) {
                var from, to;
                from = values[0];
                to = values[1];
                controller.fromParsed = parseFloat(from);
                controller.toParsed = parseFloat(to);
                if($scope.ngFrom != controller.fromParsed) {
                    $scope.$apply(function () {
                        $scope.ngFrom = controller.fromParsed;
                    });
                }
                if($scope.ngTo != controller.toParsed) {
                    $scope.$apply(function () {
                        $scope.ngTo = controller.toParsed;
                    });
                }
            }
        }
    };
});
