
module TinasApp {
    'use strict';

    export interface IPortfolioControllerScope extends ng.IScope {
        goToView: (nr: number) => void;
        setSelectedCourse: (course: any) => void; 
        setSelectedProject: (project: any, index: number) => void; 
        setSelectedMerit: (project: any, index: number) => void; 
        separateProjects: () => void; 
        courseData: any;
        categories: string[];
        selectedCourse: any;
        projects: any;
        meriter: any;
        selectedProject: any;
        selectedMerit: any;
        expandIndex: number;
        columns: number;
    }

    export class PortfolioController {

        private scope: IPortfolioControllerScope;
        private pauseAtBeginning: number = 500;
        private keyframes: number[] = [0];
        private views;

        constructor($scope: IPortfolioControllerScope, private $timeout: ng.ITimeoutService) {
            Mediator.subscribe(RefreshSkrollr,(message) => this.onRefreshSkrollr());
            //När man lämnar denna vy
            $scope.$on('$destroy', function () { $("body").css({ "portfolio": "auto" }); });

            var data = this.getData();

            this.setCourseData(data, $scope);
            this.setProjectsData(data, $scope);
            this.setMeriterData(data, $scope);

            $scope.goToView = (nr: number) => { this.goToView(nr); }
            $scope.setSelectedCourse = (course: any) => { this.setSelectedCourse(course, $scope); }
            $scope.setSelectedProject = (project: any, index: number) => { this.setSelectedProject(project, index, $scope); }
            $scope.setSelectedMerit = (project: any, index: number) => { this.setSelectedMerit(project, index, $scope); }
            $scope.separateProjects = () => { this.separateProjects($scope); }

            //start
            $timeout(()=> {
                $timeout(() => {
                    this.initPortfolio();
                }, 0);
            }, 0);
        }

        private setMeriterData(data: any[], $scope: IPortfolioControllerScope) {
           
            var projs = _.filter(data,(d: any) => {
                return d.type == 'meriter';
            });

            $scope.meriter = [[], [], []];
            $scope.columns = ($(window).width() < 768) ? 2 : 4;
            var rows = Math.ceil(projs.length / $scope.columns);

            for (var i = 0; i < rows; i++) {
                $scope.meriter[i] = [];
                for (var j = 0; j < $scope.columns; j++) {
                    if (((i * $scope.columns) + j) < projs.length) {
                        $scope.meriter[i].push(projs[(i * $scope.columns) + j]);
                    }
                }
            }
        }

        private setProjectsData(data: any[], $scope: IPortfolioControllerScope) {
           
            var projs = _.filter(data,(d: any) => {
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
        }

        private setCourseData(data:any[], $scope:IPortfolioControllerScope) {
            $scope.categories = ['Medieteknikinriktade', 'Programmering', 'Matte', 'Civilingenjörsinriktad'];
            $scope.courseData = angular.copy($scope.categories);

            $scope.courseData[0] = _.filter(data,(d:any) => {
                return d.type == 'kurser' && d.underTitle == "Kurs: Medieteknikinriktad";
            });
            $scope.courseData[1] = _.filter(data,(d: any) => {
                return d.type == 'kurser' && d.underTitle == "Kurs: Programering";
            });
            $scope.courseData[2] = _.filter(data,(d: any) => {
                return d.type == 'kurser' && d.underTitle == "Kurs: Matematik";
            });
            $scope.courseData[3] = _.filter(data,(d: any) => {
                return d.type == 'kurser' && d.underTitle == "Kurs: Civilingenjörsinriktad";
            });
        }
       
        private onRefreshSkrollr() {
            this.removeAllDataDashAttributes();
            this.$timeout(() => {
                this.$timeout(() => {
                    this.initPortfolio();
                }, 0);
            }, 0);
        }

            /*********** privata funktioner ***********/
        private initPortfolio() {
            console.log("init portfolio");
                this.getKeyframes();
                this.animateViews();

                this.initSkrollr();
            }

            //lagrar start-tid för varje vy som finns i portfolion
            private getKeyframes() {

                this.views = angular.element(".view");
                var viewHeight;

                _.each(this.views, (view, index) =>{
                    console.log($(view).height());
                    if ($(view).height() < $(window).height()) {
                        viewHeight = $(window).height();
                    }
                    else {
                        viewHeight = $(view).height();
                    } 
                    var paus = ($(view).attr("snap-time")) ? parseInt($(view).attr("snap-time")) : this.pauseAtBeginning;
                    var delay = ($(view).attr("enter-delay")) ? parseInt($(view).attr("enter-delay")) : 0; 
                    var extra = ($(view).attr("extra-height")) ? parseInt($(view).attr("extra-height")) : 0; 
                   
                    //egna höjden + föregående vy start-tid + hur länge vyn ska ligga stilla i början
                    var nextViewKeyFrame = viewHeight + this.keyframes[index] + paus + extra;

                    this.keyframes.push(nextViewKeyFrame);

                });

                $(".portfolio").height(this.keyframes[(this.keyframes.length - 1)]);
            }

            private animateViews() {

                var windowHeight = $(window).height();
                
                _.each(this.views, (view, index) => {
                    var extra = ($(view).attr("extra-height")) ? parseInt($(view).attr("extra-height")) : 0; 
                    //värden som hämtas från html:en, finns det inga värden sätts transform:translateY
                    var beforeEnterCssClass = ($(view).attr("before-enter")) ? $(view).attr("before-enter") : "transform:translateY("+$(window).height()+"px);";
                    var afterEnterCssClass = ($(view).attr("after-enter")) ? $(view).attr("after-enter") : "transform:translateY(0%);";

                    var beforeLeaveCssClass = ($(view).attr("before-leave")) ? $(view).attr("before-leave") : "transform:translateY(0%);";
                    var afterLeaveCssClass = ($(view).attr("after-leave")) ? $(view).attr("after-leave") : "transform:translateY(-" + ($(view).height() + extra) +"px);";

                    var paus = ($(view).attr("snap-time")) ? parseInt($(view).attr("snap-time")) : this.pauseAtBeginning;
                    var delay = ($(view).attr("enter-delay")) ? parseInt($(view).attr("enter-delay")) : 0;
                    //vilken tid det ska ta att animera in och animera ut
                    //har den inte specificerats i html:en sätts den til 300
                    var enterDuration = ($(view).attr("enter-duration")) ? parseInt($(view).attr("enter-duration")) : 300;
                    var leaveDuration = ($(view).attr("leave-duration")) ? parseInt($(view).attr("leave-duration")) : 300;

                    //sätter på skrollr-klasser efter keyframesen
                    //init values 
                    $(view).attr("data-0", "top:0px;");

                    //animate in
                    $(view).attr("data-" + (this.keyframes[index] - enterDuration + delay), beforeEnterCssClass + "top:0px;");
                    $(view).attr("data-" + (this.keyframes[index] + delay), afterEnterCssClass + "top:0px;");
                    $(view).attr("data-" + (this.keyframes[index] + paus + delay), afterEnterCssClass + "top:0px;");

                    //animate out
                    //om vyn är större än fönsterhöjden så ska  man kunna skrolla i den
                    if ($(view).height() + extra > windowHeight) {
                        $(view).attr("data-" + (this.keyframes[(index + 1)] - leaveDuration), beforeLeaveCssClass + "top:" + (-($(view).height() + extra)) + "px;");
                    }
                    else {
                        $(view).attr("data-" + (this.keyframes[(index + 1)] - leaveDuration), beforeLeaveCssClass);
                    }

                    $(view).attr("data-" + (this.keyframes[(index + 1)]), afterLeaveCssClass);

                    //animerar h1-taggen
                    var intro = ($(view).attr("intro-time")) ? parseInt($(view).attr("intro-time")) : 0;
                    //in
                    $(view).find('h1').attr("data-" + (this.keyframes[index] - enterDuration + delay + intro), "opacity:0;margin-left:1000px;");
                    $(view).find('h1').attr("data-" + (this.keyframes[index] + delay + intro), "opacity:1;margin-left:0px;");
                    //ut

                    //animerar tillhörande meny-plupp, med samma tid-värden som själva vyn
                    this.animateMenuItem(index, $(view).attr("id"), enterDuration, leaveDuration);
                });

            }

            private animateMenuItem(index, itemId, enterDuration, leaveDuration) {

                $("#menu-" + itemId).attr("data-" + (this.keyframes[index] - (enterDuration)), "padding-left:5px;opacity:0.5;");
                $("#menu-" + itemId).attr("data-" + (this.keyframes[index]), "padding-left:25px;opacity:1;");

                //animate out
                $("#menu-" + itemId).attr("data-" + (this.keyframes[(index + 1)] - (leaveDuration)), "padding-left:25px;opacity:1;");
                $("#menu-" + itemId).attr("data-" + (this.keyframes[(index + 1)]), "padding-left:5px;opacity:0.5;");

            }

            private initSkrollr() {
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
                    (<any>skrollr.get()).refresh();
                }
            }

            private removeAllDataDashAttributes() {

                angular.forEach($(".view"),(elem) => { this.removeDataDashAttributesForOneElement(elem); });
                angular.forEach($(".menu-item"),(elem) => { this.removeDataDashAttributesForOneElement(elem); });

            }

            private removeDataDashAttributesForOneElement(elem) {

                $(elem).each(function () {
                    // get the native attributes object
                    var attrs = this.attributes;
                    var toRemove = [];
                    // cache the jquery object containing the element for better performance
                    var element = $(this);

                    // iterate the attributes
                    for (var attr in attrs) {
                        if (typeof attrs[attr] === 'object' &&
                            typeof attrs[attr].name === 'string' &&
                            (/^data-/).test(attrs[attr].name)) {
                            // Unfortunately, we can not call removeAttr directly in here, since it
                            // hurts the iteration.
                            toRemove.push(attrs[attr].name);
                        }
                    }

                    for (var i = 0; i < toRemove.length; i++) {
                        element.removeAttr(toRemove[i]);
                    }

                });
            }

            /*********** publika funktioner, $scope-funktioner ***********/
            private goToView(nr) {
                var delay = ($(this.views[nr]).attr("enter-delay")) ? parseInt($(this.views[nr]).attr("enter-delay")) : 0;
                var intro = ($(this.views[nr]).attr("intro-time")) ? parseInt($(this.views[nr]).attr("intro-time")) : 0;

                $('html,body').animate({
                    scrollTop: this.keyframes[nr] + delay + intro
                }, 1000);

            }

            private separateProjects($scope: IPortfolioControllerScope) {
                console.log($scope.projects);
                var arr = [[],[],[]];
                var columns = ($(window).width() < 768) ? 2 : 4;
                var rows = Math.floor($scope.projects.length / columns);
                for (var i = 0; i < rows; i++) {
                    
                    arr[i] = [];
                    for (var j = 0; j < columns; j++) {
                        arr[i].push($scope.projects[(i*4) + j]);
                    }
                    
                }
               
                return arr;
            }

            private setSelectedCourse(course: any,$scope:IPortfolioControllerScope) {
                $scope.selectedCourse = (!$scope.selectedCourse || course.title != $scope.selectedCourse.title) ? course : null;
            }

            private setSelectedProject(project, index: number, $scope: IPortfolioControllerScope) {
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
            }

            private setSelectedMerit(project, index: number, $scope: IPortfolioControllerScope) {
               
                $scope.selectedMerit = (!$scope.selectedMerit || project.title != $scope.selectedMerit.title) ? project : null;

                
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
            }

            private getData() {
            
                    var data = [
                        {
                            title: "Design",
                            type: "project",
                            date: "1",
                            img: ["App/Modules/Portfolio/Education/Content/bob.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/volksball.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/abob1.png",
                                "App/Modules/Portfolio/Education/Content/abob2.png",
                                "App/Modules/Portfolio/Education/Content/abob3.png",
                                "App/Modules/Portfolio/Education/Content/abob4.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/conceptArt1.png",
                                "App/Modules/Portfolio/Education/Content/conceptArt2.png",
                                "App/Modules/Portfolio/Education/Content/conceptArt3.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/bdb.png",
                                "App/Modules/Portfolio/Education/Content/bdb1.png",
                                "App/Modules/Portfolio/Education/Content/bdb2.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/peasInWar1.png",
                                "App/Modules/Portfolio/Education/Content/peasInWar2.png",
                                "App/Modules/Portfolio/Education/Content/peasInWar3.png",
                                "App/Modules/Portfolio/Education/Content/peasInWar4.png",
                                "App/Modules/Portfolio/Education/Content/peasInWar5.png",
                            "App/Modules/Portfolio/Education/Content/peasInWar6.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/infovis1.png",
                                "App/Modules/Portfolio/Education/Content/infovis2.png",
                                "App/Modules/Portfolio/Education/Content/infovis3.png",
                                "App/Modules/Portfolio/Education/Content/infovis4.png",
                                "App/Modules/Portfolio/Education/Content/infovis5.png",
                                "App/Modules/Portfolio/Education/Content/infovis6.png",
                                "App/Modules/Portfolio/Education/Content/infovis7.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/3d1.png", "App/Modules/Portfolio/Education/Content/3d.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/design.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/black1.png",
                                "App/Modules/Portfolio/Education/Content/black2.png",
                                "App/Modules/Portfolio/Education/Content/black3.png",
                                "App/Modules/Portfolio/Education/Content/black4.png",
                                "App/Modules/Portfolio/Education/Content/black5.png",
                                "App/Modules/Portfolio/Education/Content/black6.png",
                                "App/Modules/Portfolio/Education/Content/black7.png",
                                "App/Modules/Portfolio/Education/Content/black8.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/blog1.png",
                                "App/Modules/Portfolio/Education/Content/blog2.png",
                                "App/Modules/Portfolio/Education/Content/blog3.png",
                                "App/Modules/Portfolio/Education/Content/blog4.png",
                                "App/Modules/Portfolio/Education/Content/blog5.png",
                                "App/Modules/Portfolio/Education/Content/blog6.png",
                                "App/Modules/Portfolio/Education/Content/blog7.png",
                                "App/Modules/Portfolio/Education/Content/blog8.png",
                                "App/Modules/Portfolio/Education/Content/blog9.png",
                                "App/Modules/Portfolio/Education/Content/blog10.png"],
                            shortTitle: "Examensarbete",
                            underTitle: "Skolprojekt",
                            x: 1320,
                            y: 140,
                            thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/twingly.png",
                            description: "Jag fick i uppdrag av Twingly att skapa en webbaserad applikation för att visualisera bloggstatistik i relation till en specifik blogg. Programmet har som syfte att ge Bloggportalens användare feed-back över bloggens trafik och aktivitet och därmed öka engagemang och länkande hos bloggarna. <br /> <br /> I oktober 2013 belönades mitt arbete med Kaperos stipendium för Sveriges bästa exjobb inom medieteknik.",
                            rapportLink: "http://liu.diva-portal.org/smash/record.jsf?pid=diva2:623128",
                            demoLink: "/bloggportalen-stat/Main/main.html"
                        },
                        {
                            title: "Medietekniks PR-utskott",
                            type: "meriter",
                            date: "1",
                            img: ["App/Modules/Portfolio/Education/Content/MT.PNG"],
                            shortTitle: "PR-utskottet",
                            underTitle: "Övriga meriter",
                            x: 400,
                            y: 80,
                            thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/MT.PNG",
                            description: "Medlem. Hjälpte till i pr-arbetet för Medietekniksektionen bland annat med att informera om event samt att göra reklam för medietekniks sektionsmedlemmar."
                        },
                        {
                            title: "Civilingenjörerna i Norrköpings studentförening, 3Cant (08/09)",
                            type: "meriter",
                            date: "2",
                            img: ["App/Modules/Portfolio/Education/Content/3cant.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/MT.PNG",
                                "App/Modules/Portfolio/Education/Content/mt2.png",
                                "App/Modules/Portfolio/Education/Content/mt1.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/mette.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/skurk.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/vargtass.png",
                                "App/Modules/Portfolio/Education/Content/vargtass1.png",
                                "App/Modules/Portfolio/Education/Content/vargtass2.png",
                                "App/Modules/Portfolio/Education/Content/vargtass3.png",
                                "App/Modules/Portfolio/Education/Content/vargtass4.png"
                            ],
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
                            img: ["App/Modules/Portfolio/Education/Content/sunsetSailors.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/vargtass.png"],
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
                            img: ["App/Modules/Portfolio/Education/Content/twingly.png"],
                            shortTitle: "Twingly",
                            underTitle: "Övriga meriter",
                            x: 480,
                            y: 60,
                            thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/vargtass.png",
                            description: "Extrajobb på Twingly AB i Linköping. Hade ansvar för IT-supporten knuten både till Bloggportalen.se och Twinglys bloggindexeringsverktyg. Detta innebar både support för Twinglys kunder (där ibland Aftonbladet, Adlibris och DN samt olika bloggbevakningsföretag) men även nära kontakt och support med bloggarna. <br> <br> Arbetetsuppgifterna bestod oftast av att felsöka pingprocessen (då blogginlägg indexeras), se över bloggarnas RSS-flöden, åtgärda spamrapportering och hjälpa till med bloggarnas användarprofiler på Bloggportalen."
                        },
                        {
                            title: "Basketkarriären",
                            type: "meriter",
                            date: "5",
                            img: ["App/Modules/Portfolio/Education/Content/basket1.png", "App/Modules/Portfolio/Education/Content/basket3.png"],
                            shortTitle: "Basket",
                            underTitle: "Övriga meriter",
                            x: 480,
                            y: 60,
                            thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/vargtass.png",
                            description: "Jag började spela basket när jag var 9 år och när jag var 16 började jag spela på allsvensk nivå. Under min första tid på universitetet spelade jag i Norrköping Dolphins division1-lag. Även om jag aldrig var en betald spelare så är basketspelet en av mina viktigaste meriter och kanske det som format mig mest. Både i lagarbete, ledarskap, fysisk och psykisk träning men framför allt hur jag fungerar när jag misslyckas, hur jag värderar mig själv och mina egna prestationer och hur jag balanserar press från mig själv och andra."
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
                            thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/MT.PNG",
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
                            thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/MT.PNG",
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
                            thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/MT.PNG",
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
                            thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/MT.PNG",
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
                            thumbNail: "App/Modules/Portfolio/Education/Content/ThumbNails/MT.PNG",
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
        }
            
        

        public static factory() {
            var controller = (
                $scope: IPortfolioControllerScope,
                $timeout: ng.ITimeoutService) => {
                return new PortfolioController($scope, $timeout);
            }

            controller['$inject'] = ['$scope', '$timeout'];

            return controller;
        }

    }
} 
