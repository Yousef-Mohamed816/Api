const apiUrl = "https://api.jikan.moe/v4";

const searchText = document.querySelector("#searchText");
const searchResults = document.querySelector("#searchResults");

searchText.addEventListener("keyup", function() {
   if (this.value.length > 3) {
        getAnimes(this.value)
   }
})

async function getAnimes (query) {
  const res = await fetch(` ${apiUrl}/anime?q=${query}`)
  const animes = await res.json()

  if (animes.data.length > 0) {
    searchResults.style.display = "block";
    searchResults.innerHTML = ``;
    animes.data.map(anime => {
      searchResults.innerHTML += `
    <li class="singleAnime" data-image="${anime.images.jpg.image_url}">
    <a href="${anime.url}" target="_blank">${anime.title}</a>
    </li>
    `;
    })
    const singleAnimes = Array.from(document.querySelectorAll(".singleAnime"));
    const displayImage = document.querySelector("#displayImage");
    singleAnimes.map(singleAnime =>{

      singleAnime.addEventListener("mouseenter", function() {
        displayImage.style.display = "block";
        displayImage.innerHTML =  `<img src="${this.dataset.image}">`;
      })
      
      singleAnime.addEventListener("mouseout", function() {
        displayImage.style.display = "";
        
      })
      
      singleAnime.addEventListener("click", function() {
        displayImage.style.display = "none";

      })
      
    })

  }


}

const topTvAnime = document.querySelector("#topTvAnime")

async function getTopAnime () {
const res = await fetch(`${apiUrl}/top/anime`);
const topAnimes = await res.json();
topAnimes.data.map(topAnime =>{
topTvAnime.innerHTML += `
 <div class="col-lg-3 col-md-6">
 <div class="item">
   <div class="thumb">
  <a href="${topAnime.url}">
  <img src="${topAnime.images.jpg.image_url}" alt="">
  </a>
  <span class="price">${topAnime.score}</span>
  </div>
  <div class="down-content">
  <span class="category">${topAnime.source}</span>
     <h4>${topAnime.title}</h4>

   </div>
   </div>
 </div> 
`
})
}
getTopAnime()



const upcomingSeries = document.querySelector("#upcomingSeries");

async function getUpcomingSeries () {
  const res = await fetch(`${apiUrl}/seasons/upcoming`);
  const upcomingSerieses = await res.json();
  upcomingSerieses.data.map(item =>{
    upcomingSeries.innerHTML += `
 
  <div class="col-lg-2 col-md-6 col-sm-6">
    <div class="item">
   <div class="thumb">
     <a href="${item.url}">
     <img src="${item.images.jpg.image_url}" alt="">
     </a>
     </div>
     <div class="down-content">
       <span class="category">${item.source}</span>
       <h4>${item.title.substring(0,20)}</h4>
       
   </div>
    </div>
   </div>


  `
  })
  }
  getUpcomingSeries()
  
  
  const ranomCharcter = document.querySelector("#ranomCharcter");
  async function getRandomCharacter () {
    const response = await fetch (`${apiUrl}/random/characters`);
    const randomCharacterData = await response.json();
    ranomCharcter.innerHTML = `
    <img src="${randomCharacterData.data.images.jpg.image_url}" alt="">
    <span class="price">${randomCharacterData.data.favorites}</span>
  <span class="name">${randomCharacterData.data.name}</span>

    `
  }
  

  getRandomCharacter()

  
  
 



 