'use strict';

define(['angular', 'assetAirDeployment/services', 'assetAirDeployment/consts', 'odin/consts', 'odin/services', 'jqueryMask', 'datetimePicker', 'widgetParentChild'], function (angular) {
    return angular.module('assetAirDeployment.controllers', ['assetAirDeployment.services', 'assetAirDeployment.consts', 'odin.consts', 'picklist.services', 'widget_parent_launcher'])
            .controller('DetailsController',
                    ['$scope',
                        'AssetAirDeploymentServices',
                        'assetAirDeployment.widget.consts',
                        'assetAirDeployment.detail.consts',
                        'odin.core.consts',
                        'WidgetLauncher',
                        'LoaderFactory',
                        '$timeout',
                        'PickListService',
                        function (
                                $scope,
                                AssetAirDeploymentServices,
                                assetAirDeployment_widget_consts,
                                detail_consts,
                                odin_consts,
                                WidgetLauncher,
                                LoaderFactory,
                                $timeout,
                                PickListService) {


                            $scope.activeAssetAirDeployment = {};
                            $scope.activeAssetAirDeployment.classification = "UNCLASSIFIED";
                            $scope.baseTypes = new Object();
                            $scope.icaoCodes = new Object();
                            $scope.tacons = new Object();
                            $scope.temporalPrecision = new Object();

                            var cachedAssetAirDeploymentBeforeEdits = {};
                            jQuery("#assetAirDeploymentDetails").mask("Loading...");
                            var maskHandler = new Object();
                            maskHandler.counter = 0;
                            maskHandler.unmaskCallback = function () {
                                jQuery("#assetAirDeploymentDetails").unmask();
                            };

                            $scope.resetForm = function () {
                                $scope.activeAssetAirDeployment = angular.copy(cachedAssetAirDeploymentBeforeEdits);
                            };

                            $scope.createNew = function () {
                                $scope.activeAssetAirDeployment = {};
                            };

                            LoaderFactory.loadByNameMasker(detail_consts.BASE_TYPE.name, maskHandler, function (picklist, result) {
                                if (result === true) {
                                    $scope[detail_consts.BASE_TYPE.target] = picklist;
                                }
                                else {
                                    console.log("picklist BASE_TYPE = " + result);
                                }
                            });

                            LoaderFactory.loadByNameMasker(detail_consts.ICAO_CODE.name, maskHandler, function (picklist, result) {
                                if (result === true) {
                                    $scope[detail_consts.ICAO_CODE.target] = picklist;
                                }
                                else {
                                    console.log("picklist ICAO_CODE = " + result);
                                }
                            });

                            LoaderFactory.loadByNameMasker(detail_consts.TEMPORAL_PRECISION.name, maskHandler, function (picklist, result) {
                                if (result === true) {
                                    $scope[detail_consts.TEMPORAL_PRECISION.target] = picklist;
                                }
                                else {
                                    console.log("picklist TEMPORAL_PRECISION = " + result);
                                }
                            });

                            LoaderFactory.loadByNameMasker(detail_consts.TACON.name, maskHandler, function (picklist, result) {
                                if (result === true) {
                                    $scope[detail_consts.TACON.target] = picklist;
                                }
                                else {
                                    console.log("picklist TACON = " + result);
                                }
                            });

                            var watchAndSyncListItem = function (varToWatch, varToSync, picklistName) {
                                $scope.$watch("activeAssetAirDeployment." + varToWatch, function () {
                                    var picklist = $scope[picklistName];
                                    if ($scope.activeAssetAirDeployment[varToWatch]) {
                                        if (!picklist) {
                                            $timeout(function () {
                                                var item = picklist[$scope.activeAssetAirDeployment[varToWatch]];
                                                if (item) {
                                                    $scope.activeAssetAirDeployment[varToSync] = item.desc;
                                                }
                                            }, 1000);
                                        }
                                        else {
                                            var item = picklist[$scope.activeAssetAirDeployment[varToWatch]];
                                            if (item) {
                                                $scope.activeAssetAirDeployment[varToSync] = item.desc;
                                            }
                                        }
                                    }
                                });
                            };
                            watchAndSyncListItem("icaoCodeId", "icaoCodeShortDesc", detail_consts.ICAO_CODE.target);
                            watchAndSyncListItem("opBaseTypeId", "opBaseTypeShortDesc", detail_consts.BASE_TYPE.target);
                            watchAndSyncListItem("defaultTaconId", "defaultTaconShortDesc", detail_consts.TACON.target);

                            var zeroUndefined = function (obj) {
                                angular.forEach(obj, function (value, key) {
                                    if (value === -1 || value === " ") {
                                        obj[key] = undefined;
                                    }
                                });
                                return obj;
                            };

                            function loadSelectValues() {
                                $scope.activeAssetAirDeployment['icaoCode'] = {
                                    lookupId: $scope.activeAssetAirDeployment['icaoCodeId'],
                                    lookupShortDesc: $scope.activeAssetAirDeployment['icaoCodeShortDesc']
                                };
                                console.log("icaoCode = ");
                                console.log($scope.activeAssetAirDeployment.icaoCode);
                                $scope.activeAssetAirDeployment['opBaseType'] = {
                                    lookupId: $scope.activeAssetAirDeployment['opBaseTypeId'],
                                    lookupShortDesc: $scope.activeAssetAirDeployment['opBaseTypeShortDesc']
                                };
                                console.log("opBaseType = ");
                                console.log($scope.activeAssetAirDeployment.opBaseType);
                                $scope.activeAssetAirDeployment['defaultTacon'] = {
                                    lookupId: $scope.activeAssetAirDeployment['defaultTaconId'],
                                    lookupShortDesc: $scope.activeAssetAirDeployment['defaultTaconShortDesc']
                                };
                                console.log("defaultTacon = ");
                                console.log($scope.activeAssetAirDeployment.defaultTacon);
                            };

                            function saveSelectValues() {
                                $scope.activeAssetAirDeployment['icaoCodeId'] = $scope.activeAssetAirDeployment['icaoCode'].lookupId;
                                $scope.activeAssetAirDeployment['icaoCodeShortDesc'] = $scope.activeAssetAirDeployment['icaoCode'].lookupShortDesc;

                                $scope.activeAssetAirDeployment['opBaseTypeId'] = $scope.activeAssetAirDeployment['opBaseType'].lookupId;
                                $scope.activeAssetAirDeployment['opBaseTypeShortDesc'] = $scope.activeAssetAirDeployment['opBaseType'].lookupShortDesc;

                                $scope.activeAssetAirDeployment['defaultTaconId'] = $scope.activeAssetAirDeployment['defaultTacon'].lookupId;
                                $scope.activeAssetAirDeployment['defaultTaconShortDesc'] = $scope.activeAssetAirDeployment['defaultTacon'].lookupShortDesc;
                            };

                            var loadAssetAirDeployment = function (json) {
                                var id = JSON.parse(JSON.stringify(json)).assetAirDeploymentId;
                                AssetAirDeploymentServices.get({ id: id }).then(function (response) {
                                    if (!response.error) {
                                        $scope.activeAssetAirDeployment = response;
                                        loadSelectValues();
                                        cachedAssetAirDeploymentBeforeEdits = angular.copy($scope.activeAssetAirDeployment);
                                        $scope.activeAssetAirDeployment.classification = $scope.activeAssetAirDeployment.classification === undefined ? "UNCLASSIFIED" : $scope.activeAssetAirDeployment.classification;
                                    }
                                    else {
                                        console.log("error loading Asset Air Deployment.");
                                    }
                                });
                            };

                            var receiveMessage = function (message) {
                                console.log("Asset Air Deployment Details Message Recieved");
                                if (message.assetAirDeploymentId === undefined) {
                                    retrieveAssetAirDeployment(message.assetAirDeploymentId);
                                }
                                else {
                                    delete message["$promise"];
                                    delete message["$resolved"];
                                    loadAssetAirDeployment[message];
                                }
                            };

                            var retrieveAssetAirDeployment = function (assetAirDeploymentId) {
                                if ($scope.params) {
                                    delete $scope.params;
                                }
                                $scope.params = {};
                                $scope.params.action = assetAirDeploymentId;
                                jQuery("#assetAirDeploymentDetails").mask("Retrieving...");
                                AssetAirDeploymentServices.get($scope.params).then(function (result) {
                                    delete result["$promise"];
                                    delete result["$resolved"];
                                    if ($scope.activeAssetAirDeployment) {
                                        delete $scope.activeAssetAirDeployment;
                                    }
                                    loadAssetAirDeployment(result);
                                    jQuery("#assetAirDeploymentDetails").unmask();
                                });
                            };

                            $scope.launchRelationships = function () {
                                WidgetLauncher.lookupWidget("Relationship Overview", function (lookup) {
                                    var id = $scope.activeAssetAirDeployment.assetAirDeploymentId !== undefined ? $scope.activeAssetAirDeployment.assetAirDeploymentId : $scope.assetAirDeploymentId;
                                    WidgetLauncher.launchWidget(lookup, "RELATIONSHIP_OVERVIEW_CHNL", { 'id': id, 'type': odin_consts.TARGET_AIRCRAFT_TYPE });
                                });
                            };

                            var persistAssetAirDeployment = function () {
                                jQuery("#assetAirDeploymentDetails").mask("Updating Asset Air Deployment...");
                                var promise = AssetAirDeploymentServices.put($scope.activeAssetAirDeployment);
                                promise.then(function (resp) {
                                    jQuery("#assetAirDeploymentDetails").unmask();
                                    if (resp.success) {
                                        console.log("Saved");
                                    }
                                    else {
                                        console.log("Save failed");
                                    }
                                });
                            };

                            var saveNewAssetAirDeployment = function () {
                                jQuery("#assetAirDeploymentDetails").mask("Saving Asset Air Deployment...");
                                saveSelectValues();
                                console.log($scope.activeAssetAirDeployment);
                                delete $scope.activeAssetAirDeployment.assetAirDeploymentId;
                                var promise = AssetAirDeploymentServices.post($scope.activeAssetAirDeployment);
                                promise.then(function (response) {
                                    jQuery("#assetAirDeploymentDetails").unmask();
                                    if (response.success) {
                                        loadAssetAirDeployment(response);
                                    }
                                    else {
                                        console.log("Save Failed")
                                    }
                                });
                            };

                            var saveAssetAirDeployment = function () {
                                if ($scope.validate()) {
                                    jQuery("#assetAirDeploymentDetails").mask("Saving...");
                                    if (!$scope.activeAssetAirDeployment.assetAirDeploymentId) {
                                        saveNewAssetAirDeployment();
                                    }
                                    else {
                                        persistAssetAirDeployment();
                                    }
                                }
                                else {
                                    console.log("One or more required fields are missing.");
                                }
                            };

                            $scope.saveForm = function () {
                                saveAssetAirDeployment();
                            };

                            $scope.createNewAssetAirDeployment = function () {
                                AssetAirDeploymentServices.newForCreate().then(function (newAssetAirDeployment) {
                                    newAssetAirDeployment.classification = newAssetAirDeployment.classification === undefined ? "UNCLASSIFIED" : newAssetAirDeployment.classification;
                                    loadAssetAirDeployment(newAssetAirDeployment);
                                });
                            };

                            $scope.cloneAssetAirDeployment = function () {
                                AssetAirDeploymentServices.clone($scope.activeAssetAirDeployment).then(function (newAssetAirDeployment) {
                                    loadAssetAirDeployment(newAssetAirDeployment);
                                });
                            };

                            $scope.resetAssetAirDeployment = function () {
                                $scope.retrieveAssetAirDeployment($scope.activeAssetAirDeployment.assetAirDeploymentId);
                            };

                            $scope.launchContraband = function () {
                                WidgetLauncher.lookupWidget("Contraband Management", function (lookup) {
                                    WidgetLauncher.launchMonoChildWidget(lookup, "ASSETAIRDEPLOYMENT_CONTRABAND_CHNL", { assetAirDeploymentId: $scope.activeAssetAirDeployment.assetAirDeploymentId });
                                });
                            };

                            $scope.launchVector = function () {
                                WidgetLauncher.lookupWidget("Vector", function (lookup) {
                                    WidgetLauncher.launchMonoChildWidget(lookup, "ASSETAIRDEPLOYMENT_VECTOR_CHNL", { assetAirDeploymentId: $scope.activeAssetAirDeployment.assetAirDeploymentId });
                                });
                            }

                            $scope.validate = function () {
                                var canSave = true;
                                $scope.assetAirDeploymentValid = {};
                                if (!$scope.activeAssetAirDeployment.assetAirDeploymentId) {
                                    canSave = false;
                                }
                                return canSave;
                            };

                            $scope.$watchCollection('activeAssetAirDeployment', function (newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    $scope.validate();
                                }
                            });

                            $scope.launchStatusChange = function (channel) {
                                var message = {
                                    assetAirDeploymentId: $scope.activeAssetAirDeployment.assetAirDeploymentId
                                };
                                if ($scope.statusLookup.length === 0) {
                                    WidgetLauncher.lookupWidget(assetAirDeployment_widget_consts.STATUS_WIDGET_NAME, function (lookup) {
                                        if (lookup.length > 0) {
                                            $scope.statusLookup = lookup;
                                            $scope.statusChannel = WidgetLauncher.launchMonoChildWidget($scope.statusLookup, channel, message);
                                        }
                                    });
                                }
                                else {
                                    $scope.statusChannel = WidgetLauncher.launchMonoChildWidget($scope.statusLookup, channel, message);
                                }
                            };

                            $scope.launchAssetAirDeploymentHistory = function () {
                                var message = {
                                    targetName: $scope.activeAssetAirDeployment.targetName,
                                    targetAssetAirDeploymentId: $scope.activeAssetAirDeployment.assetAirDeploymentId,
                                    targetAssetAirDeploymentStatusId: $scope.activeAssetAirDeployment.assetAirDeploymentStatusId
                                };
                                if ($scope.historyLookup.length === 0) {
                                    WidgetLauncher.lookupWidget(assetAirDeployment_widget_consts.ASSET_AIR_DEPLOYMENT_HISTORY_WIDGET_NAME, function (lookup) {
                                        if (lookup.length > 0) {
                                            $scope.historyLookup = lookup;
                                            WidgetLauncher.launchMonoChildWidget($scope.historyLookup, assetAirDeployment_widget_consts.ASSET_AIR_DEPLOYMENT_STATUS_CHNL, message);
                                        }
                                    });
                                }
                                else {
                                    WidgetLauncher.launchMonoChildWidget($scope.historyLookup, assetAirDeployment_widget_consts.ASSET_AIR_DEPLOYMENT_STATUS_CHNL, message);
                                }
                            };

                            $scope.launchCloseAssetAirDeployment = function () {
                                var message = {
                                    targetAssetAirDeploymentId: $scope.activeAssetAirDeployment.assetAirDeploymentId,
                                    targetAssetAirDeploymentStatusId: $scope.activeAssetAirDeployment.assetAirDeploymentStatusId
                                };
                                if ($scope.closeLookup.length === 0) {
                                    WidgetLauncher.lookupWidget(assetAirDeployment_widget_consts.CLOSE_ASSET_AIR_DEPLOYMENT_WIDGET_NAME, function (lookup) {
                                        if (lookup.length > 0) {
                                            $scope.closeLookup = lookup;
                                            WidgetLauncher.launchMonoChildWidget($scope.closeLookup, assetAirDeployment_widget_consts.ASSET_AIR_DEPLOYMENT_STATUS_CHNL, message);
                                        }
                                    });
                                }
                                else {
                                    WidgetLauncher.launchMonoChildWidget($scope.closeLookup, assetAirDeployment_widget_consts.ASSET_AIR_DEPLOYMENT_STATUS_CHNL, message);
                                }
                            };

                            $scope.$watch('activeAssetAirDeployment.assetAirDeploymentStatusId', function (newValue, oldValue) {
                                if (newValue !== oldValue && $scope.activeAssetAirDeployment.assetAirDeploymentId > 0 && oldValue !== undefined) {
                                    if ($scope.activeAssetAirDeployment.assetAirDeploymentStatusId === assetAirDeployment_widget_consts.CLOSE_ASSET_AIR_DEPLOYMENT_WIDGET_NAME) {
                                        $scope.launchCloseAssetAirDeployment();
                                    }
                                    else {
                                        $scope.launchStatusChange(assetAirDeployment_widget_consts.ASSET_AIR_DEPLOYMENT_STATUS_CHNL);
                                    }
                                }
                            });

                            var receiveClassificationMessage = function (message) {
                                $scope.intel.classification = message.classificationForDisplay;
                            };

                            $scope.classify = function (entityMethod, entityId, entityType) {
                                var channelToUse = "INTEL_CLASS_CHNL";
                                var message = {
                                    entityMethod: entityMethod,
                                    entityId: entityId,
                                    entityType: entityType,
                                    returnChannel: channelToUse,
                                    desc: 'Choose Classification to Search"'
                                };
                                WidgetLauncher.addListener(channelToUse, receiveClassificationMessage);
                                WidgetLauncher.lookupWidget("Classification Picker", function (lookup) {
                                    WidgetLauncher.launchMonoChildWidget(lookup, odin_consts.CLASSIFICATION_CHNL, message);
                                });
                            };

                            OWF.ready(function () {

                                var launchConfig = OWF.Launcher.getLaunchData();

                                if (!launchConfig) {
                                    console.log('Loading Air Asset Deployment Details does not have launchconfig');
                                    $timeout(function () { $scope.$apply(createNewAssetAirDeployment()); });
                                }
                                else {
                                    console.log('Loading Air Asset Deployment Details has launchconfig');
                                    console.log(launchConfig);
                                    var launchConfigJson = OWF.Util.parseJson(launchConfig);
                                    $timeout(function () { $scope.$apply(loadAssetAirDeployment(launchConfigJson.message)); });
                                }

                                OWF.Eventing.subscribe($scope.channel, function (sender, message) {
                                    console.log('Loading Air Asset Deployment');
                                    $timeout(function () { $scope.$apply(loadAssetAirDeployment(message)); });
                                });
                            });

                        }]);
});

