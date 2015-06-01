'use strict';
define(['angular', 'ngResource', 'odin/consts', 'cas'], function (angular) {
    return angular.module('assetAirDeployment.services', ['ngResource', 'odin.consts', 'casAuthorization'])
            .factory('AssetAirDeploymentServices', ['$q',
                'odin.core.consts',
                '$resource',
                'CASAuthorization',
                '$filter',
                '$http',
                function ($q, odin_consts, $resource, CASAuthorization, $filter, $http) {
                    var factory = {
                        /**
                         * @ngdoc method
                         * @methodOf NameServices
                         * @name NameServices#query
                         * @description Query for results that match the specified query parameters
                         * @param {object} params The query parameters to query with
                         * @returns {object} Promise to the server response
                         */
                        query: function (params) {
                            var convertedParams;
                            function convertArrays(params) {
                                convertedParams = angular.copy(params);
                                if (undefined !== convertedParams.assetAirDeploymentId) {
                                    var assetAirDeploymentId = [];
                                    for (var i = 0; i < convertedParams.assetAirDeploymentId.length; i++) {
                                        assetAirDeploymentId[i] = convertedParams.assetAirDeploymentId[i].lookupId;
                                    }
                                    convertedParams.assetAirDeploymentId = assetAirDeploymentId;
                                }
                                if (undefined !== convertedParams.assetAirId) {
                                    var assetAirId = [];
                                    for (var i = 0; i < convertedParams.assetAirId.length; i++) {
                                        assetAirId[i] = convertedParams.assetAirId[i].lookupId;
                                    }
                                    convertedParams.assetAirId = assetAirId;
                                }
                                if (undefined !== convertedParams.opBaseId) {
                                    var opBaseId = [];
                                    for (var i = 0; i < convertedParams.opBaseId.length; i++) {
                                        opBaseId[i] = convertedParams.opBaseId[i].lookupId;
                                    }
                                    convertedParams.opBaseId = opBaseId;
                                }

                            }

                            convertArrays(params);
                            convertedParams.action = "search";
                            convertedParams.ticket = function () {
                                return CASAuthorization.getCASTicket();
                            };

                            var deferred = $q.defer();
                            var target = $resource(odin_consts.AIR_DEPLOYMENT_URL, convertedParams);

                            target.query(function (data) {
                                deferred.resolve(data);
                            }, function (error) {
                                deferred.resolve({ error: true });
                            });
                            return deferred.promise;
                        },
                        /**
                         * @ngdoc method
                         * @methodOf NameServices
                         * @name NameServices#retrieve
                         * @description Retrieve the 'name' specified by the params
                         * @param {object} params The retrieve params (id)
                         * @returns {object} Promise to the server response
                         */
                        get: function (params) {
                            params.ticket = function () {
                                return CASAuthorization.getCASTicket();
                            };

                            var deferred = $q.defer();
                            params.target = "AssetAirDeployment";
                            var target = $resource(odin_consts.AIR_DEPLOYMENT_URL, params);
                            target.get(function (data) {
                                deferred.resolve(data);
                            }, function (error) {
                                deferred.resolve({ error: true });
                            });
                            return deferred.promise;
                        },
                        /**
                         * @ngdoc method
                         * @methodOf NameServices
                         * @name NameServices#createNew
                         * @description Create a new 'object' in the database
                         * @param {object} obj The object (or in the example of assetAirDeployment the object is a new assetAirDeployment)
                         * @returns {object} Promise to the server response
                         */
                        post: function (assetAirDeployment) {
                            var deferred = $q.defer();
                            $http.post(odin_consts.AIR_DEPLOYMENT_URL.replace(':id', '').replace(':action', 'create') + "?ticket=" + CASAuthorization.getCASTicket(), assetAirDeployment).
                            success(function (data, status, headers, config) {
                                data.success = true;
                                deferred.resolve(data);
                            }).
                            error(function (data, status, headers, config) {
                                data.success = false;
                                deferred.resolve({ error: true });
                            });
                            /*
                            var params = {};
                            var content = $filter('json')(assetAirDeployment);
                            params.ticket = function () {
                                return CASAuthorization.getCASTicket();
                            };
                            //params.action = "create"
                            var deferred = $q.defer();
                            var target = $resource(odin_consts.AIR_DEPLOYMENT_URL, assetAirDeployment, params);
                            target.save(function (result) {
                                result.success = true;
                                deferred.resolve(result);
                            },
                                    function (error) {
                                        error.success = false;
                                        deferred.resolve({error: true});
                                    });*/
                            return deferred.promise;
                        },
                        /**
                         * @ngdoc method
                         * @methodOf NameServices
                         * @name NameServices#updateName
                         * @description Update an existing 'object' like a case
                         * @param {object} obj The object to update
                         * @returns {object} Promise to the server response
                         */
                        put: function (assetAirDeployment) {

                            var deferred = $q.defer();
                            $http.put(odin_consts.AIR_DEPLOYMENT_URL.replace(':id', "").replace(':action', 'update') + "?ticket=" + CASAuthorization.getCASTicket(), assetAirDeployment).
                            success(function (data, status, headers, config) {
                                data.success = true;
                                deferred.resolve(data);
                            }).
                            error(function (data, status, headers, config) {
                                //data.success = false;
                                deferred.resolve({ error: true });
                            });
                            /*params.ticket = function () {
                                return CASAuthorization.getCASTicket();
                            };
                            params.target = "AssetAirDeployment"
                            params.action = "create"
                            var deferred = $q.defer();
                            var target = $resource(odin_consts.SURFACE_ASSET_DEPLOYMENT_URL, params, params.object);
                            target.put(function (result) {
                                result.success = true;
                                deferred.resolve(result);
                            },
                                    function (error) {
                                        error.success = false;
                                        deferred.resolve({error: true});
                                    });*/
                            return deferred.promise;
                        },
                        /**
                         * @ngdoc method
                         * @methodOf NameServices
                         * @name NameServices#deleteName
                         * @description Delete an existing 'object' like a 'case'
                         * @param {integer} id The 'object' id to be deleted
                         * @returns {object} Promise to the server response
                         */
                        delete: function (params) {
                            params.ticket = function () {
                                return CASAuthorization.getCASTicket();
                            };
                            params.target = "AssetAirDeployment";
                            var deferred = $q.defer();
                            var target = $resource(odin_consts.AIR_DEPLOYMENT_URL, params);
                            target.delete(function (result) {
                                deferred.resolve(result);
                            },
                                    function (error) {
                                        deferred.resolve({ error: true });
                                    });
                            return deferred.promise;
                        },
                    };
                    return factory;
                }]);
});
