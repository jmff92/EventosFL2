EventosModule.service('NodosService', ['$q', '$http', function($q, $http) {

    this.ABorrarEvento = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/ABorrarEvento',
          method: 'GET',
          params: args
        });
    //    var labels = ["/VEventos", "/VEvento", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };
    this.VEventos = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VEventos',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.ACrearEvento = function(fEvento) {
        return  $http({
          url: "Nodos/ACrearEvento",
          data: fEvento,
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });

                var headers = headersGetter();
                delete headers['Content-Type'];

                return formData;
          }    });
    //    var labels = ["/VEventos", "/VCrearEvento", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.VActEvento = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VActEvento',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.ARegistrarUsuario = function(fUsuario) {
        return  $http({
          url: "Nodos/ARegistrarUsuario",
          data: fUsuario,
          method: 'POST',
        });
    //    var labels = ["/VInicioSesion", "/VRegistroUsuario", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.VCrearEvento = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VCrearEvento',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.AIniciarSesion = function(fLogin) {
        return  $http({
          url: "Nodos/AIniciarSesion",
          data: fLogin,
          method: 'POST',
        });
    //    var labels = ["/VEventos", "/VInicioSesion", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.VParticipante = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VParticipante',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.AReservarEvento = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/AReservarEvento',
          method: 'GET',
          params: args
        });
    //    var labels = ["/VEvento", "/VEvento", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };
    this.VParticipantes = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VParticipantes',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.ACerrarSesion = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/ACerrarSesion',
          method: 'GET',
          params: args
        });
    //    var labels = ["/VInicioSesion", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };
    this.VActUsuario = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VActUsuario',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.ACancelarReserva = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/ACancelarReserva',
          method: 'GET',
          params: args
        });
    //    var labels = ["/VEvento", "/VEvento", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };
    this.VRegistroUsuario = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VRegistroUsuario',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.AVerificarAsistencia = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/AVerificarAsistencia',
          method: 'GET',
          params: args
        });
    //    var labels = ["/VParticipantes", "/VParticipantes", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };
    this.VInicioSesion = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VInicioSesion',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.AGenerarCertificado = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/AGenerarCertificado',
          method: 'GET',
          params: args
        });
    //    var labels = ["/VCertificado", "/VEvento", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };
    this.VEvento = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VEvento',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.AGenerarCredenciales = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/AGenerarCredenciales',
          method: 'GET',
          params: args
        });
    //    var labels = ["/VCredenciales", "/VEvento", ];
    //    var res = labels[0];
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };
    this.VCertificado = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VCertificado',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

    this.VCredenciales = function(args) {
        if(typeof args == 'undefined') args={};
        return $http({
          url: 'Nodos/VCredenciales',
          method: 'GET',
          params: args
        });
    //    var res = {};
    //    var deferred = $q.defer();
    //    deferred.resolve(res);
    //    return deferred.promise;
    };

}]);