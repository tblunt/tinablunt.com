/// <autosync enabled="true" />
module TinasApp {
    'use strict';

    export interface ICareerLogDirectiveScope extends ng.IScope {
        careerLogData: any[];
    }

    export class CareerLogDirective extends BaseDirective<ICareerLogDirectiveScope> {

        constructor(private $http: ng.IHttpService) {
            super();

            this.restrict = 'A';
        }

        public initialize(scope: ICareerLogDirectiveScope, element: JQuery, attributes: ng.IAttributes): void {
            this.$http.get('/App/Modules/Portfolio/CareerLog/Data/careerLogData.json').success((data) => {
                var d: any[] = <any[]>data;
                scope.careerLogData = d.slice().reverse();
            }).error((e) => {
                console.log("error getting careerlog data");
            });

            console.log("CareerLogDirective");
        }

    }
}  