/// <autosync enabled="true" />

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

    }

    var app = angular.module('TinasApp', ['ngRoute', 'ngCVGame', 'Education', 'ngSanitize']);
    //var app = angular.module('AreAdmin', ['ngAnimate', 'angularSpinner']);  

    app.controller("MainController", ["$scope", "$location", MainController])
        .directive("header", Directives.Header)
        .directive("background", Directives.Background)
        .directive("social", Directives.Social)
        .directive("careerLog", Directives.CareerLog)
        .directive("receptList", Directives.Recept)
        .directive("clothes", Directives.Clothes);

    app.config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationService) => {
        
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
            templateUrl: 'App/Modules/Portfolio/Education/Templates/Education.html'
        })
            .when('/Portfolio/CareerLog', {
            templateUrl: 'App/Modules/Portfolio/CareerLog/Templates/CareerLog.html'
        })
            .when('/Social', {
            templateUrl: 'App/Modules/Social/Templates/Social.html'
        });

        $routeProvider.otherwise({ redirectTo: '/' });

    });
}