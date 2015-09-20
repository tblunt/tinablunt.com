

module TinasApp {
    'use strict';

    export interface ISocialDirectiveScope extends ng.IScope {
        instaImages: any;
        selectedImageId: any;
        getDate: (date: any) => any;
        setSelectedImage: (img: any) => any;
    }

    export class SocialDirective extends BaseDirective<ISocialDirectiveScope> {
        private next_url: any;
        private months: any;
        
        constructor(private $http: ng.IHttpService) {
            super();

            this.scope = { };
            this.restrict = 'E';
            this.templateUrl = '/App/Modules/Social/Templates/SocialTemplate.html';
        }

        public initialize(scope: ISocialDirectiveScope, element: JQuery, attributes: ng.IAttributes): void {
            var getting = false;
            scope.getDate = (date) => this.getDate(date);
            scope.setSelectedImage = (img) => this.setSelectedImage(img,scope);

            this.months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];

            this.getData('https://api.instagram.com/v1/users/33200675/media/recent/?access_token=33200675.054f33d.4d1b7684b9e8404eac2ad2f309d2c77d&count=20',(d) => {
               
                scope.instaImages = d.data;
                this.next_url = d.pagination.next_url;
                scope.$apply();
             
            });

            $(window).on('scroll',() => {
               
                if ($(window).scrollTop() + $(window).height() > $(".ngview").height() - 5) {
                    if (!getting) {
                        getting = true;
                        this.getData(this.next_url,(d) => {
                            getting = false;
                            scope.instaImages = scope.instaImages.concat(d.data);
                            this.next_url = d.pagination.next_url;
                            scope.$apply();

                        });
                    }
                                      
                }
            });
        }

        private getDate(date) {
            var newDate = new Date(parseInt(date) * 1000);
           
            return newDate.getDate() + " " + this.months[newDate.getMonth()] +" "+ newDate.getFullYear();
        }

        private setSelectedImage(imgId, scope: ISocialDirectiveScope) {
            scope.selectedImageId = (imgId != scope.selectedImageId) ? imgId : null;
        }

        private getData(url, callback) {
           
            var accessToken = '054f33dac6504612a2c40581c0fa2daf';
          
            $.ajax({
                url: url,
                dataType: 'jsonp',
                type: 'GET',
                data: { client_id: accessToken },
                success: (data) => {
                   
                    if (callback)
                        callback(data);
                },
                error: function (data) {
                    console.log("error");
                    console.log(data);
                }
            });
        }

        private instastart(array, scope) {
            console.log(array);
            scope.instaImages = angular.copy(array);

        }

      

    }
}  