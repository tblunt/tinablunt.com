var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TinasApp;
(function (TinasApp) {
    'use strict';
    var BackgroundDirective = (function (_super) {
        __extends(BackgroundDirective, _super);
        function BackgroundDirective($timeout) {
            _super.call(this);
            this.$timeout = $timeout;
            this.restrict = 'E';
            this.template = '<canvas class="bg-canvas" id="bg-canvas"></canvas>';
        }
        BackgroundDirective.prototype.initialize = function (scope, element, attributes) {
            var _this = this;
            TinasApp.Mediator.subscribe(TinasApp.SetSelectedView, function (message) { return _this.onSetSelectedView(message, scope); });
            this.$timeout(function () {
                _this.$timeout(function () {
                    _this.canvas = document.getElementById("bg-canvas");
                    _this.ctx = _this.canvas.getContext("2d");
                    _this.ctx.msImageSmoothingEnabled = true;
                    _this.drawBG();
                }, 0);
            }, 0);
        };
        BackgroundDirective.prototype.onSetSelectedView = function (message, scope) {
            var _this = this;
            this.$timeout(function () {
                _this.$timeout(function () {
                    _this.drawBG();
                }, 0);
            }, 0);
        };
        BackgroundDirective.prototype.drawBG = function () {
            this.width = $(".bg-canvas").width();
            this.height = $(document).height();
            this.canvas.height = this.height;
            this.canvas.width = this.width;
            this.drawGradCircle(0, 0, 600, "218,100,90", 0.3);
            this.drawGradCircle(this.width, 0, 800, "218,100,90", 0.3);
            this.drawGradCircle(this.width * 0.5, 0, 600, "225,231,205", 0.3);
            this.drawGradCircle(this.width * 0.4, this.height * 0.2, 200, "225,231,205", 0.1);
            this.drawGradCircle(this.width * 0.6, this.height * 0.3, 300, "225,231,205", 0.1);
            this.drawGradCircle(0, this.height, 400, "88,140,117", 0.3);
            this.drawGradCircle(0, this.height, 300, "11,15,20", 1);
            this.drawGradCircle(this.width * 0.2, this.height, 600, "11,15,20", 1);
            this.drawGradCircle(this.width * 0.4, this.height, 400, "11,15,20", 1);
            this.drawGradCircle(this.width * 0.6, this.height, 300, "11,15,20", 1);
            this.drawGradCircle(this.width * 0.8, this.height, 200, "11,15,20", 1);
            this.drawGradCircle(this.width, this.height, 500, "11,15,20", 1);
            //this.drawGradCircle(this.width*0.5, 0, 1000, "0,0,0");
            //this.drawCanvas();
        };
        BackgroundDirective.prototype.drawGradCircle = function (x, y, r, rgb_string, op) {
            var grd = this.ctx.createRadialGradient(x, y, 0, x, y, r);
            grd.addColorStop(0, "rgba(" + rgb_string + ", " + op + ")");
            grd.addColorStop(1, "rgba(" + rgb_string + ",0)");
            this.ctx.beginPath();
            this.ctx.arc(x, y, r * 1.5, 0, 2 * Math.PI, true);
            this.ctx.fillStyle = grd;
            this.ctx.fill();
        };
        BackgroundDirective.prototype.drawCanvas = function () {
            this.imgdata = this.ctx.getImageData(0, 0, this.width, this.height);
            this.data = this.imgdata.data;
            var i, y = 0, x = 0;
            var r, x0, y0, pixelStep;
            r = 200;
            pixelStep = 0;
            x0 = 100;
            y0 = 100;
            this.drawCircle(100, 100, 100, "red");
            this.ctx.putImageData(this.imgdata, 0, 0);
        };
        BackgroundDirective.prototype.getScalarFromXY = function (x, y) {
            return (y * this.width * 4 + x * 4);
        };
        BackgroundDirective.prototype.drawCircle = function (rx, ry, r, rgb_color_string) {
            var i, angle, x, y;
            for (i = 0; i < r; i++) {
                for (angle = 0; angle < Math.PI * 2 * i; angle++) {
                    //console.log(angle);
                    x = Math.round(rx + i * Math.cos(angle / i));
                    y = Math.round(ry + i * Math.sin(angle / i));
                    console.log(x);
                    //console.log(y);
                    this.data[this.getScalarFromXY(x, y)] = 255;
                    this.data[this.getScalarFromXY(x, y) + 3] = 255;
                }
            }
        };
        return BackgroundDirective;
    })(TinasApp.BaseDirective);
    TinasApp.BackgroundDirective = BackgroundDirective;
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var ClothesDirective = (function (_super) {
        __extends(ClothesDirective, _super);
        function ClothesDirective() {
            _super.call(this);
            this.restrict = 'A';
        }
        ClothesDirective.prototype.initialize = function (scope, element, attributes) {
            var _this = this;
            scope.setSelectedImage = function (img) { return _this.setSelectedImage(img, scope); };
            scope.imgData = this.getImageData();
            console.log(scope.imgData);
        };
        ClothesDirective.prototype.setSelectedImage = function (imgSrc, scope) {
            scope.selectedImageSrc = (imgSrc != scope.selectedImageSrc) ? imgSrc : null;
        };
        ClothesDirective.prototype.getImageData = function () {
            return [
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
                }
            ];
        };
        return ClothesDirective;
    })(TinasApp.BaseDirective);
    TinasApp.ClothesDirective = ClothesDirective;
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var ReceptDirective = (function (_super) {
        __extends(ReceptDirective, _super);
        function ReceptDirective() {
            _super.call(this);
            this.restrict = 'E';
            this.templateUrl = '/App/Modules/Creative/Recept/Templates/ReceptList.html';
        }
        ReceptDirective.prototype.initialize = function (scope, element, attributes) {
            var _this = this;
            scope.recepts = this.getData();
            scope.receptClick = function (recept) {
                _this.receptClick(recept, scope);
            };
        };
        ReceptDirective.prototype.receptClick = function (recept, scope) {
            if (!scope.selectedRecept || scope.selectedRecept.title != recept.title) {
                scope.selectedRecept = recept;
            }
            else {
                scope.selectedRecept = null;
            }
        };
        ReceptDirective.prototype.getData = function () {
            return [
                {
                    "title": "Sås & soppa",
                    "icon": "soup",
                    "img": "/img/Recept/soppa.png",
                    "items": [
                        {
                            "title": "Sparrissoppa",
                            "ingress": "",
                            "ing": ["500 g grön sparris ", "5 st schalottenlökar, hackade", "5 dl grädde eller creme fraiche", "5 dl kycklingbuljong", "1 dl vitt vin", "1 krm salt", "1 krm svartpeppar"],
                            "desc": "Skala sparrisen och skär upp i små bitar.Koka upp lättsaltat vatten i en kastrull och koka sparrisbitarna cirka 2-3 minuter. Häll bort vattnet. Hacka löken grovt och fräs lätt i en kastrull. Tillsätt grädde, kycklingbuljong och vitt vin. Koka upp och lägg sparrisbitarna i gräddsåsen. Låt soppan koka i cirka 10 minuter. Mixa soppan i matberedare och sila för finare konsistens. Smaksätt med salt och peppar. Servera gärna med bröd.<span>Färskost</span>Ställ ett oöppnat paket filmjölk i en kastrull med vatten. Koka i cirka 2 timmar. Öppna paketet och häll av vattnet. Smaksätt osten med vitlök och färska örter. Tillsätt salt och peppar efter smak."
                        },
                        {
                            "title": "Rödvinssås",
                            "ingress": "Man behöver inte ha i alla ingredienser. Jag har samlat lite vad man kan ha i bara.",
                            "ing": ["0,5 gul löl/scharlottenlök", "2st morötter", "smör", "0,5 dl oxfond/kalvfond", "4dl rött vin", "4 dl vatten", "1 tsk soja", "lite socker", "rödvinsvinäger"],
                            "desc": "1. Grovhacka 2 morötter samt en halv gul lök (spara andra halvan till gratängen), 1 knippe timjan och 1 knippe rosmarin. Resten av kryddorna använder du till lammet. 2. Fräs i en panna med smör i ca 2 minuter. 3. Tillsätt oxfonden, rödvin, vatten, soja, vinäger och socker. 4. Låt koka ner på medelhög värme i ca 1 timme. 5. Sila såsen så du bara har den klara delen kvar. 6. Fortsätt koka ner den tills den fått en lagom konsistens. Är man otålig kan man fuska och använda sig av lite lite redning på slutet."
                        },
                        {
                            "title": "Sötpotatissoppa",
                            "ingress": "",
                            "ing": ["2 stora sötpotatisar", "1 ansad purjolök", "2 gula lökar", "2 msk olivolja", "1 liter vatten + 3-4 msk kycklingfond", "4 msk pumpafrön", "1/2 röd chilifrukt, finhackad", "4 dl kokta, röda linser"],
                            "desc": "Börja med att skala sötpotatisen, ansa purjolöken och skala de gula lökarna. Tärna potatisen i ca 1×1 cm stora tärningar. Strimla purjon och finhacka löken. Lägg allt i en stor kastrull, häll på oljan och fräs på medelvärme i ca 5 minuter under omrörning. Häll på vatten och fond och låt alltsammans puttra på medelvärme i ca 20-25 minuter. Häll över allt i en stor bunke och mixa med mixerstav till en slät soppa. Smaka av med salt och peppar. Tillsätt finhackad chili. Koka linserna 10 minuter. Häll av överflödig vätska genom en sil. Fördela 1 dl linser i botten på fyra djupa skålar. Häll på varm soppa och toppa med pumpafrön. Servera."
                        },
                        {
                            "title": "Morotssoppa",
                            "ingress": "",
                            "ing": ["10-12 morötter", "1 msk olivolja", "2 vitlöksklyftor", "2 gula lökar", "2 msk färsk strimlad ingefära", "1 liter vatten", "2 tärningar klar grönsaksbuljong", "ca 2 tsk sambal oelek", "1/2 pressad lime", "1/2 dl finhackad färsk koriander"],
                            "desc": "Börja med att skala morötter, vitlök, lök och ingefära. Skär i mindre bitar, strimla ingefäran och fräs alltsammans i olivoljan i en stor kastrull på medelvärme. Tillsätt vatten och buljong, låt puttra i ca 15 minuter eller tills morotsbitarna mjuknat. Mixa soppan med mixerstav. Krydda med havssalt, vitpeppar och sambal oelek. Smaka av och rör ner finhackad koriander och nypressad lime precis innan servering. Servera med philadelphiacremen nedan. Philadelphiacreme med ingefära & honung 1 dl philadelphia light  1/2 msk svensk honung  1 finhackad vitlöksklyfta  1 msk riven ingefära  1 msk finhackad färsk koriander Rör i hop samtliga ingredienser och ställ kallt fram till servering. Klicka i en matsked creme i den varma soppan, rör om och njut."
                        },
                        {
                            "title": "Annas ärtsoppa",
                            "ingress": "Koka 15 minuter",
                            "ing": ["1 gul lök", "2 vitlöksklyftor", "8 dl vatten", "2 hönsbuljongtärningar", "600 g ärtor", "65 g ruccula", "2 dl creme fraise", "salt", "ost t.ex parmesan"],
                            "desc": "Fräs lök och vitlök. Tillsätt vatten, smula i buljongtärningarna och häll i ärtorna. Låt koka i 15 minuter. Häll i ruccula och creme fraise och mixa. Toppa med ost. Mums!"
                        },
                        {
                            "title": "Svinagoda tomatsoppan",
                            "link": "http://www.nlife.se/soppa/het-tomatsoppa-med-grillad-halloumi/"
                        }
                    ]
                },
                {
                    "title": "Efterrätt",
                    "icon": "dessert",
                    "img": "/img/Recept/dessert1.png",
                    "items": [
                        {
                            "title": "Smulpajen",
                            "ingress": "250 grader, 10-12 minuter",
                            "ing": ["5 dl rabarber ", "3 dl jordgubbar", "2 msk potatismjöl ", "100 g vit choklad", "1 dl mandel, skalad ", "2 dl havregryn ", "1 dl råsocker ", "100 g smör "],
                            "desc": "1. Skala och skiva rabarbern tunt och skär jordgubbarna i bitar. Blanda sedan rabarber, jordgubbar och potatismjöl i små ugnsfasta formar, ca 6-8 styck.2. Hacka vit choklad och mandel grovt, blanda med havregryn, socker och smöret i bitar. 3. Nyp ihop till en smuldeg och strö över rabarbern och jordgubbarna. 4. Baka pajerna i 250° varm ugn i ca 10-12 minuter. Servera med en klick grädde eller glass."
                        },
                        {
                            "title": "Kladdkaka",
                            "ingress": "175 grader i 17 minuter",
                            "ing": ["2 ägg", "100g smör", "2,5 dl socker", "1,5 dl mjöl", "4 msk kakao", "1tsk vaniljsocker", "1tsk havssalt"],
                            "desc": "Gör det du ska"
                        },
                        {
                            "title": "Snabb cheezecake",
                            "ingress": "Kyl i en timme",
                            "ing": ["2 msk smör", "4 st digestive", "1 dl vispgrädde", "1 dl florsocker", "1 tsk vaniljsocker", "250 g kvarg eller philadelphia"],
                            "desc": "Smält smöret. Mixa kexen med smöret. Fördela i fyra glas. Vispa grädden med florsocker, vaniljsocker och valfi smaksättning(kakao, citron). Rör i kvarg/philladelphia. Klicka i glasen. kyl i en timme"
                        },
                        {
                            "title": "ChokladMousse",
                            "ingress": "Kyl i minst en timme",
                            "ing": ["125g choklad(70%)", "2 msk florsocker", "3 msk starkt varmt kaffe", "1 st äggula", "2 dl vispgrädde", "Hallon"],
                            "desc": "Smält choklad i vattenbad, rör sedan ner socker, kaffe och äggula. Låt svalna. Vispa grädden lätt. Häll i 1/3-del i chokladsmeten. Vänd i. I med resten av grädden. Vänd i. Hallon i botten av formar och häll på smeten. Låt stå i kylen i minst en timme."
                        }
                    ]
                },
                {
                    "title": "Bröd & bak",
                    "icon": "bread",
                    "img": "/img/Recept/bread.png",
                    "items": [
                        {
                            "title": "Lindas foccacia",
                            "ingress": "225 grader, 25 minuter",
                            "ing": ["50 g jäst", "5 dl vatten, 37grader", "1,5tsk salt", "2msk smör", "250g kesella kvarg", "5dl durumvete", "9dl vetemjöl", "150g soltorkade tomater", "300g feta", "2msk grovhackad färsk rosmarin", "2tsk gourmetsalt"],
                            "desc": "1. Rör ut jästen i vattnet i en bunke. Tillsätt salt, smör, kvarg, durumvetemjöl och vetemjöl. Arbeta degen tills den knns smidig. Den ska vara ganska lös. Låt jäsa ca 30 minuter. 2. Skär tomat och ost i bitar. Tryck ut degen med mjölad hand i en väl smord långpanna. Pensla degen med oljan från de marinerade tomaterna. Strö över tomat, ost, rosmarin och salt. Tryck ner det i degen med fingertopparna. 3. Sätt ugnen på 225 grader. Låt degen jäsa ca 15 minuter. Grädda i mitten av ugnen ca 25 minuter. Låt svalna på galler."
                        },
                        {
                            "title": "Valnötsbröd",
                            "ingress": "200 grader, 35 minuter",
                            "ing": ["25 g jäst", "2 1⁄2 dl vatten , max 37°", "1 tsk salt", "25 g Svenskt Smör från Arla", "1 dl kvarg", "1 msk honung", "3 dl grovt rågmjöl", "3 dl vetemjöl special", "2 dl valnötter"],
                            "desc": "Rör ut jästen i vattnet i en bunke. Tillsätt salt, smör, kvarg, honung och det mesta av mjölet. Arbeta degen smidig, ca 10 min. Låt jäsa ca 45 min. Sätt ugnen på 200°. Rosta valnötterna på en plåt i övre delen av ugnen ca 10 min. Platta ut degen på mjölad bänk. Strö över hälften av nötterna. Vik degen på mitten och strö över resten. Vik på mitten och forma ett runt bröd. Låt jäsa på plåt med bakplåtspapper ca 30 min. Mjöla och snitta brödet. Grädda i nedre delen av ugnen ca 35 min. Låt brödet svalna på galler."
                        },
                        {
                            "title": "Lussebullar",
                            "ingress": "225 grader, 5-8 minuter",
                            "ing": ["50 g jäst", "100 g Smör", "5 dl mjölk", "250 g kvarg", "1 g saffran", "1 1⁄2 dl strösocker", "1⁄2 tsk salt", "ca 17 dl vetemjöl", "russin", "1 st ägg"],
                            "desc": "Smula jästen i en bunke. Smält smöret, tillsätt mjölken och värm till max 37°. Häll det över jästen. Tillsätt övriga ingredienser. Arbeta degen smidig. Låt jäsa under bakduk ca 30 min. Sätt ugnen på 225°. Ta upp degen på mjölad arbetsbänk. Dela den i 35 bitar och baka ut enkla lussekatter. Lägg på plåtar med bakplåtspapper. Garnera med russin. Låt jäsa ca 20 min.<br /> Pensla med uppvispat ägg. Grädda i mitten av ugnen 5-8 min. Låt svalna på galler."
                        },
                        {
                            "title": "Pizzadeg",
                            "ingress": "275 grader, 10-15 minuter",
                            "ing": ["50 g färsk jäst ", "2 tsk socker", "1 tsk flingsalt ", "0.5 dl olivolja ", "3 dl ljummet vatten", "7 dl vetemjöl special"],
                            "desc": "1. Blanda jäst, socker, salt, olja och fingervarmt vatten (37 grader) i en degbunke. 2. Rör i mjöl, lite i taget, tills du får en fast och elastisk deg. Spara resten av mjölet till utbakning.3. Jäs pizzadegen i bunken under bakduk i cirka 25 minuter. 4. Dela degen på 4 bitar och baka ut dem med kavel på mjölat bakbord."
                        },
                        {
                            "title": "Scones",
                            "ingress": "250 grader i 10 minuter, 2 st",
                            "ing": ["40 g smör ", "1,5 d filmjölk", "3 dl vetemjöl", "1 dl grahamsmjöl", "2 tsk bakpulver", "0,5 tsk salt"],
                            "desc": "Blanda allt med fingrarna och in i ugnen."
                        }
                    ]
                },
                {
                    "title": "Mat",
                    "icon": "food",
                    "img": "/img/Recept/food.png",
                    "items": [
                        {
                            "title": "Laxrullar",
                            "ingress": "",
                            "ing": ["2 st tunnbröd", "4 skivor kallrökt lax", "3 msk lättkesella", "3 msk färsk dill, hackad", "1 tsk honung", "1 msk pressad citron", "1 msk dijonsenap", "1 päron, klyftat", "1 palsternacka, i stavar", "2 dl rödkål, finstrimlad"],
                            "desc": "Lägg ut tunnbröden på tallrikar. Blanda kesella, hackad dill, honung, citron och senap till en bredbar smet. Bred bröden med smeten. Klyfta päronet och rosta lätt i en medelvarm panna med lite olivolja och strimlad rödkål i några minuter. Låt svalna. Skär palsternackan i stavar, salta lätt och rosta i ugn, 200 grader 10-15 minuter. Låt svalna. Lägg ut laxskivorna på bröden. Fördela päron, rödkål och palsternacka uppå. Rulla i hop bröden och servera."
                        },
                        {
                            "title": "Fiskburgare",
                            "ingress": "",
                            "ing": ["ca 500 g fisk", "0,5 gul lök", "0,5 matlagningsgrädde", "1 msk potatismjöl", "3-5 krm salt", "vitpeppar", "cayennepeppar"],
                            "desc": "Mixa allt och stek på"
                        },
                        {
                            "title": "Spenat/fetalasagne",
                            "ingress": "20-25 minuter, 200 grader",
                            "ing": ["lasagneplattor", "500 g hackad spenat", "1-2 paket fetaost", "200 g keso", "1 burk creme fresh", "körsbärstomater", "Riven ost", "salt+peppar"],
                            "desc": "Blanda allt(inte plattorna eller osten). Lagra med lasagneplattor och avsluta med ost på toppen. Grädda."
                        },
                        {
                            "title": "Sötpotatisgratäng",
                            "ingress": "200 grader i 10 minuter",
                            "ing": ["5 st sötpotatisar", "0,5 st röd chilli", "0,5 st gul lök", "2 st vitlöksklyftor", "1 msk smör", "3 dl grädde", "1 dl mjölk", "1,5 dl riven ost", "0,5 st purjolök"],
                            "desc": "Stek potatis, chilli, gullök, mjölk, vitlök i kastrull tillsätt grädde+mjölk. Kok 10 min. Lägg i ungnsform. Strö över purjo+ost. Grädda 10 min i ugn."
                        },
                        {
                            "title": "Karros bananplättar",
                            "ingress": "",
                            "ing": ["4 bananer", "4 dl havregryn", "2 tsk bakpulver", "1 krm kardemumma", "1 krm kanel", "0,5 tsk salt"],
                            "desc": "Mixa alla torra ingredienser i en skål. Mosa bananer och blanda med alla otorra ingredienser i en annan skål. Bland sen båda rörorna, låt stå i 10 min och stek sedan."
                        },
                        {
                            "title": "Baby back ribs",
                            "ingress": "6 portioner. Koka 1,5 timmar -> grilla",
                            "ing": ["1 dl farinsocker", "1 dl japask soya", "1 dl ketchup", "1 dl honung", "1 tum stor färsk ingefära", "4 st vitlöksklyftor", "1 tsk tabasco", "5 kg tunna revbensspjäll", "3st gula lökar", "1 st hel vitlök", "salt+peppar"],
                            "desc": "Glaze: Blanda farinsocker, soya, ketchup och honung i ne skål. Skala och riv ingefära och vitlök och blanda det i glazen. Smaksätt med tabasco. <span>Ribs:</span> Koka upp en stor kastrull med vatten. Halvera lökarna och vitlöken, lägg dem i kastrullen. Tillsätt svartpepparkorn och rikligt med salt. Dela revbenen på mitten så att de ryms i kastrullen och täcks helt med vatten. Koka dem långsamt under lock i cirka 1 ½ timme. De är färdiga när köttet börjar lossa från benen. Ta upp revbenen och torka det med hushållspapper, lägg dem på en ugnsplåt och pensla med BBQ glaze. Grilla dem och pensla på mer glaze under grillningen. "
                        }
                    ]
                }
            ];
        };
        return ReceptDirective;
    })(TinasApp.BaseDirective);
    TinasApp.ReceptDirective = ReceptDirective;
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var HeaderDirective = (function (_super) {
        __extends(HeaderDirective, _super);
        function HeaderDirective() {
            _super.call(this);
            this.scope = { selectedView: '=' };
            this.restrict = 'E';
            this.templateUrl = 'App/Modules/Header/Templates/Header.html';
        }
        HeaderDirective.prototype.initialize = function (scope, element, attributes) {
            var _this = this;
            scope.navItemData = this.getHeaderNavItemData();
            scope.navitemClicked = function (navitem) { return _this.navitemClicked(navitem, scope); };
            scope.isActiveNavItem = function (navitemid) { return _this.isActiveNavItem(navitemid, scope); };
            scope.isActiveNavSubItem = function (navitemid) { return _this.isActiveNavSubItem(navitemid, scope); };
            scope.navSubitemClick = function (subitem, navitem) { return _this.navSubitemClick(subitem, navitem, scope); };
        };
        HeaderDirective.prototype.isActiveNavItem = function (navitemid, scope) {
            var temp = scope.selectedView.indexOf(navitemid) > -1;
            return temp;
        };
        HeaderDirective.prototype.isActiveNavSubItem = function (subnavitemid, scope) {
            var temp = scope.selectedView.indexOf(subnavitemid) > -1;
            return temp;
        };
        HeaderDirective.prototype.navitemClicked = function (navitem, scope) {
            var temp = (scope.selectedView.indexOf(navitem.id) > -1) ? null : navitem.id;
            if (temp) {
                if (navitem.subviews) {
                    temp += "/" + navitem.subviews[0].id;
                }
            }
            var msg = new TinasApp.SetSelectedView(temp);
            TinasApp.Mediator.publish(msg);
        };
        HeaderDirective.prototype.navSubitemClick = function (navsubitem, navitem, scope) {
            // var temp = (navsubitem.id != scope.selectedView) ? navsubitem.id : null;
            var temp = navitem.id + "/" + navsubitem.id;
            var msg = new TinasApp.SetSelectedView(temp);
            TinasApp.Mediator.publish(msg);
        };
        HeaderDirective.prototype.getHeaderNavItemData = function () {
            return [
                {
                    "title": "Hej!",
                    "icon": "welcome",
                    "color": "turkois",
                    "id": "Hej"
                },
                {
                    "title": "Kreativ abstinens",
                    "icon": "creative",
                    "color": "green",
                    "id": "Creative",
                    "subviews": [{
                        "title": "Kläder",
                        "icon": "clothes",
                        "id": "Clothes"
                    }, {
                        "title": "Recept",
                        "icon": "food",
                        "id": "Recept"
                    }]
                },
                {
                    "title": "Portfolio",
                    "icon": "portfolio2",
                    "color": "orange",
                    "id": "Portfolio",
                    "subviews": [
                        {
                            "title": "Karriären",
                            "icon": "project",
                            "id": "CareerLog"
                        },
                        {
                            "title": "CV",
                            "icon": "cv",
                            "id": "CV"
                        },
                        {
                            "title": "Utbildning",
                            "icon": "study",
                            "id": "Education"
                        }
                    ]
                },
                {
                    "title": "Socialiteter",
                    "icon": "social",
                    "color": "red",
                    "id": "Social"
                }
            ];
        };
        return HeaderDirective;
    })(TinasApp.BaseDirective);
    TinasApp.HeaderDirective = HeaderDirective;
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var CareerLogDirective = (function (_super) {
        __extends(CareerLogDirective, _super);
        function CareerLogDirective($http) {
            _super.call(this);
            this.$http = $http;
            this.restrict = 'A';
        }
        CareerLogDirective.prototype.initialize = function (scope, element, attributes) {
            this.$http.get('/App/Modules/Portfolio/CareerLog/Data/careerLogData.json').success(function (data) {
                var d = data;
                scope.careerLogData = d.slice().reverse();
            }).error(function (e) {
                console.log("error getting careerlog data");
            });
            console.log("CareerLogDirective");
        };
        return CareerLogDirective;
    })(TinasApp.BaseDirective);
    TinasApp.CareerLogDirective = CareerLogDirective;
})(TinasApp || (TinasApp = {}));
var TinasApp;
(function (TinasApp) {
    'use strict';
    var PortfolioController = (function () {
        function PortfolioController($scope, $timeout) {
            var _this = this;
            this.$timeout = $timeout;
            this.pauseAtBeginning = 500;
            this.keyframes = [0];
            TinasApp.Mediator.subscribe(TinasApp.RefreshSkrollr, function (message) { return _this.onRefreshSkrollr(); });
            //När man lämnar denna vy
            $scope.$on('$destroy', function () {
                $("body").css({ "portfolio": "auto" });
            });
            var data = this.getData();
            this.setCourseData(data, $scope);
            this.setProjectsData(data, $scope);
            $scope.goToView = function (nr) {
                _this.goToView(nr);
            };
            $scope.setSelectedCourse = function (course) {
                _this.setSelectedCourse(course, $scope);
            };
            $scope.setSelectedProject = function (project, index) {
                _this.setSelectedProject(project, index, $scope);
            };
            $scope.separateProjects = function () {
                _this.separateProjects($scope);
            };
            //start
            $timeout(function () {
                $timeout(function () {
                    _this.initPortfolio();
                }, 0);
            }, 0);
        }
        PortfolioController.prototype.setProjectsData = function (data, $scope) {
            var projs = _.filter(data, function (d) {
                return d.type == 'project';
            });
            $scope.projects = [[], [], []];
            $scope.columns = ($(window).width() < 768) ? 2 : 4;
            var rows = Math.ceil(projs.length / $scope.columns);
            for (var i = 0; i < rows; i++) {
                $scope.projects[i] = [];
                for (var j = 0; j < $scope.columns; j++) {
                    if (((i * $scope.columns) + j) < projs.length) {
                        $scope.projects[i].push(projs[(i * $scope.columns) + j]);
                    }
                }
            }
        };
        PortfolioController.prototype.setCourseData = function (data, $scope) {
            $scope.categories = ['Medieteknikinriktade', 'Programmering', 'Matte', 'Civilingenjörsinriktad'];
            $scope.courseData = angular.copy($scope.categories);
            $scope.courseData[0] = _.filter(data, function (d) {
                return d.type == 'kurser' && d.underTitle == "Kurs: Medieteknikinriktad";
            });
            $scope.courseData[1] = _.filter(data, function (d) {
                return d.type == 'kurser' && d.underTitle == "Kurs: Programering";
            });
            $scope.courseData[2] = _.filter(data, function (d) {
                return d.type == 'kurser' && d.underTitle == "Kurs: Matematik";
            });
            $scope.courseData[3] = _.filter(data, function (d) {
                return d.type == 'kurser' && d.underTitle == "Kurs: Civilingenjörsinriktad";
            });
        };
        PortfolioController.prototype.onRefreshSkrollr = function () {
            var _this = this;
            this.removeAllDataDashAttributes();
            this.$timeout(function () {
                _this.$timeout(function () {
                    _this.initPortfolio();
                }, 0);
            }, 0);
        };
        /*********** privata funktioner ***********/
        PortfolioController.prototype.initPortfolio = function () {
            console.log("init portfolio");
            this.getKeyframes();
            this.animateViews();
            this.initSkrollr();
        };
        //lagrar start-tid för varje vy som finns i portfolion
        PortfolioController.prototype.getKeyframes = function () {
            var _this = this;
            this.views = angular.element(".view");
            var viewHeight;
            _.each(this.views, function (view, index) {
                console.log($(view).height());
                if ($(view).height() < $(window).height()) {
                    viewHeight = $(window).height();
                }
                else {
                    viewHeight = $(view).height();
                }
                var paus = ($(view).attr("snap-time")) ? parseInt($(view).attr("snap-time")) : _this.pauseAtBeginning;
                var delay = ($(view).attr("enter-delay")) ? parseInt($(view).attr("enter-delay")) : 0;
                var extra = ($(view).attr("extra-height")) ? parseInt($(view).attr("extra-height")) : 0;
                //egna höjden + föregående vy start-tid + hur länge vyn ska ligga stilla i början
                var nextViewKeyFrame = viewHeight + _this.keyframes[index] + paus + extra;
                _this.keyframes.push(nextViewKeyFrame);
            });
            $(".portfolio").height(this.keyframes[(this.keyframes.length - 1)]);
        };
        PortfolioController.prototype.animateViews = function () {
            var _this = this;
            var windowHeight = $(window).height();
            _.each(this.views, function (view, index) {
                var extra = ($(view).attr("extra-height")) ? parseInt($(view).attr("extra-height")) : 0;
                //värden som hämtas från html:en, finns det inga värden sätts transform:translateY
                var beforeEnterCssClass = ($(view).attr("before-enter")) ? $(view).attr("before-enter") : "transform:translateY(" + $(window).height() + "px);";
                var afterEnterCssClass = ($(view).attr("after-enter")) ? $(view).attr("after-enter") : "transform:translateY(0%);";
                var beforeLeaveCssClass = ($(view).attr("before-leave")) ? $(view).attr("before-leave") : "transform:translateY(0%);";
                var afterLeaveCssClass = ($(view).attr("after-leave")) ? $(view).attr("after-leave") : "transform:translateY(-" + ($(view).height() + extra) + "px);";
                var paus = ($(view).attr("snap-time")) ? parseInt($(view).attr("snap-time")) : _this.pauseAtBeginning;
                var delay = ($(view).attr("enter-delay")) ? parseInt($(view).attr("enter-delay")) : 0;
                //vilken tid det ska ta att animera in och animera ut
                //har den inte specificerats i html:en sätts den til 300
                var enterDuration = ($(view).attr("enter-duration")) ? parseInt($(view).attr("enter-duration")) : 300;
                var leaveDuration = ($(view).attr("leave-duration")) ? parseInt($(view).attr("leave-duration")) : 300;
                //sätter på skrollr-klasser efter keyframesen
                //init values 
                $(view).attr("data-0", "top:0px;");
                //animate in
                $(view).attr("data-" + (_this.keyframes[index] - enterDuration + delay), beforeEnterCssClass + "top:0px;");
                $(view).attr("data-" + (_this.keyframes[index] + delay), afterEnterCssClass + "top:0px;");
                $(view).attr("data-" + (_this.keyframes[index] + paus + delay), afterEnterCssClass + "top:0px;");
                //animate out
                //om vyn är större än fönsterhöjden så ska  man kunna skrolla i den
                if ($(view).height() + extra > windowHeight) {
                    $(view).attr("data-" + (_this.keyframes[(index + 1)] - leaveDuration), beforeLeaveCssClass + "top:" + (-($(view).height() + extra)) + "px;");
                }
                else {
                    $(view).attr("data-" + (_this.keyframes[(index + 1)] - leaveDuration), beforeLeaveCssClass);
                }
                $(view).attr("data-" + (_this.keyframes[(index + 1)]), afterLeaveCssClass);
                //animerar h1-taggen
                var intro = ($(view).attr("intro-time")) ? parseInt($(view).attr("intro-time")) : 0;
                //in
                $(view).find('h1').attr("data-" + (_this.keyframes[index] - enterDuration + delay + intro), "opacity:0;margin-left:1000px;");
                $(view).find('h1').attr("data-" + (_this.keyframes[index] + delay + intro), "opacity:1;margin-left:0px;");
                //ut
                //animerar tillhörande meny-plupp, med samma tid-värden som själva vyn
                _this.animateMenuItem(index, $(view).attr("id"), enterDuration, leaveDuration);
            });
        };
        PortfolioController.prototype.animateMenuItem = function (index, itemId, enterDuration, leaveDuration) {
            $("#menu-" + itemId).attr("data-" + (this.keyframes[index] - (enterDuration)), "padding-left:5px;");
            $("#menu-" + itemId).attr("data-" + (this.keyframes[index]), "padding-left:25px;");
            //animate out
            $("#menu-" + itemId).attr("data-" + (this.keyframes[(index + 1)] - (leaveDuration)), "padding-left:25px;");
            $("#menu-" + itemId).attr("data-" + (this.keyframes[(index + 1)]), "padding-left:5px;");
        };
        PortfolioController.prototype.initSkrollr = function () {
            //Kollar att skrollr inte redan är definierad
            if (!skrollr.get()) {
                skrollr.init({
                    forceHeight: false,
                    mobileDeceleration: 0.004,
                    mobileCheck: function () {
                        return false;
                    }
                });
            }
            else {
                skrollr.get().refresh();
            }
        };
        PortfolioController.prototype.removeAllDataDashAttributes = function () {
            var _this = this;
            angular.forEach($(".view"), function (elem) {
                _this.removeDataDashAttributesForOneElement(elem);
            });
            angular.forEach($(".menu-item"), function (elem) {
                _this.removeDataDashAttributesForOneElement(elem);
            });
        };
        PortfolioController.prototype.removeDataDashAttributesForOneElement = function (elem) {
            $(elem).each(function () {
                // get the native attributes object
                var attrs = this.attributes;
                var toRemove = [];
                // cache the jquery object containing the element for better performance
                var element = $(this);
                for (var attr in attrs) {
                    if (typeof attrs[attr] === 'object' && typeof attrs[attr].name === 'string' && (/^data-/).test(attrs[attr].name)) {
                        // Unfortunately, we can not call removeAttr directly in here, since it
                        // hurts the iteration.
                        toRemove.push(attrs[attr].name);
                    }
                }
                for (var i = 0; i < toRemove.length; i++) {
                    element.removeAttr(toRemove[i]);
                }
            });
        };
        /*********** publika funktioner, $scope-funktioner ***********/
        PortfolioController.prototype.goToView = function (nr) {
            var delay = ($(this.views[nr]).attr("enter-delay")) ? parseInt($(this.views[nr]).attr("enter-delay")) : 0;
            var intro = ($(this.views[nr]).attr("intro-time")) ? parseInt($(this.views[nr]).attr("intro-time")) : 0;
            $('html,body').animate({
                scrollTop: this.keyframes[nr] + delay + intro
            }, 1000);
        };
        PortfolioController.prototype.separateProjects = function ($scope) {
            console.log($scope.projects);
            var arr = [[], [], []];
            var columns = ($(window).width() < 768) ? 2 : 4;
            var rows = Math.floor($scope.projects.length / columns);
            for (var i = 0; i < rows; i++) {
                arr[i] = [];
                for (var j = 0; j < columns; j++) {
                    arr[i].push($scope.projects[(i * 4) + j]);
                }
            }
            return arr;
        };
        PortfolioController.prototype.setSelectedCourse = function (course, $scope) {
            $scope.selectedCourse = (!$scope.selectedCourse || course.title != $scope.selectedCourse.title) ? course : null;
        };
        PortfolioController.prototype.setSelectedProject = function (project, index, $scope) {
            console.log(project);
            $scope.selectedProject = (!$scope.selectedProject || project.title != $scope.selectedProject.title) ? project : null;
            //if ($scope.selectedProject) {
            //    var columns = ($(window).width() < 768) ? 2 : 4;
            //    var rowIndex = Math.floor(index / columns);
            //    $scope.expandIndex = ((rowIndex + 1) * columns) - 1;
            //    if (rowIndex == Math.floor($scope.projects.length / columns)) {
            //        $scope.expandIndex = $scope.projects.length - 1;
            //    }
            //}
            //else {
            //    $scope.expandIndex = null;
            //}
        };
        PortfolioController.prototype.getData = function () {
            var data = [
                {
                    title: "Design",
                    type: "project",
                    date: "1",
                    img: ["App/Modules/Portfolio/Education/Content/bob0488.jpg"],
                    shortTitle: "Design",
                    underTitle: "Skolprojekt",
                    x: 50,
                    y: 150,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/bob.png",
                    description: "Designprojekt då jag med tre andra planerade och skapade designkonceptet runt en handhållen enhet vi ville uppfinna. Vi skapde Bob, the Book of Books, som var ett digitalt sätt att läsa och lagra böcker (Detta var 2007, långt innan läsplattorna kom ut på marknaden)."
                },
                {
                    title: "3D-Datorgrafik",
                    type: "project",
                    date: "2",
                    img: ["App/Modules/Portfolio/Education/Content/9126_146136472200_3911258_n.jpg"],
                    shortTitle: "3D-Datorgrafik",
                    underTitle: "Skolprojekt",
                    x: 320,
                    y: 160,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/3d2.jpg",
                    description: "Tillsammans med fyra klasskamrater var jag med och skapade dataspelet Volksball, som går ut på att två folkabussar spelar fotboll med en badboll. Spelet är skrivet i C++ med egen fysikmotor och 3D-grafik. Jag arbetade främst i Photoshop och ritade alla texturer, framsidan och hightmapen, men deltogäven i arbetet i 3dStudio Max med bilar och spelplan."
                },
                {
                    title: "Avancerad Bildbehandling",
                    type: "project",
                    date: "4",
                    img: ["App/Modules/Portfolio/Education/Content/im8c.jpg", "App/Modules/Portfolio/Education/Content/prickarochbalkar.png", "App/Modules/Portfolio/Education/Content/boundingbox.png", "App/Modules/Portfolio/Education/Content/klarr.png"],
                    shortTitle: "Bildbehandling",
                    underTitle: "Skolprojekt",
                    x: 480,
                    y: 140,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/abob.png",
                    description: "Skapade i en grupp om tre ett program i  Matlab som, med hjälp av olika bildbehandlingsalgoritmer, tar in en bild på ett notblad och skriver sedan ut noterna i text. Bilderna visar några av stegen som utfördes för att hitta och klassificera noterna."
                },
                {
                    title: "Concept Art",
                    type: "project",
                    date: "2",
                    img: ["App/Modules/Portfolio/Education/Content/39082_432445227200_533537200_5292360_2457477_n.jpg", "App/Modules/Portfolio/Education/Content/flicka.jpg", "App/Modules/Portfolio/Education/Content/37718_428134417200_533537200_5170752_2208684_n.jpg"],
                    shortTitle: "Concept Art",
                    underTitle: "Skolprojekt",
                    x: 550,
                    y: 170,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/concept.png",
                    description: "Målade koncept i Photoshop, bland annat på huvudkaraktären, miljön, vapen och tillbehör, utifrån en given TV-spelsidé. (Sommarkurs på Gotlands universitet)"
                },
                {
                    title: "Bilddatabaser",
                    type: "project",
                    date: "4",
                    img: ["App/Modules/Portfolio/Education/Content/intensity_result.jpg", "App/Modules/Portfolio/Education/Content/query1_facit.jpg", "App/Modules/Portfolio/Education/Content/pojke.jpg"],
                    shortTitle: "Bilddatabaser",
                    underTitle: "Skolprojekt",
                    x: 677,
                    y: 150,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/bdb.png",
                    description: "Tillsammans med två klasskamrater skapade jag program i Matlab som med hjälp av bildbehandlingsalgoritmer, bland annat 3D-histogram, sökte i stora bilddatabaser(5000 bilder stora). Programmen tog in en referebild och spottade ut de 20 bilder som var mest lika referensen. Vi avslutade kursen med att skriva ett program som hittade bilder i bilddatabasen med ansikten på."
                },
                {
                    title: "Agil användbarhetsutveckling för handhållna enheter",
                    type: "project",
                    date: "4",
                    img: ["App/Modules/Portfolio/Education/Content/221790_10150185773562201_533537200_7281160_4615444_n.jpg", "App/Modules/Portfolio/Education/Content/meny.jpeg", "App/Modules/Portfolio/Education/Content/play1.jpeg", "App/Modules/Portfolio/Education/Content/screenshot2_ena.jpg", "App/Modules/Portfolio/Education/Content/screenshot2_andra.jpg"],
                    shortTitle: "Agil",
                    underTitle: "Skolprojekt",
                    x: 750,
                    y: 140,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/agil.jpg",
                    description: "Arbetade i en grupp om åtta enligt Scrum för att skapa Androidspelet ”Peas in war”. Spelet är skrivet i Java och går ut på att två spelare krigar genom att skjuta varandra, alternativt fly med sin lian. Det spelas på två olika androidtelefoner över nätverket. Jag gjorde all grafik till spelet(karaktärer, animationer, menyer och knappar samt spelplanen) i Photoshop och deltogäven i programmeringen."
                },
                {
                    title: "Informationsvisualisering",
                    type: "project",
                    date: "3",
                    img: ["App/Modules/Portfolio/Education/Content/helaprogram.png", "App/Modules/Portfolio/Education/Content/karta.png", "App/Modules/Portfolio/Education/Content/Parallellkoordinate_2004.png", "App/Modules/Portfolio/Education/Content/scatterplot.jpg", "App/Modules/Portfolio/Education/Content/scattermatrix.jpg"],
                    shortTitle: "InfoVis",
                    underTitle: "Skolprojekt",
                    x: 810,
                    y: 130,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/infoVis.png",
                    description: "Tillsammans med en klasskamrat skapade jag ett program för att visualisera data från statistiska centralbyrån och på så sätt hitta möjliga samband mellan antalet aborter i ett län med andra sociala faktorer. Vi programmerade i C#/.net, i ett framework för informatiovisualisering som heter GAV, och skrev även makro till Excel för att bearbeta de stora mängder data vi hade att arbeta med."
                },
                {
                    title: "3D-datorgrafik i 3D-Studio Max",
                    type: "project",
                    date: "3",
                    img: ["App/Modules/Portfolio/Education/Content/render01.jpg", "App/Modules/Portfolio/Education/Content/render02.jpg"],
                    shortTitle: "3D-Studio Max",
                    underTitle: "Skolprojekt",
                    x: 820,
                    y: 180,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/3D_Thumb.png",
                    description: "Lärde mig grunderna i 3D-studio Max där jag bland annat gjorde en delfin. Som miniprojekt skapade jag mitt plugg-”alter ego”, som är byggd av en gitarr, noter, penslar och en basketboll, instängd i en värld av matte. (Sommarkurs på Gotlands universitet)"
                },
                {
                    title: "Grafisk Design och Kummunikation",
                    type: "project",
                    date: "4",
                    img: ["App/Modules/Portfolio/Education/Content/sidan.jpg"],
                    shortTitle: "Grafisk Design",
                    underTitle: "Skolprojekt",
                    x: 950,
                    y: 160,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/isea.png",
                    description: "Gjorde, tillsammans med två klasskamrater, en grafisk profil för ett fiktivt företag, ISEA, som tillverkar lagerprodukter och planerade även en utförlig marknadsföringsplan för företaget och dess produkter. Jag var grafiskt ansvarig."
                },
                {
                    title: "Teknisk projektledning för Audiovisuell Medieproduktion",
                    type: "project",
                    date: "4",
                    img: ["App/Modules/Portfolio/Education/Content/logga.png", "App/Modules/Portfolio/Education/Content/black.png", "App/Modules/Portfolio/Education/Content/Logga1.jpg", "App/Modules/Portfolio/Education/Content/black1.png", "App/Modules/Portfolio/Education/Content/black8.png", "App/Modules/Portfolio/Education/Content/black2.png", "App/Modules/Portfolio/Education/Content/black6.png", "App/Modules/Portfolio/Education/Content/black3.png"],
                    shortTitle: "Medieproduktion",
                    underTitle: "Skolprojekt",
                    x: 1210,
                    y: 150,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/black.png",
                    description: "Gjorde, med sex klasskamrater, en tre minuter lång informationsfilm för kaffemärket Black Royale. Vi filmade både mot green screen i studio och utomhus. Under inspelningen var jag kameraansvarig och i efterbearbetningen gjorde jag logga, klippte i Premiere och bearbetade film i After Effects."
                },
                {
                    title: "Examensarbete",
                    type: "project",
                    date: "5",
                    img: ["App/Modules/Portfolio/Education/Content/sida1_1.png", "App/Modules/Portfolio/Education/Content/sida1.png", "App/Modules/Portfolio/Education/Content/Sida2.jpg", "App/Modules/Portfolio/Education/Content/sida2_1.png", "App/Modules/Portfolio/Education/Content/sida2_2.png", "App/Modules/Portfolio/Education/Content/sida2_3.png"],
                    shortTitle: "Examensarbete",
                    underTitle: "Skolprojekt",
                    x: 1320,
                    y: 140,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/twingly.png",
                    description: "Jag fick i uppdrag av Twingly att skapa en webbaserad applikation för att visualisera bloggstatistik i relation till en specifik blogg. Programmet har som syfte att ge Bloggportalens användare feed-back över bloggens trafik och aktivitet och därmed öka engagemang och länkande hos bloggarna.</br></br> I oktober 2013 belönades mitt arbete med Kaperos stipendium för Sveriges bästa exjobb inom medieteknik.",
                    rapportLink: "http://liu.diva-portal.org/smash/record.jsf?pid=diva2:623128",
                    demoLink: "/bloggportalen-stat/Main/main.html"
                },
                {
                    title: "Medietekniks PR-utskott",
                    type: "meriter",
                    date: "1",
                    img: ["App/Modules/Portfolio/Education/Content/medieteknik.jpg"],
                    shortTitle: "PR-utskottet",
                    underTitle: "Övriga meriter",
                    x: 400,
                    y: 80,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Medlem. Hjälpte till i pr-arbetet för Medietekniksektionen bland annat med att informera om event samt att göra reklam för medietekniks sektionsmedlemmar."
                },
                {
                    title: "Civilingenjörerna i Norrköpings studentförening, 3Cant (08/09)",
                    type: "meriter",
                    date: "2",
                    img: ["App/Modules/Portfolio/Education/Content/IMG_1151.jpg"],
                    shortTitle: "3Cant",
                    underTitle: "Övriga meriter",
                    x: 150,
                    y: 60,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/3Cant.png",
                    description: "Styrelsemedlem, Festerichef-MT. Deltog i mottagningen för nya studenter och anordnade även kravaller, sittningar och andra event under hela studieåret 08/09."
                },
                {
                    title: "Medietekniks Sektionsstyrelse (08/09)",
                    type: "meriter",
                    date: "2",
                    img: ["App/Modules/Portfolio/Education/Content/medieteknik.jpg", "App/Modules/Portfolio/Education/Content/P1010309.jpg", "App/Modules/Portfolio/Education/Content/tina_stor.jpg"],
                    shortTitle: "MT-styrelsen",
                    underTitle: "Övriga meriter",
                    x: 400,
                    y: 80,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Styrelsemedlem, Eventavarig/Festerichef och ordförande i event-utskottet. Anordnade, med hjälp av eventutskottet, event för medietekniks sektionsmedlemmar. Bland annat två event för alla sektionsaktiva och även Medietekniks årliga sittning, MidsommarphesTen. Deltog även i alla de uppdrag som sektionsstyrelsen antog."
                },
                {
                    title: "Medietekniks tjejförening, Mette (08/09)",
                    type: "meriter",
                    date: "2",
                    img: ["App/Modules/Portfolio/Education/Content/Mettemarket.png"],
                    shortTitle: "Mette",
                    underTitle: "Övriga meriter",
                    x: 250,
                    y: 80,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/Mette.png",
                    description: "Styrelsemedlem, informationsansvarig. Deltog i att arrangera event för alla tjejer i medietekniksektionen."
                },
                {
                    title: "Mottagningskommittén för tekniskt basår (09/10)",
                    type: "meriter",
                    date: "3",
                    img: ["App/Modules/Portfolio/Education/Content/torsten.jpg"],
                    shortTitle: "Mottagningskommittén",
                    underTitle: "Övriga meriter",
                    x: 550,
                    y: 80,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/torsten.png",
                    description: "Deltog i mottagningskommittén för tekniskt basår i Norrköping. Anordnade olika event under hela introduktionstiden samt en avslutande sittning. Gruppen deltogäven i mottagningen för alla studenter på tekniska fakulteten som faddrar och skurkerister."
                },
                {
                    title: "Norrlands Nation, Vargtass (09/10)",
                    type: "meriter",
                    date: "3",
                    img: ["App/Modules/Portfolio/Education/Content/affisch2.jpg", "App/Modules/Portfolio/Education/Content/502738.jpg", "App/Modules/Portfolio/Education/Content/underbart.jpg", "App/Modules/Portfolio/Education/Content/vargtassvanster.jpg", "App/Modules/Portfolio/Education/Content/vagtasshoger.jpg"],
                    shortTitle: "Vargtass",
                    underTitle: "Övriga meriter",
                    x: 480,
                    y: 60,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/vargtass.png",
                    description: "Styrelsemedlem, Informations- och tryckavnsarig. Deltog i arrangerandet av en  Åreresa (totalt 150 personer åkte med på resan) och andra event för universitetets största nation, Vargtass. Jag gjordeäven affischer, märke och flyers."
                },
                {
                    title: "Designuppdrag Sunset Sailors",
                    type: "meriter",
                    date: "5",
                    img: ["App/Modules/Portfolio/Education/Content/sun.jpg"],
                    shortTitle: "Designuppdrag",
                    underTitle: "Övriga meriter",
                    x: 942,
                    y: 90,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/sunset.png",
                    description: "Skapade grafiska profilen till bandet Sunset Sailors."
                },
                {
                    title: "Revisor för Norrlands Nation, Vargtass",
                    type: "meriter",
                    date: "4",
                    img: ["App/Modules/Portfolio/Education/Content/vagtass.png"],
                    shortTitle: "Vargtass",
                    underTitle: "Övriga meriter",
                    x: 480,
                    y: 60,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/vargtass.png",
                    description: "Revisor för styrelsen 2010-2011."
                },
                {
                    title: "IT-supportansvarig, extrajobb på Twingly",
                    type: "meriter",
                    date: "5",
                    img: ["App/Modules/Portfolio/Education/Content/twingly-logotype21.png"],
                    shortTitle: "Twingly",
                    underTitle: "Övriga meriter",
                    x: 480,
                    y: 60,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/vargtass.png",
                    description: "Extrajobb på Twingly AB i Linköping. Hade ansvar för IT-supporten knuten både till Bloggportalen.se och Twinglys bloggindexeringsverktyg. Detta innebar både support för Twinglys kunder (där ibland Aftonbladet, Adlibris och DN samt olika bloggbevakningsföretag) men även nära kontakt och support med bloggarna. </br></br> Arbetetsuppgifterna bestod oftast av att felsöka pingprocessen (då blogginlägg indexeras), se över bloggarnas RSS-flöden, åtgärda spamrapportering och hjälpa till med bloggarnas användarprofiler på Bloggportalen."
                },
                {
                    title: "Bildbehandling och bildanalys (Matlab)",
                    type: "kurser",
                    date: "3",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    shortTitle: "Bildbehandling",
                    x: 720,
                    y: 0,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Kursens syfte är att ge en teoretisk och praktisk grund för datoriserad bearbetning och analys av digitala bilder."
                },
                {
                    title: "Modelleringsprojekt (Matlab, Simulink)",
                    type: "kurser",
                    date: "3",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    shortTitle: "Modelleringsprojekt",
                    x: 620,
                    y: 0,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "En dynamisk modell ska skapas för ett utvalt projektobjekt. Genom simulering med hjälp av modellen ska objektet studeras dynamiskt. Rapportskrivning och muntlig presentation på svenska."
                },
                {
                    title: "Kommunikation och användargränssnitt (Java)",
                    type: "kurser",
                    date: "2",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    shortTitle: "Användargräsnitt",
                    x: 500,
                    y: 10,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Kursen syftar till att ge studenterna grundläggande kännedom om kognitiva processer och interatkiva datorsystem samt kunskaper om principer, metoder och verktyg för att utveckla datorsystem anpassade till användaren. "
                },
                {
                    title: "Vetenskaplig visualisering (C++, Python)",
                    type: "kurser",
                    date: "4",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Vetenskaplig visualisering",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 810,
                    y: 40,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Kursen syftar till att ge fördjupade insikter i metoder för visualisering av vetenskapliga data från experiment och beräkningar samt genom programmeringsövningar belysa dessa metoders möjligheter och begränsningar. "
                },
                {
                    title: "VR-teknik (C++)",
                    type: "kurser",
                    date: "4",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "VR-teknik",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 657,
                    y: 10,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Målet med kursen är att studenterna skall få insikt i vad VR är, hur det används och hur det kan implementeras och utnyttjas. De skalläven lära sig analysera behov och utmaningar, och lära sig att tillämpa teorier och principer för att realisera effektiva VR-gränssnitt och -interaktion. "
                },
                {
                    title: "Databaser (mySQL)",
                    type: "kurser",
                    date: "2",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Databaser",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 245,
                    y: 0,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Grunderna inom databaser. Databasdesign och SQL-programering."
                },
                {
                    title: "Grafisk teknik (Matlab)",
                    type: "kurser",
                    date: "2",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Grafisk teknik",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 110,
                    y: 0,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Informationsteknikens användning vid bildåtergivning och framställning av trycksaker."
                },
                {
                    title: "Elektronisk publicering (Html, css, php)",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Elektronisk publicering",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 57,
                    y: 20,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Fokus på tekniker för innehållsutformning inom elektronisk publicering. Grundläggande märkspråk för innehållsutformning. Introduktion till klient-servermodellen och skriptspråk. Introduktion till layout och form inom elektronisk publicering, exempelvis formatmallar."
                },
                {
                    title: "Kompression av ljud och bild (Matlab)",
                    type: "kurser",
                    date: "3",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Kompression",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 770,
                    y: 0,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Kursen ska ge kunskap om metoder för komprimering av data, samt hur dessa metoder tillämpas på ljud- och bildsignaler."
                },
                {
                    title: "Medierätt",
                    type: "kurser",
                    date: "4",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Medierätt",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 960,
                    y: 40,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Kursen syftar till att den studerande skall tillägna sig goda kunskaper om immaterialrätt, varmed olika former av resultatet av intellektuellt skapande avses. Kursen syftar därmed till att den studerande skall erhålla goda kunskaper om vad som krävs för att lagligt skyddad ensamrätt skall uppnås/föreligga samt att studenten skapar sig förståelse för immaterialrättsliga reglers roll i en marknadsekonomi. Den studerande skalläven förvärva god förmåga att identifiera, analysera och lösa praktiskt inriktade problemställningar inom de angivna rättsområdena."
                },
                {
                    title: "Projektledning",
                    type: "kurser",
                    date: "4",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Projektledning",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 900,
                    y: 20,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Ledarskap i projekt. Projekt och organisation. Projektgruppens utveckling. Gruppnormer & grupproller i projekt. Konflikthantering. Motivation & drivkrafter. "
                },
                {
                    title: "Datorgrafik",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Datorgrafik",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 190,
                    y: 0,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "2D-grafik: pixelgrafik kontra objektgrafik, primitiver, parametriska och implicita kurvor, transformationer, rendering. Grafikprogrammering i 2D. 3D-grafik: objekt, polygoner, kort om parametriska och implicita ytor, transformationer, projektion, perspektiv, gömda ytor, lokala ljusmodeller. Enklare grafikprogrammering i 3D."
                },
                {
                    title: "Videoproduktion",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Videoproduktion",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 0,
                    y: 20,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Efter fullgjord kurs ska kursdeltagaren ha fått en inledande kunskap inom medieområdet. Inom ett område, som studenten själv väljer, erhålls en mer fördjupad kunskap. Efter kursen skall studenten vara bekant med en projektmodell som hjälpmedel och kunna grunderna i enklare rapportskrivning. Vidare skall studenten ha stiftat bekantskap med frågeställningar som rör informationssökning, etik, samt fusk och plagiat."
                },
                {
                    title: "Designmönster (Java)",
                    type: "kurser",
                    date: "4",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Designmönster",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 700,
                    y: 20,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Efter kursen ska studenten kunna använda designmönster, det vill säga, utföra lösningar för standardproblem i objektorienterad programvaruutvekling. Studenten skaäven kunna använda programvaruevolutionsmetodik så som refactoring samt beskriva de implementationsmönster (idiom) som kan finnas i ett programspråk."
                },
                {
                    title: "Ljudteknik I (Matlab)",
                    type: "kurser",
                    date: "3",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "Ljudteknik",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 730,
                    y: 50,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Grundläggande beskrivning av ljudvågor och fysikaliska fenomen relaterade till dessa. Ljudutberedning och rumsakustik. Psykoakustik: människans uppfattning av ljud. Egenskaper hos några olika ljudalstrare. Ljudmätteknik och elektroniska kretsar relaterade till ljud. Introduktion till digitalt ljud, olika digitala ljudformat och signalbehandling. Grunderna i ljudupptagning och ljudbearbetning."
                },
                {
                    title: "Datamodeller för kognitiva processer (Lisp)",
                    type: "kurser",
                    date: "3",
                    "underTitle": "Kurs: Medieteknikinriktad",
                    shortTitle: "AI",
                    img: ["App/Modules/Portfolio/Education/Content/mt_thumb.png"],
                    x: 850,
                    y: 10,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/mt.png",
                    description: "Grunder, tekniker och begrepp inom AI-programering."
                },
                {
                    title: "Programkotruktion (Ada)",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Programering",
                    shortTitle: "Programkotruktion",
                    img: ["App/Modules/Portfolio/Education/Content/computer_icon.png"],
                    x: 30,
                    y: 200,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/computer_icon.png",
                    description: "Kursen skall ge grundläggande kunskaper om hur man konstruerar program i ett högnivåspråk, ada."
                },
                {
                    title: "Objektorienterad programmering (Java)",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Programering",
                    shortTitle: "Java",
                    img: ["App/Modules/Portfolio/Education/Content/computer_icon.png"],
                    x: 155,
                    y: 250,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/computer_icon.png",
                    description: "Kursen ska ge kunskaper om objektorienterad programutveckling och programmering i ett objektorienterat programspråk, Java."
                },
                {
                    title: "C# och .net",
                    type: "kurser",
                    date: "5",
                    "underTitle": "Kurs: Programering",
                    shortTitle: "C# ",
                    img: ["App/Modules/Portfolio/Education/Content/computer_icon.png"],
                    x: 1100,
                    y: 240,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/computer_icon.png",
                    description: "Kursens målär att ge en bra försåelse och grund inom C#/.net."
                },
                {
                    title: "Programmering i C++",
                    type: "kurser",
                    date: "2",
                    "underTitle": "Kurs: Programering",
                    shortTitle: "C++ ",
                    img: ["App/Modules/Portfolio/Education/Content/computer_icon.png"],
                    x: 510,
                    y: 250,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/computer_icon.png",
                    description: "Kursens syfteär att ge kunskaper i att använda programspråket C++ för att utveckla program. "
                },
                {
                    title: "Matematisk grundkurs",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Matematik",
                    shortTitle: "Matematisk grundkurs",
                    img: ["App/Modules/Portfolio/Education/Content/matte.png"],
                    x: 80,
                    y: 200,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/thumb.png",
                    description: "Kursen syftar till att bidra till en positiv start på universitetsstudierna, både då det gäller en social tillhörighet samt att få en repetition av matematik från tidigare studier. Dessutom skall några matematiska begrepp, som för mångaär nya, introduceras."
                },
                {
                    title: "Linjär algebra",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Matematik",
                    shortTitle: "Linjär algebra",
                    img: ["App/Modules/Portfolio/Education/Content/matte.png"],
                    x: 90,
                    y: 250,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/thumb.png",
                    description: "Att ge sammanhållen begreppsram för geometrisk och algebraisk teknik med tillämpningar inom analys, datorgrafik, elektroteknik, reglerteknik, linjär optimering m fl.ämnen. Vidare ingår att utveckla förmågan att använda det matematiska språket, skriftligt och muntligt."
                },
                {
                    title: "Analys I",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Matematik",
                    shortTitle: "Analys I",
                    img: ["App/Modules/Portfolio/Education/Content/matte.png"],
                    x: 220,
                    y: 240,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/thumb.png",
                    description: "Att du som student skall tillägna dig den förtrogenhet med matematiska begrepp, resonemang och samband som ryms inom envariabelsanalys samt den färdighet i kalkyl och problemlösning som behövs för de fortsatta studierna."
                },
                {
                    title: "Analys II",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Matematik",
                    shortTitle: "Analys II",
                    img: ["App/Modules/Portfolio/Education/Content/matte.png"],
                    x: 260,
                    y: 210,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/thumb.png",
                    description: "Att du som student skall tillägna dig den förtrogenhet med matematiska begrepp, resonemang och samband som ryms inom envariabelsanalys samt den färdighet i kalkyl och problemlösning som behövs för de fortsatta studierna. "
                },
                {
                    title: "Analys III",
                    type: "kurser",
                    date: "2",
                    "underTitle": "Kurs: Matematik",
                    shortTitle: "Analys III",
                    img: ["App/Modules/Portfolio/Education/Content/matte.png"],
                    x: 350,
                    y: 240,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/thumb.png",
                    description: "Kursen bygger på kursen i Analys I-II. Följaktligenär målen likartade: att ge de studerande förståelse för matematiska begrepp och förtrogenhet med matematiska metoder för funktioner av flera variabler som uppstår i alla grenar av fysik och teknik."
                },
                {
                    title: "Vektoranalys",
                    type: "kurser",
                    date: "2",
                    "underTitle": "Kurs: Matematik",
                    shortTitle: "Vektoranalys",
                    img: ["App/Modules/Portfolio/Education/Content/matte.png"],
                    x: 380,
                    y: 180,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/thumb.png",
                    description: "Kursen bygger på kursen i flervariabelanalys. Följaktligenär målen likartade: att ge de studerande förståelse för matematiska begrepp och förtrogenhet med matematiska metoder för vektorfält som uppstår i alla grenar av fysik och teknik."
                },
                {
                    title: "Matematisk statistik",
                    type: "kurser",
                    date: "3",
                    "underTitle": "Kurs: Matematik",
                    shortTitle: "Matematisk statistik",
                    img: ["App/Modules/Portfolio/Education/Content/matte.png"],
                    x: 450,
                    y: 200,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/thumb.png",
                    description: "Kursen avser att lära den studerande förstå och utnyttja grundläggande sannolikhetslära och statistik, dvs teorin för försök som påverkas av slumpmässiga faktorer. Kursen inriktas speciellt på sådana grundläggande kunskaper som krävs för tillämpningar inom teknik, ekonomi och naturvetenskap."
                },
                {
                    title: "Tillämpad Transformteori",
                    type: "kurser",
                    date: "2",
                    "underTitle": "Kurs: Matematik",
                    shortTitle: "Transformteori",
                    img: ["App/Modules/Portfolio/Education/Content/matte.png"],
                    x: 410,
                    y: 220,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/thumb.png",
                    description: "Kursen skall ge de matematiska grunderna för de transformmetoder som används i kretsteori, reglerteori, signaler och system, bildbehandling och produktionsekonomi. "
                },
                {
                    title: "Signaler och system",
                    type: "kurser",
                    date: "2",
                    "underTitle": "Kurs: Civilingenjörsinriktad",
                    shortTitle: "Signaler och system",
                    img: ["App/Modules/Portfolio/Education/Content/ciin.png"],
                    x: 650,
                    y: 250,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/ciin.png",
                    description: "Grundläggande signaler och deras egenskaper, LTI-system, Fouriertransformen och frekvensanalys, Samplingsvillkor och tidsdiskreta signaler, Laplacetransformen och systemanalys, Z-transformen för samplade signaler och system, Digitala filter, Adaptiva filter."
                },
                {
                    title: "Modellbygge och simulering",
                    type: "kurser",
                    date: "3",
                    "underTitle": "Kurs: Civilingenjörsinriktad",
                    shortTitle: "Simulering",
                    img: ["App/Modules/Portfolio/Education/Content/ciin.png"],
                    x: 700,
                    y: 250,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/ciin.png",
                    description: "Kursen skall ge kunskaper om metoder och principer att bygga matematiska modeller för dynamiska system (dvs system som beskrivs med hjälp av differential och/eller differensekvationer). Kursen skall också ge kunskaper om hur modellernas egenskaper studeras genom simulering."
                },
                {
                    title: "Reglerteknik",
                    type: "kurser",
                    date: "3",
                    "underTitle": "Kurs: Civilingenjörsinriktad",
                    shortTitle: "Reglerteknik",
                    img: ["App/Modules/Portfolio/Education/Content/ciin.png"],
                    x: 570,
                    y: 230,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/ciin.png",
                    description: "Kursen skall ge förståelse för dynamiska system och kunskaper om grundläggande metoder för att analysera och dimensionera återkopplade reglersystem."
                },
                {
                    title: "Industriell ekonomi",
                    type: "kurser",
                    date: "5",
                    "underTitle": "Kurs: Civilingenjörsinriktad",
                    shortTitle: "Industriell ekonomi",
                    img: ["App/Modules/Portfolio/Education/Content/ciin.png"],
                    x: 1180,
                    y: 220,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/ciin.png",
                    description: "Kursen avser att ge de studerande en orientering i de sammanhang företag verkar."
                },
                {
                    title: "Retorik",
                    type: "kurser",
                    date: "5",
                    underTitle: "Kurs: Civilingenjörsinriktad",
                    shortTitle: "Retorik",
                    img: ["App/Modules/Portfolio/Education/Content/ciin.png"],
                    x: 1250,
                    y: 250,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/ciin.png",
                    description: "Föreläsningar i retorikens teori och retorisk analys, med aktuella exempel. Seminarier kring retorikens genrer och dess klassiska och moderna uttrycksformer. Den studerande genomför egna presentationer, analyser samt skriver texter där retorikens olika grepp och stilmedel används."
                },
                {
                    title: "Tillämpad matematik i teknik och naturvetenskap",
                    type: "kurser",
                    date: "1",
                    "underTitle": "Kurs: Civilingenjörsinriktad",
                    shortTitle: "Matlab info",
                    img: ["App/Modules/Portfolio/Education/Content/ciin.png"],
                    x: 340,
                    y: 250,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/ciin.png",
                    description: "Kursen avser att utgöra en brygga mellan de grundläggande matematikkurserna och kurser inom teknik och naturvetenskap. Genom att använda beräkningshjälpmedel som Matlab kan mer realistiska problem studeras och studenterna skall vänja sig vid att naturligt använda det språk som matematikstudierna ger dem för att tala om tillämpade problemställningar."
                },
                {
                    title: "Mekanik- och vågfysik",
                    type: "kurser",
                    date: "2",
                    "underTitle": "Kurs: Civilingenjörsinriktad",
                    shortTitle: "Fysik",
                    img: ["App/Modules/Portfolio/Education/Content/ciin.png"],
                    x: 300,
                    y: 250,
                    thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/ciin.png",
                    description: "Kursen skall ge grundläggande kunskaper inom några centrala delar av den klassiska fysiken samt kännedom om viktiga tillämpningar. Laborationsdelen skall ge erfarenhet av att planera,utföra och redovisa experiment. "
                }
            ];
            return data;
        };
        PortfolioController.factory = function () {
            var controller = function ($scope, $timeout) {
                return new PortfolioController($scope, $timeout);
            };
            controller['$inject'] = ['$scope', '$timeout'];
            return controller;
        };
        return PortfolioController;
    })();
    TinasApp.PortfolioController = PortfolioController;
})(TinasApp || (TinasApp = {}));
var TinasApp;
(function (TinasApp) {
    'use strict';
    var SocialDirective = (function (_super) {
        __extends(SocialDirective, _super);
        function SocialDirective($http) {
            _super.call(this);
            this.$http = $http;
            this.scope = {};
            this.restrict = 'E';
            this.templateUrl = '/App/Modules/Social/Templates/SocialTemplate.html';
        }
        SocialDirective.prototype.initialize = function (scope, element, attributes) {
            var _this = this;
            var getting = false;
            scope.getDate = function (date) { return _this.getDate(date); };
            scope.setSelectedImage = function (img) { return _this.setSelectedImage(img, scope); };
            this.months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
            this.getData('https://api.instagram.com/v1/users/33200675/media/recent/?access_token=33200675.054f33d.4d1b7684b9e8404eac2ad2f309d2c77d&count=20', function (d) {
                scope.instaImages = d.data;
                _this.next_url = d.pagination.next_url;
                scope.$apply();
            });
            $(window).on('scroll', function () {
                if ($(window).scrollTop() + $(window).height() > $(".ngview").height() - 5) {
                    if (!getting) {
                        getting = true;
                        _this.getData(_this.next_url, function (d) {
                            getting = false;
                            scope.instaImages = scope.instaImages.concat(d.data);
                            _this.next_url = d.pagination.next_url;
                            scope.$apply();
                        });
                    }
                }
            });
        };
        SocialDirective.prototype.getDate = function (date) {
            var newDate = new Date(parseInt(date) * 1000);
            return newDate.getDate() + " " + this.months[newDate.getMonth()] + " " + newDate.getFullYear();
        };
        SocialDirective.prototype.setSelectedImage = function (imgId, scope) {
            scope.selectedImageId = (imgId != scope.selectedImageId) ? imgId : null;
        };
        SocialDirective.prototype.getData = function (url, callback) {
            var accessToken = '054f33dac6504612a2c40581c0fa2daf';
            $.ajax({
                url: url,
                dataType: 'jsonp',
                type: 'GET',
                data: { client_id: accessToken },
                success: function (data) {
                    if (callback)
                        callback(data);
                },
                error: function (data) {
                    console.log("error");
                    console.log(data);
                }
            });
        };
        SocialDirective.prototype.instastart = function (array, scope) {
            console.log(array);
            scope.instaImages = angular.copy(array);
        };
        return SocialDirective;
    })(TinasApp.BaseDirective);
    TinasApp.SocialDirective = SocialDirective;
})(TinasApp || (TinasApp = {}));
/// <reference path="modules/background/backgrounddirective.ts" />
/// <reference path="modules/creative/scripts/clothesdirective.ts" />
/// <reference path="modules/creative/recept/scripts/receptdirective.ts" />
/// <reference path="modules/header/scripts/headerdirective.ts" />
/// <reference path="modules/portfolio/careerlog/scripts/careerlogdirective.ts" />
/// <reference path="modules/portfolio/education/scripts/portfoliocontroller.ts" />
/// <reference path="modules/social/scripts/socialdirective.ts" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var Directives = (function () {
        function Directives() {
        }
        Directives.Header = function () {
            return new TinasApp.HeaderDirective();
        };
        Directives.Background = function ($timeout) {
            return new TinasApp.BackgroundDirective($timeout);
        };
        Directives.Clothes = function () {
            return new TinasApp.ClothesDirective();
        };
        Directives.Social = function ($http) {
            return new TinasApp.SocialDirective($http);
        };
        Directives.CareerLog = function ($http) {
            return new TinasApp.CareerLogDirective($http);
        };
        Directives.Recept = function () {
            return new TinasApp.ReceptDirective();
        };
        Directives.Courses = function ($q) {
            return new TinasApp.CoursesDirective($q);
        };
        Directives.ImageCarousel = function () {
            return new TinasApp.ImageCarouselDirective();
        };
        return Directives;
    })();
    var app = angular.module('TinasApp', ['ngRoute', 'ngCVGame', 'Education', 'ngSanitize']);
    //var app = angular.module('AreAdmin', ['ngAnimate', 'angularSpinner']);  
    app.controller("MainController", ["$scope", "$location", TinasApp.MainController]).directive("header", Directives.Header).directive("background", Directives.Background).directive("social", Directives.Social).directive("careerLog", Directives.CareerLog).directive("receptList", Directives.Recept).directive("clothes", Directives.Clothes).directive("courses", Directives.Courses).directive("imageCarousel", Directives.ImageCarousel);
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {}).when('/Hej', {
            templateUrl: 'App/Modules/Hej/Templates/Hej.html'
        }).when('/Creative/Clothes', {
            templateUrl: 'App/Modules/Creative/Templates/Creative.html'
        }).when('/Creative/Recept', {
            templateUrl: 'App/Modules/Creative/Recept/Recept.html'
        }).when('/Portfolio/CV', {
            templateUrl: 'App/Modules/Portfolio/Templates/Portfolio.html'
        }).when('/Portfolio/Education', {
            templateUrl: 'App/Modules/Portfolio/Education/Templates/Education.html',
            controller: TinasApp.PortfolioController.factory()
        }).when('/Portfolio/CareerLog', {
            templateUrl: 'App/Modules/Portfolio/CareerLog/Templates/CareerLog.html'
        }).when('/Social', {
            templateUrl: 'App/Modules/Social/Templates/Social.html'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    });
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var MainController = (function () {
        function MainController($scope, $location) {
            var _this = this;
            this.$location = $location;
            TinasApp.Mediator.subscribe(TinasApp.SetSelectedView, function (message) { return _this.onSetSelectedView(message, $scope); });
            $scope.$watch(function () {
                return $location.path();
            }, function () {
                $scope.selectedView = $location.path().substring(1, $location.path().length);
            });
        }
        MainController.prototype.onSetSelectedView = function (message, scope) {
            this.$location.path(message.view);
        };
        return MainController;
    })();
    TinasApp.MainController = MainController;
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var BaseDirective = (function () {
        function BaseDirective(restrict) {
            var _this = this;
            if (restrict === void 0) { restrict = ''; }
            this.link = function (scope, element, attributes) { return _this.initialize(scope, element, attributes); };
            this.restrict = restrict;
        }
        BaseDirective.prototype.initialize = function (scope, element, attributes) {
        };
        return BaseDirective;
    })();
    TinasApp.BaseDirective = BaseDirective;
})(TinasApp || (TinasApp = {}));
var TinasApp;
(function (TinasApp) {
    'use strict';
    var Mediator = (function () {
        function Mediator() {
        }
        //////////////////////////////////////////////////////////////////////
        // Subscribe to a topic, supply a callback to be executed
        // when that topic is broadcast to
        //////////////////////////////////////////////////////////////////////
        Mediator.subscribe = function (message, fn) {
            var name = TinasApp.Type.getName(message);
            if (!this.messages[name]) {
                this.messages[name] = new Array();
            }
            this.messages[name].push(fn);
        };
        //////////////////////////////////////////////////////////////////////
        // Publish/broadcast an event to the rest of the application
        //////////////////////////////////////////////////////////////////////
        Mediator.publish = function (instance) {
            var name = TinasApp.Type.getName(instance.constructor);
            if (!this.messages[name]) {
                return false;
            }
            _.forEach(this.messages[name], function (iterator) { return iterator(instance); });
        };
        //////////////////////////////////////////////////////////////////////
        // Storage for topics that can be broadcast or listened to
        //////////////////////////////////////////////////////////////////////
        Mediator.messages = {};
        return Mediator;
    })();
    TinasApp.Mediator = Mediator;
})(TinasApp || (TinasApp = {}));
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var Type = (function () {
        function Type() {
        }
        Type.getName = function (ent) {
            if (typeof ent == "string")
                return ent;
            if (ent.constructor && ent.constructor.name != "Function") {
                return ent.constructor.name || (ent.toString().match(/function (.+?)\(/) || [, ''])[1];
            }
            else {
                return ent.name;
            }
        };
        return Type;
    })();
    TinasApp.Type = Type;
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var RefreshSkrollr = (function () {
        function RefreshSkrollr() {
        }
        return RefreshSkrollr;
    })();
    TinasApp.RefreshSkrollr = RefreshSkrollr;
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var SetSelectedView = (function () {
        function SetSelectedView(view) {
            this.view = view;
        }
        return SetSelectedView;
    })();
    TinasApp.SetSelectedView = SetSelectedView;
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var CoursesDirective = (function (_super) {
        __extends(CoursesDirective, _super);
        function CoursesDirective($q) {
            _super.call(this);
            this.$q = $q;
            this.scope = {};
            this.restrict = 'E';
            this.templateUrl = 'App/Modules/Portfolio/Education/Directives/Courses/Courses.html';
        }
        CoursesDirective.prototype.initialize = function ($scope, element, attributes) {
            this.getData().then(function (d) {
                $scope.courseData = d;
                console.log("data gotten");
                var msg = new TinasApp.RefreshSkrollr();
                TinasApp.Mediator.publish(msg);
            });
        };
        CoursesDirective.prototype.getData = function () {
            var deferred = this.$q.defer();
            var data = [
                {
                    title: "Bildbehandling och bildanalys(Matlab)",
                    description: "Kursens syfte är att ge en teoretisk och praktisk grund för datoriserad bearbetning och analys av digitala bilder."
                },
                {
                    title: "Modelleringsprojekt",
                    description: "En dynamisk modell ska skapas för ett utvalt projektobjekt. Genom simulering med hjälp av modellen ska objektet studeras dynamiskt. Rapportskrivning och muntlig presentation på svenska."
                },
                {
                    title: "Kommunikation och användargräsnitt(Java)",
                    description: "Kursen syftar till att ge studenterna grundläggande kännedom om kognitiva processer och interatkiva datorsystem samt kunskaper om principer, metoder och verktyg för att utveckla datorsystem anpassade till användaren. "
                },
                {
                    title: "Vetenskaplig visualisering(C++, Python)",
                    description: "Kursen syftar till att ge fördjupade insikter i metoder för visualisering av vetenskapliga data från experiment och beräkningar samt genom programmeringsövningar belysa dessa metoders möjligheter och begränsningar. "
                },
                {
                    title: "Modelleringsprojekt(Matlab, Simulink)",
                    description: ""
                },
                {
                    title: "VR-teknik",
                    description: "Målet med kursenär att studenterna skall få insikt i vad VRär, hur det används och hur det kan implementeras och utnyttjas. De skalläven lära sig analysera behov och utmaningar, och lära sig att tillämpa teorier och principer för att realisera effektiva VR-gränssnitt och -interaktion. "
                },
                {
                    title: "Databaser(mySQL)",
                    description: "Grunderna inom databaser. Databasdesign och SQL-programering."
                },
                {
                    title: "Grafisk teknik(Matlab)",
                    description: "Informationsteknikens användning vid bildåtergivning och framställning av trycksaker."
                },
                {
                    title: "Elektronisk publicering(Html,css,php)",
                    description: "Fokus på tekniker för innehållsutformning inom elektronisk publicering. Grundläggande märkspråk för innehållsutformning. Introduktion till klient-servermodellen och skriptspråk. Introduktion till layout och form inom elektronisk publicering, exempelvis formatmallar."
                },
                {
                    title: "Kompression av ljud och bild(Matlab)",
                    description: "Kursen ska ge kunskap om metoder för komprimering av data, samt hur dessa metoder tillämpas på ljud- och bildsignaler."
                },
                {
                    title: "Medierätt",
                    description: "Kursen syftar till att den studerande skall tillägna sig goda kunskaper om immaterialrätt, varmed olika former av resultatet av intellektuellt skapande avses. Kursen syftar därmed till att den studerande skall erhålla goda kunskaper om vad som krävs för att lagligt skyddad ensamrätt skall uppnås/föreligga samt att studenten skapar sig förståelse för immaterialrättsliga reglers roll i en marknadsekonomi. Den studerande skalläven förvärva god förmåga att identifiera, analysera och lösa praktiskt inriktade problemställningar inom de angivna rättsområdena."
                },
                {
                    title: "Projektledning",
                    description: "Ledarskap i projekt. Projekt och organisation. Projektgruppens utveckling. Gruppnormer & grupproller i projekt. Konflikthantering. Motivation & drivkrafter. "
                },
                {
                    title: "Datorgrafik",
                    description: "2D-grafik: pixelgrafik kontra objektgrafik, primitiver, parametriska och implicita kurvor, transformationer, rendering. Grafikprogrammering i 2D. 3D-grafik: objekt, polygoner, kort om parametriska och implicita ytor, transformationer, projektion, perspektiv, gömda ytor, lokala ljusmodeller. Enklare grafikprogrammering i 3D."
                },
                {
                    title: "Videoproduktion",
                    description: "Efter fullgjord kurs ska kursdeltagaren ha fått en inledande kunskap inom medieområdet. Inom ett område, som studenten själv väljer, erhålls en mer fördjupad kunskap. Efter kursen skall studenten vara bekant med en projektmodell som hjälpmedel och kunna grunderna i enklare rapportskrivning. Vidare skall studenten ha stiftat bekantskap med frågeställningar som rör informationssökning, etik, samt fusk och plagiat."
                },
                {
                    title: "Designmönster",
                    description: "Efter kursen ska studenten kunna använda designmönster, det vill säga, utföra lösningar för standardproblem i objektorienterad programvaruutvekling. Studenten skaäven kunna använda programvaruevolutionsmetodik så som refactoring samt beskriva de implementationsmönster (idiom) som kan finnas i ett programspråk."
                },
                {
                    title: "Ljudteknik I(Matlab)",
                    description: "Grundläggande beskrivning av ljudvågor och fysikaliska fenomen relaterade till dessa. Ljudutberedning och rumsakustik. Psykoakustik: människans uppfattning av ljud. Egenskaper hos några olika ljudalstrare. Ljudmätteknik och elektroniska kretsar relaterade till ljud. Introduktion till digitalt ljud, olika digitala ljudformat och signalbehandling. Grunderna i ljudupptagning och ljudbearbetning."
                },
                {
                    title: "Datamodeller för kognitiva processer(Lisp)",
                    description: "Grunder, tekniker och begrepp inom AI-programering."
                },
                {
                    title: "Programkotruktion(Ada)",
                    description: "Kursen skall ge grundläggande kunskaper om hur man konstruerar program i ett högnivåspråk, ada."
                },
                {
                    title: "Objektorienterad programmering(Java)",
                    description: "Kursen ska ge kunskaper om objektorienterad programutveckling och programmering i ett objektorienterat programspråk, Java."
                },
                {
                    title: "C# och .net",
                    description: "Kursens målär att ge en bra försåelse och grund inom C#/.net."
                },
                {
                    title: "Programmering i C++",
                    description: "Kursens syfteär att ge kunskaper i att använda programspråket C++ för att utveckla program. "
                },
                {
                    title: "Matematisk grundkurs",
                    description: "Kursen syftar till att bidra till en positiv start på universitetsstudierna, både då det gäller en social tillhörighet samt att få en repetition av matematik från tidigare studier. Dessutom skall några matematiska begrepp, som för mångaär nya, introduceras."
                },
                {
                    title: "Linjär algebra",
                    description: "Att ge sammanhållen begreppsram för geometrisk och algebraisk teknik med tillämpningar inom analys, datorgrafik, elektroteknik, reglerteknik, linjär optimering m fl.ämnen. Vidare ingår att utveckla förmågan att använda det matematiska språket, skriftligt och muntligt."
                },
                {
                    title: "Analys I",
                    description: "Att du som student skall tillägna dig den förtrogenhet med matematiska begrepp, resonemang och samband som ryms inom envariabelsanalys samt den färdighet i kalkyl och problemlösning som behövs för de fortsatta studierna."
                },
                {
                    title: "Analys II",
                    description: "Att du som student skall tillägna dig den förtrogenhet med matematiska begrepp, resonemang och samband som ryms inom envariabelsanalys samt den färdighet i kalkyl och problemlösning som behövs för de fortsatta studierna. "
                },
                {
                    title: "Analys III",
                    description: "Kursen bygger på kursen i Analys I-II. Följaktligenär målen likartade: att ge de studerande förståelse för matematiska begrepp och förtrogenhet med matematiska metoder för funktioner av flera variabler som uppstår i alla grenar av fysik och teknik."
                },
                {
                    title: "Vektoranalys",
                    description: "Kursen bygger på kursen i flervariabelanalys. Följaktligenär målen likartade: att ge de studerande förståelse för matematiska begrepp och förtrogenhet med matematiska metoder för vektorfält som uppstår i alla grenar av fysik och teknik."
                },
                {
                    title: "Matematisk statistik",
                    description: "Kursen avser att lära den studerande förstå och utnyttja grundläggande sannolikhetslära och statistik, dvs teorin för försök som påverkas av slumpmässiga faktorer. Kursen inriktas speciellt på sådana grundläggande kunskaper som krävs för tillämpningar inom teknik, ekonomi och naturvetenskap."
                },
                {
                    title: "Tillämpad Transformteori",
                    description: "Kursen skall ge de matematiska grunderna för de transformmetoder som används i kretsteori, reglerteori, signaler och system, bildbehandling och produktionsekonomi. "
                },
                {
                    title: "Signaler och system",
                    description: "Grundläggande signaler och deras egenskaper, LTI-system, Fouriertransformen och frekvensanalys, Samplingsvillkor och tidsdiskreta signaler, Laplacetransformen och systemanalys, Z-transformen för samplade signaler och system, Digitala filter, Adaptiva filter."
                },
                {
                    title: "Modellbygge och simulering",
                    description: "Kursen skall ge kunskaper om metoder och principer att bygga matematiska modeller för dynamiska system (dvs system som beskrivs med hjälp av differential och/eller differensekvationer). Kursen skall också ge kunskaper om hur modellernas egenskaper studeras genom simulering."
                },
                {
                    title: "Reglerteknik",
                    description: "Kursen skall ge förståelse för dynamiska system och kunskaper om grundläggande metoder för att analysera och dimensionera återkopplade reglersystem."
                },
                {
                    title: "Industriell ekonomi",
                    description: "Kursen avser att ge de studerande en orientering i de sammanhang företag verkar."
                },
                {
                    title: "Retorik",
                    description: "Föreläsningar i retorikens teori och retorisk analys, med aktuella exempel. Seminarier kring retorikens genrer och dess klassiska och moderna uttrycksformer. Den studerande genomför egna presentationer, analyser samt skriver texter där retorikens olika grepp och stilmedel används."
                },
                {
                    title: "Tillämpad matematik i teknik och naturvetenskap",
                    description: "Kursen avser att utgöra en brygga mellan de grundläggande matematikkurserna och kurser inom teknik och naturvetenskap. Genom att använda beräkningshjälpmedel som Matlab kan mer realistiska problem studeras och studenterna skall vänja sig vid att naturligt använda det språk som matematikstudierna ger dem för att tala om tillämpade problemställningar."
                },
                {
                    title: "Mekanik- och vågfysik",
                    description: "Kursen skall ge grundläggande kunskaper inom några centrala delar av den klassiska fysiken samt kännedom om viktiga tillämpningar. Laborationsdelen skall ge erfarenhet av att planera,utföra och redovisa experiment. "
                }
            ];
            deferred.resolve(data);
            return deferred.promise;
        };
        return CoursesDirective;
    })(TinasApp.BaseDirective);
    TinasApp.CoursesDirective = CoursesDirective;
})(TinasApp || (TinasApp = {}));
/// <autosync enabled="true" />
var TinasApp;
(function (TinasApp) {
    'use strict';
    var ImageCarouselDirective = (function (_super) {
        __extends(ImageCarouselDirective, _super);
        function ImageCarouselDirective() {
            _super.call(this);
            this.scope = {
                images: '='
            };
            this.restrict = 'E';
            this.templateUrl = 'App/Modules/Portfolio/Education/Directives/ImageCarousel/ImageCarousel.html';
        }
        ImageCarouselDirective.prototype.initialize = function ($scope, element, attributes) {
            var _this = this;
            console.log("image carosuel");
            $scope.id = attributes.uniqId;
            $scope.previous = function () { return _this.previous($scope); };
            $scope.next = function () { return _this.next($scope); };
            $scope.selectedIndex = 0;
        };
        ImageCarouselDirective.prototype.previous = function ($scope) {
            $scope.selectedIndex--;
            console.log("previus");
        };
        ImageCarouselDirective.prototype.next = function ($scope) {
            $scope.selectedIndex++;
            console.log("next");
        };
        return ImageCarouselDirective;
    })(TinasApp.BaseDirective);
    TinasApp.ImageCarouselDirective = ImageCarouselDirective;
})(TinasApp || (TinasApp = {}));
//# sourceMappingURL=Application.js.map