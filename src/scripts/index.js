import "../pages/index.css";
import { initialCards } from "./cards";

const cardContainer = document.querySelector(".places__list");

function addCard(card, removeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCard);

  return cardElement;
}

function removeCard(evt) {
  evt.target.closest(".card").remove();
}

initialCards.forEach((card) => {
  cardContainer.append(addCard(card, removeCard));
});

// TODO: сделать закрытие по оверлею
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

function keyHandler(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"))
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
  modal.querySelector(".popup__close").addEventListener("click", () => {
    closeModal(modal);
  });
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

profileEditButton.addEventListener("click", () => {
  openModal(editPopup);
});

profileAddButton.addEventListener("click", () => {
  openModal(newCardPopup);
});
