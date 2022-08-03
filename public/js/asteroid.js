class Asteroid {

    constructor(src, speed) {
    
        this.img = new Image();
        this.img.src = src;

    

        this.x = randomInteger(this.img.width, Game.canvas.width - this.img.width);
        this.y = 0 - this.img.height;

        Game.context.drawImage(this.img, this.x, this.y);
       this.s = speed;

       }
   

    draw() {
        this.y = this.y + this.s;
        Game.context.drawImage(this.img, this.x, this.y);
        console.log(this.s);
    }

    
    
}

/*let s = 1;*/

let src1 = "img/a_1.png";
let src2 = "img/a_2.png";
let src3 = "img/a_3.png";