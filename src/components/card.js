import { deleteCard, putLikeCard, deleteLikeCard } from "./api";

export function createCard(
  card,
  profileId,
  removeCard,
  likeCard,
  openImagePopup
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__like-counter").textContent =
    card.likes.length;

    // console.log(card.likes)
  if (card.likes.find(user => user._id === profileId)) {
    cardElement.querySelector(".card__like-button").classList.add("card__like-button_is-active")
  }

  if (card.owner._id === profileId) {
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        removeCard(cardElement, card._id);
      });
  } else {
    cardElement
      .querySelector(".card__delete-button")
      .classList.add("card__delete-button_is-hidden");
  }

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      likeCard(cardElement.querySelector(".card__like-button"), card._id, cardElement.querySelector(".card__like-counter"))
    });
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImagePopup);

  return cardElement;
}

export function likeCard(likeElement, cardId, counterElement) {
  if (likeElement.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardId).then((result) => {
      counterElement.textContent = result.likes.length;
      likeElement.classList.remove("card__like-button_is-active")
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    putLikeCard(cardId).then((result) => {
      counterElement.textContent = result.likes.length;
      likeElement.classList.add("card__like-button_is-active")
    })
    .catch((err) => {
      console.log(err);
    });
  }

}

export function removeCard(cardElement, cardId) {
  deleteCard(cardId)
    .then((result) => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
