
class SpaceShip {

    constructor() {

        this.img = new Image();
        this.img.src = "img/rocket.png";

        this.w = 100;
        this.h = 100;

        this.x = Game.canvas.width / 2 - this.w / 2;
        this.y = Game.canvas.height  - (this.h + 5); 

        this.vectorLR = true;

        Game.context.drawImage(this.img, this.x, this.y);

        document.addEventListener('keydown', (event) => {
            if (event.code == 'ArrowLeft') {
                this.vectorLR = false;
            } else if(event.code == 'ArrowRight') {
                this.vectorLR = true;
            }
        
            if(this.vectorLR)  this.x = this.x + 10; else this.x = this.x - 10;
        });

    }

    draw() {

        for(let i in Game.asteroids) {
            let asteroid = Game.asteroids[i];

            let start1 = asteroid.x;
            let finish1 = asteroid.x + asteroid.img.width;

            let start2 = this.x;
            let finish2 = this.x + this.img.width;

            if((asteroid.y  + asteroid.img.height) >= this.y && start1 <= finish2 &&  start2 <= finish1) {

                clearInterval(Game.interval);

                let str_finish = `Проигрыш! Вы набрали ${sec} баллов!`;
                document.getElementById("block_finish").innerHTML = str_finish;

                let finish = document.querySelector("#block_finish");
                finish.style.display = "block"; 
                stopTimer();
                break;
            }

            if((asteroid.y + asteroid.img.height) >= this.y + this.h) {
                Game.asteroids.splice(i, 1);
            }
            

        }

        Game.context.drawImage(this.img, this.x, this.y);  
    }
}

/*
class spaceships {
    constructor(quantity = 10) {
        this.quantity = quantity;

    }  

    add(a) {
        this.quantity = this.quantity + a;
    }
}


class spaceship extends spaceships {
    constructor(x, y) {
        super();

        this.width = 100;
        this.height = 75;

        this.y = y;
        this.x = x;
    }

    new(context, x, y) {
        let img = document.getElementById('img');
        context.drawImage(img, x, y);

       return context;
    }
}

class comets {
    constructor(quantity = 10) {
        this.quantity = quantity;

    }  

    add(a) {
        this.quantity = this.quantity + a;
    }
}

class comet extends comets{
    constructor(x_1, y_1) {
        super();

        this.width = 100;
        this.height = 100;

        this.y_1 = y_1;
        this.x_1 = x_1;
    }

    new(context, x_1, y_1) {
        let img = document.getElementById('comet');
        context.drawImage(img, x_1, y_1);

       return context;
    }
}
*/