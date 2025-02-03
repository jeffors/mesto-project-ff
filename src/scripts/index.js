import "../pages/index.css";
import { createCard, likeCard, removeCard } from "../components/card";
import { openModal, closeModal } from "../components/modal";
import { enableValidation, clearValidation } from "../components/validation";
import {
  getInitialCards,
  getProfileInfo,
  setProfileInfo,
  sendCard,
  updateAvatar,
} from "../components/api";

const cardContainer = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const avatarPopup = document.querySelector(".popup_type_avatar");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error_active",
};
let profileId;

function openImagePopup(evt) {
  imagePopup.querySelector(".popup__image").src = evt.target.src;
  imagePopup.querySelector(".popup__image").alt = evt.target.alt;
  imagePopup.querySelector(".popup__caption").textContent = evt.target.alt;
  openModal(imagePopup);
}

function savingStatus(buttonElement, saving) {
  if (saving) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled;
  } else {
    buttonElement.textContent = "Сохранить";
    buttonElement.enabled;
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  savingStatus(editPopup.querySelector(".popup__button"), true);
  setProfileInfo(
    document.forms.edit_profile.elements.name.value,
    document.forms.edit_profile.elements.description.value
  )
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      profileAvatar.style.backgroundImage = `url("${result.avatar}")`;
      closeModal(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      savingStatus(editPopup.querySelector(".popup__button"), false)
    );
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  savingStatus(avatarPopup.querySelector(".popup__button"), true);
  updateAvatar(document.forms.avatar.elements.link.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      profileAvatar.style.backgroundImage = `url("${result.avatar}")`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      savingStatus(avatarPopup.querySelector(".popup__button"), false)
    );
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  savingStatus(newCardPopup.querySelector(".popup__button"), true);
  const placeName = document.forms.new_place.elements.place_name.value;
  const link = document.forms.new_place.elements.link.value;
  sendCard(placeName, link)
    .then((result) => {
      cardContainer.prepend(
        createCard(result, profileId, removeCard, likeCard, openImagePopup)
      );
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      savingStatus(newCardPopup.querySelector(".popup__button"), false)
    );

  document.forms.new_place.reset();
  clearValidation(newCardPopup, validationConfig);
}

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

profileAvatar.addEventListener("click", () => {
  clearValidation(avatarPopup, validationConfig);
  openModal(avatarPopup);
});

document.forms.edit_profile.addEventListener("submit", handleEditFormSubmit);
document.forms.new_place.addEventListener("submit", handleAddFormSubmit);
document.forms.avatar.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(validationConfig);

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profileInfo, initialCards]) => {
    profileTitle.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.about;
    profileAvatar.style.backgroundImage = `url("${profileInfo.avatar}")`;

    profileId = profileInfo._id;

    initialCards.forEach((card) => {
      cardContainer.append(
        createCard(card, profileId, removeCard, likeCard, openImagePopup)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
