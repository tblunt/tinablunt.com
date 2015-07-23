/// <autosync enabled="true" />

module TinasApp {
    'use strict';

    export interface IMainControllerScope extends ng.IScope {
        selectedView: string;
    }

    export class MainController {

        private scope: IMainControllerScope;

        constructor($scope: IMainControllerScope, private $location: ng.ILocationService) {
            Mediator.subscribe(SetSelectedView,(message) => this.onSetSelectedView(message, $scope));

            $scope.$watch(() => { return $location.path() },() => {
                $scope.selectedView = $location.path().substring(1, $location.path().length);
            });
        }

        private onSetSelectedView(message: IMessage, scope: IMainControllerScope) {
            this.$location.path((<SetSelectedView>message).view);
        }

    }
} 