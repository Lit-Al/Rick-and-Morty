import { API_URL, URL_CHARACTER } from "./api.js";
import { getResultsApi } from "./utils/getDataApi.js";

let charArr = [];

(async () => {
  let dataCharacters = await getResultsApi.getData(API_URL + URL_CHARACTER);
  const makeCards = (Arr) => {
    const cardsList = document.querySelector("#cards-list-character");
    Arr.forEach((item) => {
      charArr.push(item)
      cardsList.innerHTML =
        cardsList.innerHTML +
        `
                <li class="character-card card">
                    <a href="detailsCharacter.html#character-${item.id}">
                        <img src=${item.image}></img>
                        <h2>${item.name}</h2>
                        <p>${item.species}</p>
                    </a> 
                </li>
                `;
    });
  };
  makeCards(dataCharacters);
  const moreBtn = document.querySelector(".more-btn");
  let count = 2;
  moreBtn.addEventListener("click", async () => {
    const makeMore = async (Arr) => {
      Arr = await getResultsApi.getData(
        API_URL + URL_CHARACTER + "/?page=" + count
      );
      makeCards(Arr);
    };
    makeMore(dataCharacters);
    count++;                                          
  });
})();
