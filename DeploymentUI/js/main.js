'use strict';

requirejs.config({
    paths: {
        jquery: '../../../CoreUI/vendor/jquery-2.1.3/jquery-2.1.3.min',
        bootstrap: '../../../CoreUI/vendor/bootstrap-3.3.1/js/bootstrap.min',
        angular: '../../../CoreUI/vendor/angular-1.3.8/angular.min',
        ngRoute: '../../../CoreUI/vendor/angular-1.3.8/angular-route.min',
        ngResource: '../../../CoreUI/vendor/angular-1.3.8/angular-resource.min',
        domReady: '../../../CoreUI/vendor/domReady-2.0.1/domReady',
        datetimePicker: '../../../CoreUI/vendor/angular-bootstrap-datetimepicker-0.3.8/js/datetimepicker',
        moment: '../../../CoreUI/vendor/moment-2.9.0/moment.min',
        moveable: '../../../CoreUI/vendor/moveable/moveable',
        trNgGrid: '../../../CoreUI/vendor/trNgGrid/trNgGrid.min',
        owfWidget: '../../../CoreUI/js/owf/5/owf-widget-min',
        widgetParentChild: '../../../CoreUI/js/owf/widget-parent-child',
        odin: '../../../CoreUI/js/odin',
        cas: '../../../CoreUI/js/CASAuthorization',
        uiSelect: '../../../CoreUI/vendor/ui-select-0.11.2/dist/select',
        jqueryMask: '../../../CoreUI/vendor/jquery-loadmask-0.4/jquery.loadmask.min'
    },
    shim: {
        'jquery': { exports: '$' },
        'bootstrap': {
            deps: ['jquery']
        },
        'jqueryMask': {
            deps: ['jquery']
        },
        'angular': {
            exports: 'angular'
        },
        'ngRoute': {
            deps: ['angular']
        },
        'ngResource': {
            deps: ['angular']
        },
        'owfWidget': {
            exports: 'OWF'
        },
        'moment': {
            exports: 'moment'
        },
        'datetimePicker': {
            deps: ['angular', 'moment']
        },
        'trNgGrid': {
            exports: 'TrNgGrid',
            deps: ['angular']
        },
        'moveable': {
            exports: ['LatLon', 'Dms']
        },
        'uiSelect': {
            exports: 'uiSelect',
            deps: ['angular', 'jquery']
        }
    }
});

// https://docs.angularjs.org/guide/bootstrap#!

require([
    'angular',
    'assetAirDeployment'
], function (angular) {
    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['assetAirDeployment']);
    });
});
