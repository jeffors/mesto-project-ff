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

// TODO: сделать нормальные функции, добавить Esc для закрытия
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

profileEditButton.addEventListener("click", () => {
  editPopup.classList.add("popup_is-opened");
  editPopup.querySelector(".popup__close").addEventListener("click", () => {
    editPopup.classList.remove("popup_is-opened");
  });
});

profileAddButton.addEventListener("click", () => {
  newCardPopup.classList.add("popup_is-opened");
  newCardPopup.querySelector(".popup__close").addEventListener("click", () => {
    newCardPopup.classList.remove("popup_is-opened");
  });
});
