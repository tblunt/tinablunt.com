function drawDanger(ctx) {
    var h = $("#gameCanvas").height(),
        w = $("#gameCanvas").width(),
        gravity = 0.3,
        monster = {
            x: 700,
            y: 0,
            velY: 0,
            width: 64,
            height:64
        },
        start = false,
            count = 0,
            beginXpos;
    var tentaImg = new Image();
    tentaImg.src = "/App/Modules/Portfolio/CvGame/img/tenta.png";

    function reset() {
        monster.y = 0;
    }

    function tick(xpos) {
            ctx.fillStyle = "green";
            monster.velY += gravity;
            monster.y += monster.velY;
            if (monster.y >= h) {
                monster.y = 0;
                monster.velY = 0;
                beginXpos = xpos;
                monster.x = -xpos + Math.random()*w;
            }
            ctx.drawImage(tentaImg, monster.x + xpos, monster.y);
           // ctx.fillRect(monster.x+xpos, monster.y, monster.width, monster.height);
            return monster.y;
    }

    return {
        tick: tick,
        reset: reset
    }
};

