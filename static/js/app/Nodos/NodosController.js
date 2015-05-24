EventosModule.config(function ($routeProvider) {
    $routeProvider.when('/VEventos', {
                controller: 'VEventosController',
                templateUrl: 'app/Nodos/VEventos.html'
            }).when('/VActEvento/:id', {
                controller: 'VActEventoController',
                templateUrl: 'app/Nodos/VActEvento.html'
            }).when('/VCrearEvento', {
                controller: 'VCrearEventoController',
                templateUrl: 'app/Nodos/VCrearEvento.html'
            }).when('/VParticipante/:id', {
                controller: 'VParticipanteController',
                templateUrl: 'app/Nodos/VParticipante.html'
            }).when('/VParticipantes', {
                controller: 'VParticipantesController',
                templateUrl: 'app/Nodos/VParticipantes.html'
            }).when('/VActUsuario/:id', {
                controller: 'VActUsuarioController',
                templateUrl: 'app/Nodos/VActUsuario.html'
            }).when('/VRegistroUsuario', {
                controller: 'VRegistroUsuarioController',
                templateUrl: 'app/Nodos/VRegistroUsuario.html'
            }).when('/VInicioSesion', {
                controller: 'VInicioSesionController',
                templateUrl: 'app/Nodos/VInicioSesion.html'
            }).when('/VEvento/:id', {
                controller: 'VEventoController',
                templateUrl: 'app/Nodos/VEvento.html'
            }).when('/VCertificado', {
                controller: 'VCertificadoController',
                templateUrl: 'app/Nodos/VCertificado.html'
            }).when('/VCredenciales', {
                controller: 'VCredencialesController',
                templateUrl: 'app/Nodos/VCredenciales.html'
            });
});

EventosModule.controller('VEventosController', 
   ['$scope', '$location', '$route', 'flash', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, ngDialog, NodosService) {
      $scope.msg = '';
      NodosService.VEventos().then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VEvento0 = function(id) {
        $location.path('/VEvento/'+id);
      };
      $scope.VCrearEvento1 = function() {
        $location.path('/VCrearEvento');
      };
      $scope.ACerrarSesion2 = function() {
          
        NodosService.ACerrarSesion().then(function (object) {
          var msg = object.data["msg"];
          if (msg) flash(msg);
          var label = object.data["label"];
          $location.path(label);
          $route.reload();
        });};

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VEventos.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VActEventoController', 
   ['$scope', '$location', '$route', 'flash', '$routeParams', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, $routeParams, ngDialog, NodosService) {
      $scope.msg = '';
      $scope.fEvento = {};

      NodosService.VActEvento({"id":$routeParams.id}).then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VEvento1 = function(id) {
        $location.path('/VEvento/'+id);
      };

      $scope.fEventoSubmitted = false;
      $scope.ACrearEvento0 = function(isValid) {
        $scope.fEventoSubmitted = true;
        if (isValid) {
          
          NodosService.ACrearEvento($scope.fEvento).then(function (object) {
              var msg = object.data["msg"];
              if (msg) flash(msg);
              var label = object.data["label"];
              $location.path(label);
              $route.reload();
          });
        }
      };

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VActEvento.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VCrearEventoController', 
   ['$scope', '$location', '$route', 'flash', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, ngDialog, NodosService) {
      $scope.msg = '';
      $scope.fEvento = {};

      NodosService.VCrearEvento().then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VEventos1 = function() {
        $location.path('/VEventos');
      };

      $scope.fEventoSubmitted = false;
      $scope.ACrearEvento0 = function(isValid) {
        $scope.fEventoSubmitted = true;
        if (isValid) {
          
          NodosService.ACrearEvento($scope.fEvento).then(function (object) {
              var msg = object.data["msg"];
              if (msg) flash(msg);
              var label = object.data["label"];
              $location.path(label);
              $route.reload();
          });
        }
      };

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VCrearEvento.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VParticipanteController', 
   ['$scope', '$location', '$route', 'flash', '$routeParams', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, $routeParams, ngDialog, NodosService) {
      $scope.msg = '';
      NodosService.VParticipante({"id":$routeParams.id}).then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VActUsuario0 = function(id) {
        $location.path('/VActUsuario/'+id);
      };
      $scope.ACerrarSesion1 = function() {
          
        NodosService.ACerrarSesion().then(function (object) {
          var msg = object.data["msg"];
          if (msg) flash(msg);
          var label = object.data["label"];
          $location.path(label);
          $route.reload();
        });};

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VParticipante.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VParticipantesController', 
   ['$scope', '$location', '$route', 'flash', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, ngDialog, NodosService) {
      $scope.msg = '';
      NodosService.VParticipantes().then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VParticipante0 = function(id) {
        $location.path('/VParticipante/'+id);
      };
      $scope.ACerrarSesion1 = function() {
          
        NodosService.ACerrarSesion().then(function (object) {
          var msg = object.data["msg"];
          if (msg) flash(msg);
          var label = object.data["label"];
          $location.path(label);
          $route.reload();
        });};
      $scope.AVerificarAsistencia2 = function() {
          
        NodosService.AVerificarAsistencia().then(function (object) {
          var msg = object.data["msg"];
          if (msg) flash(msg);
          var label = object.data["label"];
          $location.path(label);
          $route.reload();
        });};

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VParticipantes.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VActUsuarioController', 
   ['$scope', '$location', '$route', 'flash', '$routeParams', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, $routeParams, ngDialog, NodosService) {
      $scope.msg = '';
      $scope.fUsuario = {};

      NodosService.VActUsuario({"id":$routeParams.id}).then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VParticipante1 = function(id) {
        $location.path('/VParticipante/'+id);
      };

      $scope.fUsuarioSubmitted = false;
      $scope.ARegistrarUsuario0 = function(isValid) {
        $scope.fUsuarioSubmitted = true;
        if (isValid) {
          
          NodosService.ARegistrarUsuario($scope.fUsuario).then(function (object) {
              var msg = object.data["msg"];
              if (msg) flash(msg);
              var label = object.data["label"];
              $location.path(label);
              $route.reload();
          });
        }
      };

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VActUsuario.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VRegistroUsuarioController', 
   ['$scope', '$location', '$route', 'flash', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, ngDialog, NodosService) {
      $scope.msg = '';
      $scope.fUsuario = {};

      NodosService.VRegistroUsuario().then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VInicioSesion1 = function() {
        $location.path('/VInicioSesion');
      };

      $scope.fUsuarioSubmitted = false;
      $scope.ARegistrarUsuario0 = function(isValid) {
        $scope.fUsuarioSubmitted = true;
        if (isValid) {
          
          NodosService.ARegistrarUsuario($scope.fUsuario).then(function (object) {
              var msg = object.data["msg"];
              if (msg) flash(msg);
              var label = object.data["label"];
              $location.path(label);
              $route.reload();
          });
        }
      };

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VRegistroUsuario.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VInicioSesionController', 
   ['$scope', '$location', '$route', 'flash', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, ngDialog, NodosService) {
      $scope.msg = '';
      $scope.fLogin = {};

      NodosService.VInicioSesion().then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VRegistroUsuario1 = function() {
        $location.path('/VRegistroUsuario');
      };

      $scope.fLoginSubmitted = false;
      $scope.AIniciarSesion0 = function(isValid) {
        $scope.fLoginSubmitted = true;
        if (isValid) {
          
          NodosService.AIniciarSesion($scope.fLogin).then(function (object) {
              var msg = object.data["msg"];
              if (msg) flash(msg);
              var label = object.data["label"];
              $location.path(label);
              $route.reload();
          });
        }
      };

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VInicioSesion.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VEventoController', 
   ['$scope', '$location', '$route', 'flash', '$routeParams', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, $routeParams, ngDialog, NodosService) {
      $scope.msg = '';
      NodosService.VEvento({"id":$routeParams.id}).then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VActEvento0 = function(id) {
        $location.path('/VActEvento/'+id);
      };
      $scope.ABorrarEvento1 = function() {
          
        NodosService.ABorrarEvento().then(function (object) {
          var msg = object.data["msg"];
          if (msg) flash(msg);
          var label = object.data["label"];
          $location.path(label);
          $route.reload();
        });};
      $scope.VParticipantes2 = function() {
        $location.path('/VParticipantes');
      };
      $scope.AReservarEvento3 = function() {
          
        NodosService.AReservarEvento().then(function (object) {
          var msg = object.data["msg"];
          if (msg) flash(msg);
          var label = object.data["label"];
          $location.path(label);
          $route.reload();
        });};
      $scope.ACancelarReserva4 = function() {
          
        NodosService.ACancelarReserva().then(function (object) {
          var msg = object.data["msg"];
          if (msg) flash(msg);
          var label = object.data["label"];
          $location.path(label);
          $route.reload();
        });};
      $scope.AGenerarCertificado5 = function() {
          
        NodosService.AGenerarCertificado().then(function (object) {
          var msg = object.data["msg"];
          if (msg) flash(msg);
          var label = object.data["label"];
          $location.path(label);
          $route.reload();
        });};
      $scope.AGenerarCredenciales6 = function() {
          
        NodosService.AGenerarCredenciales().then(function (object) {
          var msg = object.data["msg"];
          if (msg) flash(msg);
          var label = object.data["label"];
          $location.path(label);
          $route.reload();
        });};

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VEvento.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VCertificadoController', 
   ['$scope', '$location', '$route', 'flash', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, ngDialog, NodosService) {
      $scope.msg = '';
      NodosService.VCertificado().then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VEvento0 = function(id) {
        $location.path('/VEvento/'+id);
      };

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VCertificado.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);
EventosModule.controller('VCredencialesController', 
   ['$scope', '$location', '$route', 'flash', 'ngDialog', 'NodosService',
    function ($scope, $location, $route, flash, ngDialog, NodosService) {
      $scope.msg = '';
      NodosService.VCredenciales().then(function (object) {
        $scope.res = object.data;
        for (var key in object.data) {
            $scope[key] = object.data[key];
        }
        if ($scope.logout) {
            $location.path('/');
        }
      });
      $scope.VEvento0 = function(id) {
        $location.path('/VEvento/'+id);
      };

$scope.__ayuda = function() {
ngDialog.open({ template: 'ayuda_VCredenciales.html',
        showClose: true, closeByDocument: true, closeByEscape: true});
}    }]);

// NodosService.directive('fileModel', ['$parse', function ($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var model = $parse(attrs.fileModel);
//             var modelSetter = model.assign;
            
//             element.bind('change', function(){
//                 scope.$apply(function(){
//                     modelSetter(scope, element[0].files[0]);
//                 });
//             });
//         }
//     };
// }]);

// NodosService.service('fileUpload', ['$http', function ($http) {
//     this.uploadFileToUrl = function(file, uploadUrl){
//         var fd = new FormData();
//         fd.append('file', file);
//         $http.post(uploadUrl, fd, {
//             transformRequest: angular.identity,
//             headers: {'Content-Type': undefined}
//         })
//         .success(function(){
//         })
//         .error(function(){
//         });
//     }
// }]);