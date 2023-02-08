const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const modalContainer = document.querySelector(".modal-container");

// Default search
window.addEventListener("load", () =>{
  searchBtn.click();
})

// Update card
let lists;
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    lists = await getLists(searchInput.value);
    updateCard(lists);
  } catch (err) {
    alert(err);
  }
});

// onEnter Handler
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchInput.value != "") {
    searchBtn.click()
  }
});

modalContainer.addEventListener("click",
  (e) => {
    let rect = modalContainer.getBoundingClientRect();
    let isInDialog= (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        modalContainer.close();
    }
  }
);


// Get menu lists
const getLists = (key) => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") throw new Error("Food Not Found ");
      return response.meals;
    });
};

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("recipe")) {
    try {
      const id = e.target.getAttribute("idmeal");
      const listMenu = lists[id];
      updateUiDetail(listMenu);
    } catch (err) {
      alert(err);
    }
  }
});

const updateUiDetail = (dataMeal) => {

  const foodDetail = Details(dataMeal);
  modalContainer.innerHTML = foodDetail;
  modalContainer.showModal();
};

const updateCard = (listMenu) => {
  const cardContainer = document.getElementById("cards");
  let cardList = "";
  if (listMenu != null) {
    for (let i = 0; i < listMenu.length && i < 9; i++) {
      cardList += createCard(listMenu[i], i);
    }
  } else {
    cardList += `<p class="no-food">No Food Found</p>`;
  }
  cardContainer.innerHTML = cardList;
};

const createCard = (meal, idMeal) => {
  return `
    <div class="card">
      <a>
        <img
          src=${meal.strMealThumb}
          alt=${meal.strMeal}
        />
        <p class="item-title">${meal.strMeal}</p>
        <p class="time-desc">${meal.strCategory}, ${meal.strArea}</p>
        <p class="recipe" idmeal=${idMeal} >Lihat Resep →</p>
      </a>
    </div>
  `;
};

const Details = (dataMeal) => {
  return `
      <div class="meal-title">
        <h3>${dataMeal.strMeal}</h3>
        <img src="${dataMeal.strMealThumb}" />
      </div>
      <div>
        <p><strong>Tags : </strong>${
          dataMeal.strTags != null ? dataMeal.strTags : " - "
        }</p>
        <p><strong>Youtube : </strong><a href="${dataMeal.strYoutube}" target="_blank" rel="noopener noreferrer">${
    dataMeal.strYoutube
  }</a></p>
        <p><strong>Ingredients : </strong></p>
        <ul>
          ${dataMeal.strIngredient1 != "" ?  `<li>${dataMeal.strIngredient1} , ${dataMeal.strMeasure1}</li>` : ""}
          ${dataMeal.strIngredient2 != "" ?  `<li>${dataMeal.strIngredient2} , ${dataMeal.strMeasure2}</li>` : ""}
          ${dataMeal.strIngredient3 != "" ?  `<li>${dataMeal.strIngredient3} , ${dataMeal.strMeasure3}</li>` : ""}
          ${dataMeal.strIngredient4 != "" ?  `<li>${dataMeal.strIngredient4} , ${dataMeal.strMeasure4}</li>` : ""}
          ${dataMeal.strIngredient5 != "" ?  `<li>${dataMeal.strIngredient5} , ${dataMeal.strMeasure5}</li>` : ""}
          ${dataMeal.strIngredient6 != "" ?  `<li>${dataMeal.strIngredient6} , ${dataMeal.strMeasure6}</li>` : ""}
          ${dataMeal.strIngredient7 != "" ?  `<li>${dataMeal.strIngredient7} , ${dataMeal.strMeasure7}</li>` : ""}
          ${dataMeal.strIngredient8 != "" ?  `<li>${dataMeal.strIngredient8} , ${dataMeal.strMeasure8}</li>` : ""}
          ${dataMeal.strIngredient9 != "" ?  `<li>${dataMeal.strIngredient9} , ${dataMeal.strMeasure9}</li>` : ""}
          ${dataMeal.strIngredient10 != "" ?  `<li>${dataMeal.strIngredient10} , ${dataMeal.strMeasure10}</li>` : ""}
          ${dataMeal.strIngredient11 != "" ?  `<li>${dataMeal.strIngredient11} , ${dataMeal.strMeasure11}</li>` : ""}
          ${dataMeal.strIngredient12 != "" ?  `<li>${dataMeal.strIngredient12} , ${dataMeal.strMeasure12}</li>` : ""}
          ${dataMeal.strIngredient13 != "" ?  `<li>${dataMeal.strIngredient13} , ${dataMeal.strMeasure13}</li>` : ""}
          ${dataMeal.strIngredient14 != "" ?  `<li>${dataMeal.strIngredient14} , ${dataMeal.strMeasure14}</li>` : ""}
          ${dataMeal.strIngredient15 != "" ?  `<li>${dataMeal.strIngredient15} , ${dataMeal.strMeasure15}</li>` : ""}
          ${dataMeal.strIngredient16 != "" ?  `<li>${dataMeal.strIngredient16} , ${dataMeal.strMeasure16}</li>` : ""}
          ${dataMeal.strIngredient17 != "" ?  `<li>${dataMeal.strIngredient17} , ${dataMeal.strMeasure17}</li>` : ""}
          ${dataMeal.strIngredient18 != "" ?  `<li>${dataMeal.strIngredient18} , ${dataMeal.strMeasure18}</li>` : ""}
          ${dataMeal.strIngredient19 != "" ?  `<li>${dataMeal.strIngredient19} , ${dataMeal.strMeasure19}</li>` : ""}
          ${dataMeal.strIngredient20 != "" ?  `<li>${dataMeal.strIngredient20} , ${dataMeal.strMeasure20}</li>` : ""}
        </ul>
        <p><strong>Instruction : </strong>${dataMeal.strInstructions}</p>
      </div>
`;
};