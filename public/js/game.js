class Game {
    static canvas = null;
    static context = null;

    static spaceship = null;
    static asteroids = [];

    static status = "game"; // gameover - проигрыш

    static interval = null;

    static asteroids_tick = 0;

    static max = 1;

    static cleanCanvas() {
        Game.context.save();
        Game.context.setTransform(1, 0, 0, 1, 0, 0);
        Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.context.restore();
    }
    static generate() {
        let count1 = 1;
       
        let max_1 = randomInteger(count1, count2);
        let max_2 = randomInteger(count1, count2);
        let max_3 = randomInteger(count1, count2);
        if  (count2 != 5) { count2++; } else { count2 = 5; }
        let newAsteroids = [];
        for(let i=0;i < max_1; i++) {
            newAsteroids.push(new Asteroid(src1, 10 + randomInteger(1, 10)));           
        }
        for(let i=0;i < max_2; i++) {
            newAsteroids.push(new Asteroid(src2, 4 + randomInteger(1, 4)));           
        }
        for(let i=0;i < max_3; i++) {
            newAsteroids.push(new Asteroid(src3, 8 + randomInteger(1, 8)));           
        }

       /* let newAsteroids = [];
        for(let i = 0; i < Game.max; i++) {
            newAsteroids.push(new Asteroid(src1));
            newAsteroids.push(new Asteroid(src2));
            newAsteroids.push(new Asteroid(src3));
            
        }
        if (Game.max == 2) {Game.max = 2;} else {Game.max++;}
        */
        
        Game.asteroids = Game.asteroids.concat(newAsteroids);

    }
   
    static animate() {

        // рисуем корабль
        Game.spaceship.draw();

        if(Game.asteroids_tick > 40) {
            Game.generate();

            Game.asteroids_tick = 0;
        }
        Game.asteroids_tick++;
      
        for(let asteroid of Game.asteroids) {
            asteroid.draw();
                      
        }

    }

    static create() {
          Game.spaceship = new SpaceShip();
    }

    static start() {

        // удаляем интервал (на случай если он уже создан)
        clearInterval(Game.interval);

        // создаём таймер
        stopTimer();
        startTimer();

        // получаем доступ к канве
        Game.canvas = document.getElementById("canvas");
        Game.context  = canvas.getContext('2d');

        Game.create();

        Game.interval = setInterval(() => {
            // чистим канву
            Game.cleanCanvas();
            

            // вызываем обработчик анимации
            Game.animate();

        }, 80);
        
    }

    static stop() {

        stopTimer();

        // удаляем интервал
        clearInterval(Game.interval);
        Game.interval = null;

    }

    static restart() {

        Game.asteroids = [];
        Game.asteroids_tick = 0;
        Game.max = 1;
        
        restartTimer();

        Game.stop();
        Game.start();
        let f = document.querySelector("#block_finish");
                f.style.display = "none"; 
    }

}

let max_1 = 1, max_2 = 1, max_3 = 1;

let count2 = 1;
/*
function cleanCanvas() {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function animate() {
    // очистить конву
    cleanCanvas();

    context = spaceship1.new(context, spaceshipX, 400);
    context = comets_1.new(context,x_1, y_1);
    context = comets_2.new(context,x_2, y_1);
    context = comets_3.new(context,x_3, y_1);
    context = comets_4.new(context,x_4, y_1);
    context = comets_5.new(context,x_5, y_1);

    y_1++;
}

let canvas = document.getElementById("canvas");
let context  = canvas.getContext('2d');
let y = canvas.height - 100;
let x = canvas.width / 2 - 50;

let spaceship1 = new spaceship(x,y);

let y_1 = 0;
let min_x = 50;
let max_x = 600;
let x_1 = Math.floor(Math.random() * (max_x - min_x)) + min_x;
let x_2 = Math.floor(Math.random() * (max_x - min_x)) + min_x;
let x_3 = Math.floor(Math.random() * (max_x - min_x)) + min_x;
let x_4 = Math.floor(Math.random() * (max_x - min_x)) + min_x;
let x_5 = Math.floor(Math.random() * (max_x - min_x)) + min_x;

let comets_1 = new comet(x_1,y_1);
let comets_2 = new comet(x_1,y_1);
let comets_3 = new comet(x_1,y_1);
let comets_4 = new comet(x_1,y_1);
let comets_5 = new comet(x_1,y_1);

setInterval(animate, 15);

let vectorLR = true;
let spaceshipX = 400;
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowLeft') {
        vectorLR = false;
    } else if(event.code == 'ArrowRight') {
        vectorLR = true;
    }

    if(vectorLR)  spaceshipX+=10; else spaceshipX-=10;
});
*/
