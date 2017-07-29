(function() {
  let guideMenu = document.querySelector(".guide__menu");
  
  guideMenu.querySelector(".guide__menu-dropdown-trigger").addEventListener("click", () => {
    guideMenu.classList.toggle("guide__menu--show")
  });



  let tiles = document.querySelectorAll(".tile[data-place-id]");
  // console.log(tiles);

  for(let i = 0; tiles.length > i; i++) {
    tiles[i].addEventListener("click", descriptionBlock);
  };

  function descriptionBlock() {  
    let destination = document.querySelector("#location-info")
    console.log(destination);
    let descr = getPlaceDescr(this.getAttribute('data-place-id'));
    insertBlockToDom(destination, createBlock(descr));
  }
  
  //loadPlaceDescription  
  let xhr = new XMLHttpRequest();

  function getPlaceDescr(id) {

    let out;  
    xhr.open("get", "data.json", false);
    xhr.send();
    let xhrAnswer = JSON.parse(xhr.responseText);
    // console.log(xhrAnswer);
    for( let key in xhrAnswer ) {      
      if( xhrAnswer[key]['id'] === id) {
        out = xhrAnswer[key];
      }      
    }
    return out;

  }
  //create Element
  function createBlock(data) {
    let block = `
      <div class="col-sm-12 col-lg-6">
        <div class="tile" style="background-image:url(${data['content']['img']});"></div>
      </div>
      <div class="col-sm-12 col-lg-6">
        <div class="tile tile--descr">
          <button class="tile-descr-close"></button>
          <div class="tile__description">
            <div class="tile__description-content">
              <h2 class="tile__title">${data['content']['title']}</h2>
              <p class="tile__text">${data['content']['descr']}</p>
              <ul class="tile__list">
                <li class="tile__list-item tile__list-item--url">${data['content']['url']}</a></li>
                <li class="tile__list-item tile__list-item--adress"><a href="/">${data['content']['adress']}</a></li>
                <li class="tile__list-item tile__list-item--name">${data['content']['contactName']}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
    return block;
  }

  //ВСТАВКА БЛОКА В дом LOCATION - КУДА вставляем, что вставляем
  function insertBlockToDom(location, block) {
    location.innerHTML = "";
    location.classList.remove("hide");    
    location.innerHTML = block;
    let descrClose = document.querySelector(".tile-descr-close");
    descrClose.addEventListener('click', closeDescrBlock);
  }  

  function closeDescrBlock() {
    document.querySelector("#location-info").classList.add("hide")
    document.querySelector("#location-info").innerHTML = "";
    console.log(this);
  }
})();