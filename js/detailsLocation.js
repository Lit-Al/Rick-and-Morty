import { API_URL, URL_LOCATION } from "./api.js";
import { getResultsApi, getDataApi } from "./utils/getDataApi.js";

(async () => {
  let dataApi = await getDataApi.getData(API_URL + URL_LOCATION);

  let arrayLocations = [];
  for (let i = 1; i <= dataApi.info.pages; i++) {
    let alllocations = await getResultsApi.getData(
      API_URL + URL_LOCATION + "/?page=" + i
    );
    arrayLocations.push(alllocations);
  }



  const allLocations = [];
  for (let i = 0; i < arrayLocations.length; i++) {
    for (let j = 0; j < arrayLocations[i].length; j++) {
        allLocations.push(arrayLocations[i][j]);
    }
  }

  let locationId = document.location.hash;
  locationId = locationId.substring(10) - 1;

  const allCharacters = allLocations[locationId].residents;

  

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
    const locationInfo = document.querySelector(".details-block");
    locationInfo.innerHTML =
      locationInfo.innerHTML +
      `   
            <div class="details-episode"> 
                <h2>${Arr[locationId].name}</h2>
                <ul>
                    <li>
                        <p>Type</p>
                        <span>${Arr[locationId].type}</span>
                    </li>
                    <li>
                        <p>Dimension</p>
                        <span>${Arr[locationId].dimension}</span>
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
  makeInfo(allLocations);
})();
