(function (angular) {
   
    'use strict';

    angular.module('Education', []);

    angular.module('Education')
        .directive('education', ['$timeout', '$window', '$document', '$route', function ($timeout, $window, $document, $route) {
            return {
                restrict: 'AE',
                scope: {

                },
                transclude: true,
                templateUrl: '/App/Modules/Portfolio/Education/Templates/IsotopeTemplate.html',
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        $timeout(function () {
                            console.log("education");
                            var news,data = newsData2();
                        
                            news = new News(data);
                            $(window).resize($.proxy(news.updateAfterBrowserResize, news));
                        }, 0);
                    }, 0);

                }
            }

        }]);

})(angular);

