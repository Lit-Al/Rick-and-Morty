import {API_URL, URL_LOCATION} from './api.js';
import {getResultsApi} from './utils/getDataApi.js';

(async () => {
  const dataLocations = await getResultsApi.getData(API_URL + URL_LOCATION);
  const makeCards = (Arr) => {
    const cardsList = document.querySelector("#cards-list-location");
    Arr.forEach((item) => {
      cardsList.innerHTML =
        cardsList.innerHTML +
        `
            <li class="location-card card">
                <a href="detailsLocation.html#location-${item.id}">
                    <h2>${item.name}</h2>
                    <p>${item.type}</p>
                </a>
            </li>
            `;
    });
  };
  makeCards(dataLocations);
  const moreBtn = document.querySelector(".more-btn");
  const filterInp = document.querySelector(".filter-input");
  let count = 2;
  moreBtn.addEventListener("click", async () => {
    filterInp.value = null;
    const categories = document.querySelectorAll('.section-container')
    for (const category of categories) {
      const cardsList = category.querySelector('.cards-list')
      const cardsItem = cardsList.getElementsByTagName('li')
      for (let i = 0; i < cardsItem.length; i++) {
      cardsItem[i].style.display = "flex"
      }
    }
    
    const makeMore = async (Arr) => {
      Arr = await getResultsApi.getData(
        API_URL + URL_LOCATION + "/?page=" + count
      );
      makeCards(Arr);
    };
    makeMore(dataLocations);
    count++;      
  });
})();
