export function createCard(card, removeCard, likeCard, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCard);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImagePopup);

  return cardElement;
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function removeCard(evt) {
  evt.target.closest(".card").remove();
}
