
module.exports.formateDate = function(dt) {

    let today = new Date(dt * 1000);

    // если передали не дату, тогда возвращаем пустую строку
    if(isNaN(today.getDate())) return ''; 

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let hh = String(today.getHours()).padStart(2, '0');
    let min = String(today.getMinutes()).padStart(2, '0');
    
    return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
}
