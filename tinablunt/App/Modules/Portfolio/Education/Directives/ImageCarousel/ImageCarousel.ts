/// <autosync enabled="true" />
module TinasApp {
    'use strict';

    export interface IImageCarouselDirectiveScope extends ng.IScope {
        id: string;
        images: any;

        imageObjects: any;

        previous: () => void;
        next: () => void;
        selectedIndex: number;
        activate: boolean;
    }

    export interface IImageCarouselDirectiveAttribute extends ng.IAttributes {
        uniqId: string;
    }

    export class ImageCarouselDirective extends BaseDirective<IImageCarouselDirectiveScope> {

        constructor() {
            super();

            this.scope = {
                images: '='
            };
            this.restrict = 'E';
            this.templateUrl = 'App/Modules/Portfolio/Education/Directives/ImageCarousel/ImageCarousel.html';

        }

        public initialize($scope: IImageCarouselDirectiveScope, element: JQuery, attributes: IImageCarouselDirectiveAttribute): void {
            $scope.activate = true;
           
            $scope.id = attributes.uniqId;
            (<any>$("#" + $scope.id)).carousel();

            $scope.imageObjects = [];

            _.map($scope.images,(img) => {
                
                $scope.imageObjects.push({
                    "img": img,
                    "active": null,
                    "direction": null
                });
            });

            $scope.previous = () => this.previous($scope);
            $scope.next = () => this.next($scope);

            $scope.selectedIndex = 0;
        }   
        
        private previous($scope: IImageCarouselDirectiveScope) {
            $scope.selectedIndex--;
            (<any>$("#" + $scope.id)).carousel('prev');
            //$scope.images[$scope.selectedIndex].active(true);
            
        }   
         
        private next($scope: IImageCarouselDirectiveScope) {
            $scope.selectedIndex++;
            console.log("next");
           
            $scope.imageObjects[$scope.selectedIndex].active = true;
            $scope.imageObjects[$scope.selectedIndex].direction = 'next';
           // (<any>$("#" + $scope.id)).carousel('next');


        }


    }
}    