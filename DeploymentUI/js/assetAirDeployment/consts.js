'use strict';
define(['angular'], function (angular) {
    return angular.module('assetAirDeployment.consts', [])
            // these should use the same constants as other widgets of this type, but these are merely meant to be examples, may need to change to actual constants for specific widgets

            .constant('assetAirDeployment.widget.consts', {
                DET_CHNL: 'ASSET_AIR_DEPLOYMENT_DETAILS_CHNL',
                MGMT_CHNL: 'ASSET_AIR_DEPLOYMENT_MGMT_CHNL',
                DETAILS_WIDGET_NAME: 'ASSET_AIR_DEPLOYMENT Details',
                MGMT_WIDGET_NAME: 'ASSET_AIR_DEPLOYMENT Management',
                SEARCH_WIDGET_NAME: 'ASSET_AIR_DEPLOYMENT Search',
                STATUS_WIDGET_NAME: 'ASSET_AIR_DEPLOYMENT Status',
                ASSET_AIR_DEPLOYMENT_STATUS_CHNL: 'ASSET_AIR_DEPLOYMENT_STATUS_HISTORY_CHNL',
                ASSET_AIR_DEPLOYMENT_HISTORY_WIDGET_NAME: 'ASSET_AIR_DEPLOYMENT Status History',
                CLOSE_ASSET_AIR_DEPLOYMENT_WIDGET_NAME: 'Close ASSET_AIR_DEPLOYMENT',
                CLOSE_ASSET_AIR_DEPLOYMENT: 2575
            })
            .constant('assetAirDeployment.detail.consts', {
                BASE_TYPE: { name: 'BASE_TYPE', target: 'baseTypes', type: 1 },
                ICAO_CODE: { name: 'ICAO_CODE', target: 'icaoCodes', type: 1 },
                TACON: { name: 'TACON', target: 'tacons', type: 1 },
                COUNTRY: { name: 'countries', target: 'countries', type: 1 },
                TEMPORAL_PRECISION: { name: 'TEMPORAL_PRECISION', target: 'temporalPrecision', type: 1 }
            })
            .constant('assetAirDeployment.search.consts', {
                MFG: { name: 'AIRCRAFT_MANUFACTURER', target: 'aircraftManufacturers', type: 1 },
                TYPE: { name: 'AIRCRAFT_TYPE', target: 'aircraftTypes', type: 1 },
                MODEL: { name: 'AIRCRAFT_MODEL', target: 'aircraftModels', type: 1 },
                WING_TYPE: { name: 'WING_TYPE', target: 'wingTypes', type: 1 },
                COLOR: { name: 'COLOR', target: 'colors', type: 1 },
                AGENCY: { name: 'TAT_OFFICE' },
                EVENT_TYPE: { name: 'CMA_EVENT_TYPE' },
                STATUS: { name: 'SURFACE_ASSET_STATUS' },
                ROUTES: { name: 'AREA' },
                COUNTRIES: { name: 'COUNTRY', target: 'countries' }
            })
            .constant('assetAirDeployment.status.consts', {
                STATUS_REASON: { name: 'SURFACE_ASSET_STATUS_REASON', target: 'reasons' }
            });

});
