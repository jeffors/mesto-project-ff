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

const editNameInput = document.forms.edit_profile.elements.name;
const editNameError =
  document.forms.edit_profile.querySelector(".edit_name_error");

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
  openModal(editPopup);
  hideError(editNameInput);
  document.forms.edit_profile.elements.name.value = profileTitle.innerText;
  document.forms.edit_profile.elements.description.value =
    profileDescription.innerText;
});

profileAddButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

document.forms.edit_profile.addEventListener("submit", handleEditFormSubmit);
document.forms.new_place.addEventListener("submit", handleAddFormSubmit);

function showError(input, errorMessage) {
  input.classList.add("popup__input_type_error");
  editNameError.textContent = errorMessage;
  editNameError.classList.add("popup__input_error_active");
}

function hideError(input) {
  input.classList.remove("popup__input_type_error");
  editNameError.textContent = "";
  editNameError.classList.remove("popup__input_error_active");
}

function checkInputValidity() {
  if (editNameInput.validity.patternMismatch) {
    editNameInput.setCustomValidity(editNameInput.dataset.errorMessage);
  } else {
    editNameInput.setCustomValidity("");
  }

  if (!editNameInput.validity.valid) {
    showError(editNameInput, editNameInput.validationMessage);
  } else {
    hideError(editNameInput);
  }
}

editNameInput.addEventListener("input", () => {
  checkInputValidity();
});
