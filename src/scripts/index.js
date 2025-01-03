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