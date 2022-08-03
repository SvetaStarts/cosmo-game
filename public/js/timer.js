function timer(){
    let str = `Вы набрали уже: ${sec} баллов`;
    document.getElementById("timer").innerHTML = str;
     sec++;
}


function stopTimer() {
    clearInterval(t);
}

function startTimer() {
    t = setInterval(timer, 1000);
}

function restartTimer() {
    sec = 0;
    stopTimer();
    startTimer();
}


let sec = 0;
let t = null;

