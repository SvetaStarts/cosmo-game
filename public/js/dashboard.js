

//  отправляем данные поиска
function searchUsers(event) {
    // останавливаем действие по умалчанию
    event.preventDefault();

    let stext = document.querySelector("#stext").value;
    location.href= '/admin?stext='+stext;

  return false;

}


(function () {
    'use strict'
  
    feather.replace({ 'aria-hidden': 'true' });

    console.log("test");


})()