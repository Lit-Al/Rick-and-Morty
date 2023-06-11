import { API_URL, URL_EPISODE } from "./api.js";
import { getResultsApi, getDataApi } from "./utils/getDataApi.js";

(async () => {
  let dataApi = await getDataApi.getData(API_URL + URL_EPISODE);

  let arrayEpisodes = [];
  for (let i = 1; i <= dataApi.info.pages; i++) {
    let allCharacters = await getResultsApi.getData(
      API_URL + URL_EPISODE + "/?page=" + i
    );
    arrayEpisodes.push(allCharacters);
  }

  const allEpisodes = [];
  for (let i = 0; i < arrayEpisodes.length; i++) {
    for (let j = 0; j < arrayEpisodes[i].length; j++) {
      allEpisodes.push(arrayEpisodes[i][j]);
    }
  }


  let episodeId = document.location.hash;
  episodeId = episodeId.substring(9) - 1;

  const allCharacters = allEpisodes[episodeId].characters;

  let characters = [];

  for (let i = 0; i < allCharacters.length; i++) {
    let ppp = await getDataApi.getData(allCharacters[i]);
    characters.push(ppp);
  }
  const charactersName = characters.map((item) => {
    return item.name;
  });
  const charactersImage = characters.map((item) => {
    return item.image;
  });
  const charactersSpecies = characters.map((item) => {
    return item.species;
  });
  const charactersId = characters.map((item) => {
    return item.id;
  });

  const charactersList = [];

  for (let i = 0; i < characters.length; i++) {
    charactersList.push(
      `<li class="character-card card">
            <a href="detailsCharacter.html#character-${charactersId[i]}">
              <img src="${charactersImage[i]}">
              <h3>${charactersName[i]}</h3>
              <p>${charactersSpecies[i]}</p>
            </a>
          </li>
        `
    );
  }

  const makeInfo = (Arr) => {
    const episodeInfo = document.querySelector(".details-block");
    episodeInfo.innerHTML =
      episodeInfo.innerHTML +
      `   
            <div class="details-episode"> 
                <h2>${Arr[episodeId].name}</h2>
                <ul>
                    <li>
                        <p>Episode</p>
                        <span>${Arr[episodeId].episode}</span>
                    </li>
                    <li>
                        <p>Date</p>
                        <span>${Arr[episodeId].air_date}</span>
                    </li>
                </ul>
                <div>
                    <h3>Cast</h3>
                    <ul class="cards-list">
                        ${charactersList.join(" ")}
                    </ul>
                </div>
            </div>
          `;
  };
  makeInfo(allEpisodes);
})();
