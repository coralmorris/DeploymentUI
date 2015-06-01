'use strict';

define(['angular', 'assetAirDeployment/services', 'assetAirDeployment/consts', 'jqueryMask', 'widgetParentChild', 'trNgGrid'], function (angular) {
    return angular.module('assetAirDeployment.controllers', ['assetAirDeployment.services', 'assetAirDeployment.consts', 'widget_parent_launcher', 'trNgGrid'])
            .controller('ManagementController',
                    ['$scope',
                        'AssetAirDeploymentServices',
                        'assetAirDeployment.widget.consts',
                        'WidgetLauncher',

                        function ($scope,
                                assetAirDeploymentServices,
                                assetAirDeployment_widget_consts,
                                WidgetLauncher
                                ) {

                            $scope.currentParams = [];
                            $scope.channelIndex = 0;
                            $scope.targetResults = [];
                            $scope.selected = [];
                            $scope.newWindow = false;

                            $scope.$watch('selected', function (rowItem) {
                                if (rowItem.length > 0 && $scope.newWindow === false) {
                                    $scope.launchTarget(rowItem[0]);
                                }
                                $scope.newWindow = false;
                            }, true);

                            $scope.openNewWindow = function (rowItem) {
                                $scope.newWindow = true;
                                var channel = $scope.channel + "_" + $scope.channelIndex;
                                $scope.channelIndex++;
                                if ($scope.lookup.length > 0 && rowItem !== undefined) {
                                    WidgetLauncher.launchMultipleInstanceWidget($scope.lookup, channel, rowItem);
                                }
                            };

                            $scope.createNew = function () {
                                var newItem = {};
                                $scope.newWindow = true;
                                var channel = $scope.channel + "_" + $scope.channelIndex;
                                $scope.channelIndex++;
                                WidgetLauncher.launchMultipleInstanceWidget($scope.lookup, channel, newItem);

                            };

                            $scope.launchTarget = function (target) {
                                if ($scope.lookup.length > 0) {
                                    WidgetLauncher.launchWidget($scope.lookup, $scope.channel, target);
                                }
                            };


                            $scope.loadData = function (messageData) {
                                jQuery("#mgmt").mask("Loading...");
                                $scope.currentParams = messageData.queryParams;

                                assetAirDeploymentServices.query($scope.currentParams).then(function (data) {
                                    jQuery("#mgmt").mask("Loading...");
                                    $scope.targetResults = data;
                                    $scope.channel = messageData.channel;
                                    $scope.widgetName = messageData.widgetName;
                                    WidgetLauncher.lookupWidget(messageData.widgetName, function (lookup) {
                                        $scope.lookup = lookup;
                                    });
                                });
                                jQuery("#mgmt").unmask();
                            };

                            $scope.showSearch = function () {
                                var message = { queryParams: $scope.currentParams };
                                WidgetLauncher.lookupWidget(assetAirDeployment_widget_consts.SEARCH_WIDGET_NAME, function (lookup) {
                                    WidgetLauncher.launchWidget(lookup, assetAirDeployment_widget_consts.MGMT_CHNL, message);
                                });
                            };

                            OWF.ready(function () {
                                var launchConfig = OWF.Launcher.getLaunchData();

                                if (launchConfig) {
                                    var launchConfigJson = OWF.Util.parseJson(launchConfig);
                                    OWF.Eventing.subscribe(launchConfigJson.channel, function (listener, message, channel) {
                                        $scope.loadData(message);
                                    });
                                    $scope.loadData(launchConfigJson.message);
                                }
                                else {
                                    var ts = Math.round(new Date().getTime() / 1000);
                                    var tsYesterday = ts - (24 * 3600);
                                    var messageData = { queryParams: { eventStartTsFrom: tsYesterday, eventStartTsTo: ts } };
                                    messageData.channel = assetAirDeployment_widget_consts.DET_CHNL;
                                    messageData.widgetName = assetAirDeployment_widget_consts.DETAILS_WIDGET_NAME;
                                    $scope.loadData(messageData);
                                }

                            });

                        }]);
});