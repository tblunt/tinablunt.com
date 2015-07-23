(function (angular) {

    'use strict';

    angular.module('ngCVGame', []);

    angular.module('ngCVGame')
        .directive('cvgame', ['$timeout', '$window', '$document', '$route', function ($timeout, $window, $document, $route) {
            return {
                restrict: 'AE',
                scope: {

                },
                transclude: true,
                template: '<canvas id="gameCanvas">Tyvärr ser du inte mitt coola CV-spel för att du har en alldeles för dåååålig browser.</canvas><div ng-show="showFinishedView"><h1 class="restartText">Hurra, du klarade det!</h1><a class="restart" ng-click="restart()">Börja om</a></div>',
                link: function (scope, element, attrs) {

                    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                    window.requestAnimationFrame = requestAnimationFrame;

                    scope.showFinishedView = false;
                    scope.restart = function () {
                        $route.reload();
                    }

                    $timeout(function () {
                        $timeout(function () {
                            var data = getCVData();
                            var coin = coins();
                            gameMotor(data, coin);

                            $(".fail").append("<h2>Välkommen till mitt CV-spel.</h2>");
                            var t = setTimeout(function () { $(".fail").children().remove(); }, 2000);

                            $("#gameCanvas").click(function (e) {
                                $(".clickinfo").children().remove();
                                $(".clickinfo").append("<h2>Du styr och hoppar med piltangenterna + space.</h2>");
                                var t = setTimeout(function () { $(".clickinfo").children().remove(); }, 2000);
                            });
                        }, 0);
                    }, 0);


                    function gameMotor(d, c) {

                        var canvas = document.getElementById("gameCanvas"),
                            ctx = canvas.getContext("2d"),
                            width = 1000,
                            height = 400,//$("#gameCanvas").height(),
                            banWidth = 5500,
                            player = {
                                x: width * 0.5,
                                y: height - 5,
                                pastY: height - 5,
                                width: 64,
                                height: 64,
                                regX: 32,
                                regY: 32,
                                speed: 3,
                                velX: 0,
                                velY: 0,
                                jumping: false,
                                stuck: false,
                                walking: false
                            },
                            bg = {
                                x: 0,
                                speed: 10,
                                velX: 0,
                                velY: 0,
                            },
                            keys = [],
                            friction = 0.8,
                            gravity = 0.3,
                            posArray = [[], []],
                            pastXPos,
                            krock = [0, 0, 0],
                                bitmap,
                                monster = false,
                                monsterY = 0,
                                    coinInds = [],
                                    tick,
                                        dates = getdates(),
                                        gubbeIsOn,
                                            krockBefore = [],
                                            yKol = 0;

                        canvas.width = width;
                        canvas.height = height;

                        var finishImg = new Image();
                        finishImg.src = "/App/Modules/Portfolio/CvGame/img/upright-finish-line-flag-hi.png";

                        var g = animateGubbe(canvas);

                        g.init();

                        player.width = g.getGubbeWidth();
                        player.height = g.getGubbeWidth();

                        setBackgroundData(d, function (p) {
                            posArray = p;

                            update();
                        });

                        coinInds = getCoinIndexes();

                        var m = drawDanger(ctx, 100);

                        function update() {

                            pastXPos = bg.x;
                            player.pastY = player.y;

                            // check keys
                            if (keys[38] || keys[32]) {
                                // up arrow or space
                                if (!player.jumping) {
                                    player.jumping = true;
                                    player.velY = -player.speed * 2.5;
                                }
                            }
                            if (keys[39]) {
                                player.walking = true;
                                g.walk(90);

                                // right arrow
                                if (bg.velX < bg.speed) {
                                    bg.velX++;
                                }
                            }

                            if (keys[37]) {
                                player.walking = true;
                                g.walk(-90);

                                // left arrow
                                if (bg.velX > -bg.speed) {
                                    bg.velX--;
                                }
                            }

                            //-----sätter positionerna-----------
                            bg.velX *= friction;
                            bg.x -= bg.velX;

                            player.velY += gravity;
                            player.y += player.velY;

                            //------------------------------------
                            if (Math.round(bg.velX) == 0) {
                                player.walking = false;
                                g.stand();
                            }

                            //-------kollar positionerna--------
                            //x-pos
                            if (bg.x <= -banWidth + width * 0.5) {
                                bg.x = 1;
                                drawWhenFinish();
                            }
                            else if (bg.x >= 0) {
                                bg.x = 0;
                            }
                            //ritar bakgrunden
                            ctx.clearRect(0, 0, width, height);


                            g.tick();
                            //check collision måste ligga efter drawBackground
                            drawBackground(bg.x);

                            //när det ska regna tentor
                            if (bg.x < -500 && bg.x > -(banWidth - width * 0.7 - width * 0.5)) {
                                m.tick(bg.x);
                            }
                            krockBefore = krock;
                            krock = checkCollision();
                            //DÖR!!
                            if (krock[2] > 0) {
                                bg.x = 0;
                                player.y = -100;
                                $(".fail").append("<h1 class='failText'>Omstart!</h1>");
                                var t = setTimeout(function () { $(".fail").children().remove(); }, 2000);
                                $(".itemInfo").children().remove();
                                $(".coinInfo").children().remove();
                                coinInds = getCoinIndexes();
                            }

                            //kollar myntkrock
                            if (krock[1] > 0) {
                                var ind = checkItem(bg.x);
                                var coinNr = checkCoinNR(ind);
                                if (ind != null) {
                                    var removeInd = coinInds.indexOf(ind);
                                    if (removeInd >= 0) {
                                        showCoin(coinNr);
                                        coinInds.splice(removeInd, 1);
                                    }
                                }
                            }

                            //y-pos
                            //håller sig på marken
                            if (player.y >= height - player.regY) {
                                player.y = height - player.regY;
                                player.velY = 0;
                                player.jumping = false;
                                $(".itemInfo").children().remove();
                            }
                            //kolliderar med något under
                            if (yKol > 0 && player.y > player.pastY) {
                                player.velY = 0;
                                player.y = player.pastY;
                                player.jumping = false;

                                //ritar info
                                gubbeIsOn = checkItem(bg.x);
                                if (gubbeIsOn != null && gubbeIsOn < 100) {
                                    showItems(gubbeIsOn);
                                }
                                else if (gubbeIsOn == 1000) {
                                    $(".itemInfo").children().remove();
                                }
                            }
                            //kollision x-pos
                            if (krock[0] > 0) {
                                bg.x = pastXPos;
                            }

                            //DÖR
                            if (player.y > height - 5 - player.regY && (bg.x < -width * 0.3 && bg.x > -(banWidth - width * 0.7 - width * 0.5))) {
                                bg.x = 0;
                                player.y = -100;
                                $(".fail").append("<h1 class='failText'>Omstart!</h1>");
                                var t = setTimeout(function () { $(".fail").children().remove(); }, 2000)
                                $(".itemInfo").children().remove();
                                $(".coinInfo").children().remove();
                                coinInds = [];
                                coinInds = getCoinIndexes();
                            }

                            g.setGubbePos(player.x, player.y);

                            requestAnimationFrame(update);
                        };



                        function setBackgroundData(d, callback) {
                            var firstPos = width * 0.7;
                            var gameW = banWidth - firstPos - width * 0.5;
                            tick = gameW / d.length;
                            var numberOfImagesLoaded = 0;

                            var positionArr = new Array(d.length);

                            for (var i = 0; i < d.length; i++) {
                                positionArr[i] = new Array(4);
                                //x-pos
                                positionArr[i][0] = firstPos + i * tick;
                                //y-pos
                                positionArr[i][1] = height - d[i].yPos;
                                //width
                                positionArr[i][2] = d[i].width * tick;
                                var img = new Image();
                                img.onload = handleImageLoad;
                                img.src = d[i].img;
                                positionArr[i][3] = img;
                            }

                            function handleImageLoad(e) {
                                numberOfImagesLoaded++;

                                if (numberOfImagesLoaded == d.length) {
                                    numberOfImagesLoaded = 0;

                                    if (callback)
                                        callback(positionArr)
                                }
                            };


                            // return positionArr;
                        };


                        function getCoinIndexes() {
                            var conInd = [];
                            for (var i = 0; i < c.length; i++) {
                                conInd.push(c[i].ind);
                            }
                            return conInd;
                        };

                        function drawBackground(xPos) {
                            var temp;
                            var coinIn = false;
                            var coinIn2 = false;
                            var firstSet = false;
                            // ctx.fillStyle = "#be3c3c";
                            for (var i = 0; i < posArray.length ; i++) {
                                temp = posArray[i][0] + xPos;
                                if (temp > -100 && temp < width) {
                                    //ritar pengen
                                    for (var j = 0; j < coinInds.length; j++) {
                                        if (coinInds[j] == i) {
                                            if (!firstSet) {
                                                g.setCoinPos(temp + 50, posArray[i][1] - 23);
                                                coinIn = true;
                                                firstSet = true;
                                            }
                                            else {
                                                g.setCoinPos2(temp + 50, posArray[i][1] - 23);
                                                coinIn2 = true;
                                            }
                                        }
                                    }
                                    //ritar underlag
                                    ctx.drawImage(posArray[i][3], temp, posArray[i][1]);
                                }
                            }
                            if (!coinIn) {
                                g.setCoinPos(-50, -20);
                            }
                            if (!coinIn2) {
                                g.setCoinPos2(-50, -20);
                            }
                            if (bg.x <= -banWidth + width) {
                                var flagPos = (banWidth) + xPos;
                                ctx.drawImage(finishImg, flagPos, 270);
                            }
                            ctx.font = 'italic bold 16px sa-serif';
                            ctx.textBaseline = 'bottom';
                            ctx.textAlign = "center";
                            //ritar tidslinjen
                            for (var j = 0; j < dates.length; j++) {
                                var temp2 = width * 0.7 + (dates[j].index * tick) + xPos;
                                if (temp2 > -100 && temp2 < width) {
                                    ctx.fillStyle = 'gray';

                                    ctx.fillText(dates[j].year, width * 0.7 + (dates[j].index * tick) + xPos + 35, 390);

                                    ctx.beginPath();
                                    ctx.fillStyle = '#afc2cf';
                                    ctx.rect(temp2 + 5, 365, 4, 35);

                                    ctx.fill();
                                }
                            }
                        };

                        function checkCollision() {
                            var sum = [];
                            var sum2 = [];

                            //nere till höger
                            sum = checkPixel(player.x + player.regX - 10, player.y + player.regY - 3, 1, 1);
                            //nere till vänster
                            sum2 = checkPixel(player.x - player.regX + 10, player.y + player.regY - 3, 1, 1);
                            //kollar y-kollision
                            yKol = checkPixel(player.x - 10, player.y + player.regY + 1, 20, 1)[0];
                            //blå collision
                            sum[0] += sum2[0];
                            //röd collision
                            sum[1] += sum2[1];

                            return sum;
                        };

                        function checkPixel(xPos, yPos, w, h) {
                            var collision = [0, 0, 0];
                            var sum = 0;
                            var red = 0;
                            var green = 0;
                            var blue = 0;
                            var rightCol = ctx.getImageData(xPos, yPos, w, h);

                            for (var i = 0; i < rightCol.data.length; i += 4) {
                                red += rightCol.data[i];

                                green += rightCol.data[i + 1];

                                blue += rightCol.data[i + 2];

                                sum += (red + blue + green);
                            }
                            //kollar om pixelvärdet inte är vit
                            if (sum > 0) {
                                if (blue >= red && blue >= green) {
                                    collision = [1, 0, 0];
                                }
                                else if (green >= red && green >= blue) {
                                    collision = [0, 0, 1];
                                }
                                else {
                                    collision = [0, 1, 0];
                                }
                            }
                            return collision;
                        };

                        function checkCoinNR(ind) {
                            for (var i = 0; i < c.length; i++) {
                                if (c[i].ind == ind) {
                                    return i;
                                }
                            }
                        };

                        function showCoin(item) {
                            if (c[item] != undefined) {
                                $(".coinInfo").children().remove();
                                $(".coinInfo").append("<h3 class='infoHeader'>" + c[item].title + "</h3>");
                                $(".coinInfo").append("<ul>");
                                for (var i = 0; i < c[item].description.length; i++) {
                                    $(".coinInfo").append("<li class='infoBread'>" + c[item].description[i] + "</li>");
                                }
                                $(".coinInfo").append("</ul>");
                            }
                        };

                        //visar upp infon om plattformen under gubben
                        function showItems(item) {
                            if ($(".itemInfo").children().length < 1) {
                                $(".itemInfo").children().remove();
                                $(".itemInfo").append("<h3 class='infoHeader'>" + d[item].title + "</h3>" +
                                                    "<p class='infoUnderHeader'>" + d[item].underTitle + "</p>" +
                                                      "<p class='infoBread'>" + d[item].description + "</p>");
                            }
                        };

                        //tittar om det fin en plattform under gubben
                        function checkItem(x) {
                            var index = -(x + width * 0.5 - posArray[0][0]) / tick;

                            if (Math.floor(index) - 2 >= 0) {
                                if (index && (index - Math.floor(index) > 0) && (index - Math.floor(index) < 0.75)) {
                                    return Math.floor(index) - 2;
                                }
                                else {
                                    return 1000;
                                }
                            }
                            else {
                                return null;
                            }

                        };


                        document.body.addEventListener("keydown", function (e) {
                            keys[e.keyCode] = true;
                        });

                        document.body.addEventListener("keyup", function (e) {
                            keys[e.keyCode] = false;
                        });


                    };


                    function drawWhenFinish() {
                        scope.showFinishedView = true;
                        scope.$apply();

                        $("#gameCanvas").remove();
                        $(".itemInfo").children().remove();
                        $(".coinInfo").children().remove();

                    };

                }
            }

        }]);

})(angular);

