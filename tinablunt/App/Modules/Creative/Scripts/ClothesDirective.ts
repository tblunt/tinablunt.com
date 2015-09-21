/// <autosync enabled="true" />

module TinasApp {
    'use strict';

    export interface IClothesDirectiveScope extends ng.IScope {
        imgData: any;
        selectedImageSrc: string;
        setSelectedImage: (img: any) => any;

    }

    export class ClothesDirective extends BaseDirective<IClothesDirectiveScope> {

        constructor() {
            super();

            this.restrict = 'A';

        }

        public initialize(scope: IClothesDirectiveScope, element: JQuery, attributes: ng.IAttributes): void {
            scope.setSelectedImage = (img) => this.setSelectedImage(img, scope);
            scope.imgData = this.getImageData();
            console.log(scope.imgData);
        }

        private setSelectedImage(imgSrc, scope: IClothesDirectiveScope) {
            scope.selectedImageSrc = (imgSrc != scope.selectedImageSrc) ? imgSrc : null;
        }

        private getImageData() {
            return [
                {
                    "collection": "Höst 2015",
                    "images": [
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_7477.JPG",
                            "desc": "Bikerjacka i kostymtyg med mockadetaljer."
                        }                       

                    ]
                },
                {
                    "collection": "Vår 2015",
                    "images": [
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_6846.JPG",
                            "desc": "Svart kjol i kostymtyg med fickor och skärp i mocka"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_6850.JPG",
                            "desc": "Ännu en mönstrad sommarklänning"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_5418.JPG",
                            "desc": "Långärmad sommarklänning"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_5425.JPG",
                            "desc": "Sommarklänning"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_5428.JPG",
                            "desc": "Mönstrad mysklänning med låg midja"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4097.JPG",
                            "desc": "Svartvit klänning med vita muddar"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4103.JPG",
                            "desc": "Kjol i bomull med stora goa fickor"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_5085.JPG",
                            "desc": "Mönstrad långklänning med skinndetaljer"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_5087.JPG",
                            "desc": "Tröja med skinndetaljer och mönsterdelar som matchar klänningen"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_5092.JPG",
                            "desc": "Vit tangaklänning"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_5096.JPG",
                            "desc": "Trenchcoat i mjukt bomull"
                        }

                    ]
                },
                {
                    "collection": "Höst 2014",
                    "images": [
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4049.JPG",
                            "desc": "Klänning i mönstad chifong och detaljer i fuskskinn."
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4020.JPG",
                            "desc": "Blå/brun jacka i fuskskinn, möbeltyg och tvinnad ull, fram"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4023.JPG",
                            "desc": "Blå/brun jacka i fuskskinn, möbeltyg och tvinnad ull, bak"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_3706.JPG",
                            "desc": "Svart/vitrandig och gul klänning"
                        },

                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_2785.JPG",
                            "desc": "Finklänning"
                        },

                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_3709.JPG",
                            "desc": "Svart bomullströja med detaljer av fuskskinn"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4009.JPG",
                            "desc": "Svart/vitrandig cardigan"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4036.JPG",
                            "desc": "Lång blommig tröja"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_3996.JPG",
                            "desc": "Vit blommig klänning"
                        },

                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_3711.JPG",
                            "desc": "Lång jacka, fram"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_3715.JPG",
                            "desc": "Lång jacka, bak"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4042.JPG",
                            "desc": "Grå jacka i tvinnad ull, fram"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4041.JPG",
                            "desc": "Grå jacka i tvinnad ull, bak"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4045.JPG",
                            "desc": "Mitt första herrplagg: Kofta i ull"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4001.JPG",
                            "desc": "Svart bomullströja med nåltryck"
                        }
                    ]
                },
                {
                    "collection": "Vår 2014",
                    "images": [

                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_3702.JPG",
                            "desc": "Mönstrad hippieklänning"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4007.JPG",
                            "desc": "Blå klänning med framspänt skärp"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_3698.JPG",
                            "desc": "Blå/svartrandig klänning"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4027.JPG",
                            "desc": "Röd klänning"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4029.JPG",
                            "desc": "Svart kavaj"
                        },
                        {
                            "src": "App/Modules/Creative/Content/Clothes/IMG_4034.JPG",
                            "desc": "Svart klänning med framspänt skärp och blommig rygg"
                        }
                    ]
                }];
        }



    }
}  
