animateCoin = function (imgCoin) {
    var numberOfimagesLoaded = 0;
    var coinAnimation;

    startSpin();

    function startSpin() {
        // create a new stage and point it at our canvas:
       // stage = new createjs.Stage(canvas);

        // create spritesheet and assign the associated data.
        var coinSpriteSheet = new createjs.SpriteSheet({
            //image to use
            images: [imgCoin],
            //width, height & registration point of each sprite
            frames: { width: 64, height: 64, regX: 32, regY: 32 },
            // To slow down the animation loop of the sprite, we set the frequency to 4 to slow down by a 4x factor
            animations: {
                walk: [0, 7, "walk", 4]
            }
        });

        coinAnimation = new createjs.BitmapAnimation(coinSpriteSheet);

        coinAnimation.name = "spinCoin";


        coinAnimation.gotoAndPlay("walk"); 	//walking from left to right
        coinAnimation.direction = 90;
    };

    //called if there is an error loading the image (usually due to a 404)
    function handleImageError(e) {
        console.log("Error Loading Image : " + e.target.src);
    };

    return coinAnimation;
}