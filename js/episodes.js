import {API_URL, URL_EPISODE} from './api.js';
import {getResultsApi} from './utils/getDataApi.js';

(async () => {
  const dataEpisodes = await getResultsApi.getData(API_URL + URL_EPISODE);
  const makeCards = (Arr) => {
    const cardsList = document.querySelector("#cards-list-episode");
    Arr.forEach((item) => {
      cardsList.innerHTML =
        cardsList.innerHTML +
        `
            <li class="location-card card">
                <a href="detailsEpisode.html#episode-${item.id}">
                    <h2>${item.name}</h2>
                    <p>${item.air_date}</p>
                    <span>${item.episode}</span>
                </a>
            </li>
            `;
    });
  };
  makeCards(dataEpisodes);
  const moreBtn = document.querySelector(".more-btn");
  let count = 2;
  moreBtn.addEventListener("click", async () => {
    const makeMore = async (Arr) => {
      Arr = await getResultsApi.getData(API_URL + URL_EPISODE + "/?page=" + count);
      makeCards(Arr);
    };
    makeMore(dataEpisodes);
    count++;
  });
})();
