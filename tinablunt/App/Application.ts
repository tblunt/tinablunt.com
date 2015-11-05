/// <reference path="modules/background/backgrounddirective.ts" />
/// <reference path="modules/creative/scripts/clothesdirective.ts" />
/// <reference path="modules/creative/recept/scripts/receptdirective.ts" />
/// <reference path="modules/header/scripts/headerdirective.ts" />
/// <reference path="modules/portfolio/careerlog/scripts/careerlogdirective.ts" />
/// <reference path="modules/portfolio/education/scripts/portfoliocontroller.ts" />
/// <reference path="modules/social/scripts/socialdirective.ts" />

module TinasApp {
    'use strict';
    
    class Directives {

        public static Header(): any {
            return new HeaderDirective();
        }

        public static Background($timeout: ng.ITimeoutService): any {
            return new BackgroundDirective($timeout);
        }

        public static Clothes(): any {
            return new ClothesDirective();
        }

        public static Social($http: ng.IHttpService): any {
            return new SocialDirective($http);
        }

        public static CareerLog($http: ng.IHttpService): any {
            return new CareerLogDirective($http);
        }

        public static Recept(): any {
            return new ReceptDirective();
        }

        public static Courses($q: ng.IQService): any {
            return new CoursesDirective($q);
        }

        public static ImageCarousel(): any {
            return new ImageCarouselDirective();
        }

    }

    var app = angular.module('TinasApp', ['ngRoute', 'ngCVGame', 'Education', 'ngSanitize']);
    //var app = angular.module('AreAdmin', ['ngAnimate', 'angularSpinner']);  

    app.controller("MainController", ["$scope", "$location", MainController])
        .directive("header", Directives.Header)
        .directive("background", Directives.Background)
        .directive("social", Directives.Social)
        .directive("careerLog", Directives.CareerLog)
        .directive("receptList", Directives.Recept)
        .directive("clothes", Directives.Clothes)
        .directive("courses", Directives.Courses)
        .directive("imageCarousel", Directives.ImageCarousel);

    app.config(($routeProvider: any, $locationProvider: ng.ILocationService) => {
        
        $routeProvider
            .when('/', {})
            .when('/Hej', {
            templateUrl: 'App/Modules/Hej/Templates/Hej.html'
        })
            .when('/Creative/Clothes', {
            templateUrl: 'App/Modules/Creative/Templates/Creative.html'
        })
            .when('/Creative/Recept', {
            templateUrl: 'App/Modules/Creative/Recept/Recept.html'
        })
            .when('/Portfolio/CV', {
            templateUrl: 'App/Modules/Portfolio/Templates/Portfolio.html'
        })
            .when('/Portfolio/Education', {
            templateUrl: 'App/Modules/Portfolio/Education/Templates/Education.html',
            controller: PortfolioController.factory()
        })
            .when('/Portfolio/CareerLog', {
            templateUrl: 'App/Modules/Portfolio/CareerLog/Templates/CareerLog.html'
        })
            .when('/Portfolio/CareerLog/ITBehoverOlika', {
            templateUrl: 'App/Modules/Portfolio/CareerLog/Templates/ITBehoverOlika.html'
        })
            .when('/Social', {
            templateUrl: 'App/Modules/Social/Templates/Social.html'
        });

        $routeProvider.otherwise({ redirectTo: '/' });

    });
}