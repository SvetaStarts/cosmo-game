class Tooltip {
    constructor() {

        let tooltips = document.querySelectorAll("span[data-tooltip]");
        for(let item of tooltips) {
            // де
            item.addEventListener('mouseover', function() {
                let text = this.getAttribute("data-tooltip");

                let tpl = `<div class="text">${text}</div>`;

                let is_t = this.querySelector('.text');
                if(is_t == null) {
                    this.innerHTML = tpl + this.innerHTML;
                }

                let txt = this.querySelector('.text');
                txt.style.display = "block";
            });

            item.addEventListener('mouseout', function() {
                let txt = this.querySelector('.text');
                txt.style.display = "none";
            });     
        }



    }
}