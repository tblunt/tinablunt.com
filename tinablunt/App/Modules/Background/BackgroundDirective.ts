module TinasApp {
    'use strict';

    export interface IBackgroundDirectiveScope extends ng.IScope {

    }

    export class BackgroundDirective extends BaseDirective<IBackgroundDirectiveScope> {
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;
        private imgdata: any;
        private data: any;

        private width: number;
        private height: number;

        constructor(private $timeout: ng.ITimeoutService) {
            super();

            this.restrict = 'E';
            this.template = '<canvas class="bg-canvas" id="bg-canvas"></canvas>';

        }

        public initialize(scope: IBackgroundDirectiveScope, element: JQuery, attributes: ng.IAttributes): void {
            Mediator.subscribe(SetSelectedView, (message) => this.onSetSelectedView(message, scope));

            this.$timeout(() => {
                this.$timeout(() => {

                    this.canvas = (<HTMLCanvasElement>document.getElementById("bg-canvas"));
                    this.ctx = this.canvas.getContext("2d");
                    this.ctx.msImageSmoothingEnabled = true;

                    this.drawBG();
                },0);
            },0);

        }

        private onSetSelectedView(message, scope: IBackgroundDirectiveScope) {
            this.$timeout(() => {
                this.$timeout(() => {
                    this.drawBG();
                }, 0);
            }, 0);
        }

        private drawBG() {
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
        }

        private drawGradCircle(x,y,r, rgb_string, op) {
            var grd = this.ctx.createRadialGradient(x, y, 0, x, y, r);
            grd.addColorStop(0, "rgba("+rgb_string+", "+op+")");
            grd.addColorStop(1, "rgba(" + rgb_string +",0)");

            this.ctx.beginPath();
            this.ctx.arc(x, y, r*1.5, 0, 2*Math.PI, true);
            this.ctx.fillStyle = grd;
            this.ctx.fill();
        }

        private drawCanvas() {
            this.imgdata = this.ctx.getImageData(0, 0, this.width, this.height);
            this.data = this.imgdata.data;
            var i, y = 0, x = 0;

           var r, x0, y0, pixelStep;

            r = 200;
            pixelStep = 0;
            x0 = 100;
            y0 = 100;

          
            this.drawCircle(100, 100, 100, "red");         
            this.ctx.putImageData(this.imgdata, 0,0);
        }

        private getScalarFromXY(x: number, y: number): number {
            return (y * this.width*4 + x*4);
        }

        private drawCircle(rx, ry, r, rgb_color_string) {
            var i, angle, x, y;
           
            for (i = 0; i < r; i++) {
               
                for (angle = 0; angle < Math.PI*2*i; angle++) {
                    //console.log(angle);
                    x = Math.round(rx + i * Math.cos(angle/i));
                    y = Math.round(ry + i * Math.sin(angle/i));
                    console.log(x);
                    //console.log(y);
                    this.data[this.getScalarFromXY(x, y)] = 255;
                    this.data[this.getScalarFromXY(x, y)+3] = 255;
                }
                
            }
        }

    }
}   