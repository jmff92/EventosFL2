// Creación del módulo de la aplicación
var EventosModule = angular.module('Eventos', ['ngRoute', 'ngAnimate', 'ngDialog', 'flash']);
EventosModule.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
                controller: 'VInicioSesionController',
                templateUrl: 'app/Nodos/VInicioSesion.html'
            });
});
EventosModule.controller('EventosController_',  ['$scope', '$http', '$location',
function($scope) {
    $scope.title = "Aplicacion";
}]);
EventosModule.directive('file', function () {
    return {
        restrict: 'A',
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
});
