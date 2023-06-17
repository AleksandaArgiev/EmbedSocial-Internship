let arr = [];
const placeholder = document.querySelector(".layout-container");
const body = document.querySelector("body");
const theme = document.querySelector(".slider");
const loadMoreBtn = document.querySelector(".button");
const loadMoreBtnDiv = document.querySelector(".btn");
const modalPic = document.querySelector("modal-picture");

let currentBatch = 4;
let remainingCards = [];

// modal
const openModal = (imageUrl) => {
  body.classList.add("overlay");

  const modalContent = `
    <div class="modal-overlay">
      <div class="modal-picture">
        <img src="${imageUrl}" alt="" />
      </div>
    </div>
  `;
  placeholder.innerHTML = modalContent;

  document.addEventListener("keydown", closeModalOnEsc);
  placeholder.addEventListener("click", closeModalOnClick);
};

const closeModal = () => {
  body.classList.remove("overlay");
  placeholder.innerHTML = "";

  displayCards(currentBatch);

  document.removeEventListener("keydown", closeModalOnEsc);
  placeholder.removeEventListener("click", closeModalOnClick);
};

const closeModalOnEsc = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

const closeModalOnClick = (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    closeModal();
  }
};
const fetchData = () => {
  fetch("../data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      arr = data;
      remainingCards = arr.slice(currentBatch);
      displayCards(currentBatch);
    });
};

//cards
const displayCards = (count) => {
  let cardsHtml = "";
  for (let i = currentBatch - count; i < currentBatch; i++) {
    if (arr[i]) {
      const element = arr[i];
      placeholder.innerHTML = "";
      cardsHtml += `
        <div class="main-div">
          <div class="main-heading">
            <div class="main-user">
              <img
                class="main--img"
                src="${element.profile_image}"
                alt="Profile Image"
              />
              <div class="user-info">
                <h4>${element.name}</h4>
                <p>${element.date}</p>
              </div>
            </div>
            <div class="main-logo">
              <a href="${element.source_link}" target="_blank">
                <i
                  class="fa-brands fa-${
                    element.source_type === "facebook"
                      ? "facebook"
                      : "instagram"
                  } fa-2xl"
                  style="${
                    element.source_type === "facebook"
                      ? "color: #1877f2"
                      : "color: #ee2a7b"
                  }; padding: 20px"
                ></i>
              </a>
            </div>
          </div>
          <div class="image-div">
            <img
              class="my-image"
              src="${element.image}"
              alt="Main Image"
            />
          </div>
          <div class="caption">
            <p>${element.caption}</p>
          </div>
          <div class="likes">
            <i class="fa-solid fa-heart" style="color: #ed1d24"></i>
            ${element.likes}
          </div>
        </div>
      `;
    }
  }
  placeholder.innerHTML += cardsHtml;

  const modal = document.querySelectorAll(".my-image");
  modal.forEach((element, i) => {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
      const clickedElement = arr[i];
      openModal(clickedElement.image);
    });
  });
};

// Button Load More

const loadMoreCards = () => {
  currentBatch += 4;
  displayCards(currentBatch);
  remainingCards = arr.slice(currentBatch);

  if (remainingCards.length === 0) {
    loadMoreBtn.style.display = "none";
  }
};

loadMoreBtn.addEventListener("click", loadMoreCards);

theme.addEventListener("click", function (e) {
  theme.classList.toggle("slider-hidden");
  body.classList.toggle("header-container-hidden");
});

fetchData();
