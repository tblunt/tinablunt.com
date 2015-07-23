animateGubbe = function (canvas) {
    var canvas,
    stage,
    bmpAnimation,
    bmpAnimationIdle,
    coinAnimation,
    coinAnimation2,
    dir = 0,
    standing = true,
    jumping = false,
    walking = false,
    gubbeWidth = 64,
    gubbeHeight = 64,

    numberOfImagesLoaded = 0,

    imgMonsterARun = new Image(),
    imgMonsterAIdle = new Image(),
    imgCoin = new Image();

    function init() {
        imgMonsterARun.onload = handleImageLoad;
        imgMonsterARun.onerror = handleImageError;
        imgMonsterARun.src = "/App/Modules/Portfolio/CvGame/img/MonsterARun.png";

        imgMonsterAIdle.onload = handleImageLoad;
        imgMonsterAIdle.onerror = handleImageError;
        imgMonsterAIdle.src = "/App/Modules/Portfolio/CvGame/img/MonsterAIdle2.png";

        imgCoin.onload = handleImageLoad;
        imgCoin.onerror = handleImageError;
        imgCoin.src = "/App/Modules/Portfolio/CvGame/img/spinning_coin_gold.png";
    };

    function handleImageLoad(e) {
        numberOfImagesLoaded++;

        if (numberOfImagesLoaded == 2) {
            numberOfImagesLoaded = 0;
            startGame();
        }
    };


    function startGame() {
        console.log("start game animate gubbe");

        // create a new stage and point it at our canvas:
        stage = new createjs.Stage(canvas);
        
        coinAnimation = createCoin(imgCoin);
        coinAnimation2 = createCoin(imgCoin);
        
        // create spritesheet and assign the associated data.
        var spriteSheet = new createjs.SpriteSheet({
            //image to use
            images: [imgMonsterARun],
            //width, height & registration point of each sprite
            frames: { width: 64, height: 64, regX: 32, regY: 32 },
            // To slow down the animation loop of the sprite, we set the frequency to 4 to slow down by a 4x factor
            animations: {
                walk: [0, 9, "walk", 4]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);

        // Idle sequence of the monster
        var spriteSheetIdle = new createjs.SpriteSheet({
            images: [imgMonsterAIdle],
            frames: { width: 64, height: 64, regX: 32, regY: 32 },
            animations: {
                idle: [0, 10, "idle", 4]
            }
        });

        bmpAnimationIdle = new createjs.BitmapAnimation(spriteSheetIdle);

        bmpAnimationIdle.name = "monsteridle1";

        // create a BitmapSequence instance to display and play back the sprite sheet:
        bmpAnimation = new createjs.BitmapAnimation(spriteSheet);

        // set the registration point (the point it will be positioned and rotated around)
        // to the center of the frame dimensions:
        bmpAnimation.regX = bmpAnimation.spriteSheet.frameWidth / 2 | 0;
        bmpAnimation.regY = bmpAnimation.spriteSheet.frameHeight / 2 | 0;

        bmpAnimation.gotoAndPlay("walk_h"); 
        bmpAnimation.name = "monster1";
        bmpAnimation.direction = 90;
        walking = true;

       
        stage.addChild(coinAnimation);
        stage.addChild(coinAnimation2);

        stand();
    };

    function createCoin() {
        var temp;
        temp = animateCoin(imgCoin);
        return temp;
    };

    //called if there is an error loading the image (usually due to a 404)
    function handleImageError(e) {
        console.log("Error Loading Image : " + e.target.src);
    };

    function tick() {
        // update the stage:
        stage.update();
    };

    function walk(dir) {
        //walk
        if (standing) {
            standing = false;
            if (dir > 0) {
                bmpAnimation.direction = walk;
                stage.removeChild(bmpAnimationIdle);
                bmpAnimation.gotoAndPlay("walk_h");
                stage.addChild(bmpAnimation);
            }
            else {
                bmpAnimation.direction = walk;
                stage.removeChild(bmpAnimationIdle);
                bmpAnimation.gotoAndPlay("walk");
                stage.addChild(bmpAnimation);
            }
        }
        walking = true;
    };

    function stand() {
        //stand
        if (walking) {
            walking = false;
            walk = 0;
            stage.removeChild(bmpAnimation);
            bmpAnimationIdle.gotoAndPlay("idle");
            stage.addChild(bmpAnimationIdle);
        }
        standing = true;
    };

    function setGubbePos(xPos, ypos) {
        bmpAnimationIdle.x = xPos;
        bmpAnimationIdle.y = ypos;
        bmpAnimation.x = xPos;
        bmpAnimation.y = ypos;
    };

    function setCoinPos(xPos, ypos) {
        coinAnimation.x = xPos;
        coinAnimation.y = ypos;
    };

    function setCoinPos2(xPos, ypos) {
        coinAnimation2.x = xPos;
        coinAnimation2.y = ypos;
    };

    function getGubbeHeight() {
        return gubbeHeight;
    }
    function getGubbeWidth() {
        return gubbeWidth;
    }

    return {
        init: init,
        tick: tick,
        setGubbePos: setGubbePos,
        walk: walk,
        stand: stand,
        getGubbeHeight: getGubbeHeight,
        getGubbeWidth: getGubbeWidth,
        createCoin: createCoin,
        setCoinPos: setCoinPos,
        setCoinPos2: setCoinPos2
    };
};