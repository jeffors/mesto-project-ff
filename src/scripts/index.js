import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, likeCard, removeCard } from "../components/card";
import { openModal, closeModal } from "../components/modal";
import { enableValidation, clearValidation } from "../components/validation";
import { getInitialCards } from "../components/api";

const cardContainer = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error_active",
};

function openImagePopup(evt) {
  imagePopup.querySelector(".popup__image").src = evt.target.src;
  imagePopup.querySelector(".popup__image").alt = evt.target.alt;
  imagePopup.querySelector(".popup__caption").textContent = evt.target.alt;
  openModal(imagePopup);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = document.forms.edit_profile.elements.name.value;
  profileDescription.textContent =
    document.forms.edit_profile.elements.description.value;
  closeModal(editPopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const placeName = document.forms.new_place.elements.place_name.value;
  const link = document.forms.new_place.elements.link.value;
  cardContainer.prepend(
    createCard(
      { name: placeName, link: link },
      removeCard,
      likeCard,
      openImagePopup
    )
  );
  document.forms.new_place.reset();
  clearValidation(newCardPopup, validationConfig);
  closeModal(newCardPopup);
}

// initialCards.forEach((card) => {
//   cardContainer.append(createCard(card, removeCard, likeCard, openImagePopup));
// });

profileEditButton.addEventListener("click", () => {
  document.forms.edit_profile.elements.name.value = profileTitle.innerText;
  document.forms.edit_profile.elements.description.value =
    profileDescription.innerText;
  clearValidation(editPopup, validationConfig);
  openModal(editPopup);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newCardPopup, validationConfig);
  openModal(newCardPopup);
});

document.forms.edit_profile.addEventListener("submit", handleEditFormSubmit);
document.forms.new_place.addEventListener("submit", handleAddFormSubmit);

enableValidation(validationConfig);

getInitialCards()
  .then((result) => {
    result.forEach((card) => {
      cardContainer.append(
        createCard(
          { name: card.name, link: card.link },
          removeCard,
          likeCard,
          openImagePopup
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
