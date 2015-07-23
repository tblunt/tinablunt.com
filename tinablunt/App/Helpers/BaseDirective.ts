/// <autosync enabled="true" />

module TinasApp {
    'use strict';

    export class BaseDirective<T extends ng.IScope> implements ng.IDirective {

        public scope: any;
        public restrict: string;
        public templateUrl: string;
        public template: string;
        public transclude: boolean;


        constructor(restrict: string = '') {
            this.restrict = restrict;
        }

        public initialize(scope: T, element: JQuery, attributes: ng.IAttributes): void {

        }

        public link = (scope: T, element: JQuery, attributes: ng.IAttributes) => this.initialize(scope, element, attributes);
    }
}   