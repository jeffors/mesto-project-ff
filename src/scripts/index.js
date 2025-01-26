import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, likeCard, removeCard } from "../components/card";
import { openModal, closeModal } from "../components/modal";

const cardContainer = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function fillProfileForm() {
  document.forms.edit_profile.elements.name.value = profileTitle.innerText;
  document.forms.edit_profile.elements.description.value =
    profileDescription.innerText;
}

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
  closeModal(newCardPopup);
}

initialCards.forEach((card) => {
  cardContainer.append(createCard(card, removeCard, likeCard, openImagePopup));
});

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(editPopup);
  // TODO: clearValidation()
});

profileAddButton.addEventListener("click", () => {
  // TODO: clearValidation()
  openModal(newCardPopup);
});

document.forms.edit_profile.addEventListener("submit", handleEditFormSubmit);
document.forms.new_place.addEventListener("submit", handleAddFormSubmit);

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input_error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input_error_active");
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

fillProfileForm();
enableValidation();
