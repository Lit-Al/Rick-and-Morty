import { API_URL, URL_CHARACTER } from "./api.js";
import { getResultsApi, getDataApi } from "./utils/getDataApi.js";

(async () => {
  let dataApi = await getDataApi.getData(API_URL + URL_CHARACTER);

  let arrayCharacters = [];
  for (let i = 1; i <= dataApi.info.pages; i++) {
    let allCharacters = await getResultsApi.getData(
      API_URL + URL_CHARACTER + "/?page=" + i
    );
    arrayCharacters.push(allCharacters);
  }

  const allCharacters = [];
  for (let i = 0; i < arrayCharacters.length; i++) {
    for (let j = 0; j < arrayCharacters[i].length; j++) {
      allCharacters.push(arrayCharacters[i][j]);
    }
  }


  let characterId = document.location.hash;
  characterId = characterId.substring(11) - 1;
  const allEpisodes = allCharacters[characterId].episode;

  let episodes = [];

  for (let i = 0; i < allEpisodes.length; i++) {
    let ppp = await getDataApi.getData(allEpisodes[i]);
    episodes.push(ppp);
  }

  const episodesName = episodes.map((item) => {
    return item.name;
  });
  const episodesId = episodes.map((item) => {
    return item.id;
  });
  const episodesCode = episodes.map((item) => {
    return item.episode;
  });
  const episodesAirDate = episodes.map((item) => {
    return item.air_date;
  });
  let numberLocation = allCharacters[characterId].location.url
  numberLocation = numberLocation.substring(41);

  const episodesList = [];
  let locationLink; 
  for (let i = 0; i < episodes.length; i++) {
    locationLink = `<a href="detailsLocation.html#location-${numberLocation}">`; 
    episodesList.push(
      `<li class="episode-item">
            <a href="detailsEpisode.html#episode-${episodesId[i]}">
              <h3>${episodesCode[i]}</h3>
              <p>${episodesName[i]}</p>
              <span>${episodesAirDate[i]}</span>
            </a>
          </li>
        `
    );
  }


  const makeInfo = (Arr) => {
    const characterInfo = document.querySelector(".details-block");
    characterInfo.innerHTML =
      characterInfo.innerHTML +
      `
            <img src=${Arr[characterId].image}></img>
            <h2>${Arr[characterId].name}</h2>
            <div class="columns">
              <div class="column">
                <p>Infotmations</p>
                <ul>
                  <li>
                    Gender
                    <span>${Arr[characterId].gender}</span>
                  </li>
                  <li>
                  Status
                    <span>${Arr[characterId].status}</span>
                  </li>
                  <li>
                  Specie
                    <span>${Arr[characterId].species}</span>
                  </li>
                  <li>
                  Origin
                    <span>${Arr[characterId].origin.name}</span>
                  </li>
                  <li>
                    ${locationLink}
                      Location
                      <span>${Arr[characterId].location.name}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="column">
                <p>Episodes</p>
                <ul class="episodes-list">
                    ${episodesList.join(" ")}
                </ul>
              </div>
            </div>
          `;
  };
  makeInfo(allCharacters);
})();
