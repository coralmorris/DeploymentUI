'use strict';

var controller = '';

switch (document.body.attributes["data-ng-controller"].value) {
    case "DetailsController":
        controller = 'assetAirDeployment/controllers/details';
        break;
    case "SearchController":
        controller = 'assetAirDeployment/controllers/search';
        break;
    case "StatusHistoryController":
        controller = 'assetAirDeployment/controllers/status-history';
        break;
    case "ManagementController":
        controller = 'assetAirDeployment/controllers/management';
        break;
}

define(['angular', 'odin', controller],
        function (angular) {
            return angular.module('assetAirDeployment', ['assetAirDeployment.controllers', 'odin']);
        }
);