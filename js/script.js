// Filter
const categories = document.querySelectorAll('.section-container')


    for (const category of categories) {
        const filterInp = category.querySelectorAll('.filter-input')
        for (const inp of filterInp) {
            inp.addEventListener('keyup', () => {
                const filterInpValue =  inp.value.toUpperCase();
                const cardsList = category.querySelector('.cards-list')
                const cardsItem = cardsList.getElementsByTagName('li')
        
                for (let i = 0; i < cardsItem.length; i++) {
                    let name = cardsItem[i].getElementsByTagName("h2")[0];
                    let nameValue = name.textContent || name.innerText;
                    if (nameValue.toUpperCase().indexOf(filterInpValue) > -1) {
                        cardsItem[i].style.display = "";
                    } else {
                        cardsItem[i].style.display = "none";
                    }
                  }
            })
        }
    }






