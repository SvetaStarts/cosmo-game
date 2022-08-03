class Accordion {
    constructor() {

        this.rules = document.querySelectorAll(".accordion .rule");

        for(let item of this.rules) {
            item.onclick = function() {
                let desc = this.querySelector(".description");
                desc.style.display = (desc.style.display == "block")?"none":"block";

            }
        }

        // навешиваем обработчик на ссылку "Закрыть всё"
        let doc = document.querySelector("a[data-close-all]");
        doc.addEventListener('click', (event) => {
            event.preventDefault();

            this.closeAll();

        });
    }

    // закрываем все описания правил
    closeAll() {
        for(let item of this.rules) {
            let desc = item.querySelector(".description");
            desc.style.display = "none"; 
        }
    }
}