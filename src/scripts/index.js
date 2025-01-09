import "../pages/index.css";
import { initialCards } from "./cards";
import addCard from "../components/card";

const cardContainer = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");

function openImagePopup(evt) {
  imagePopup.querySelector(".popup__image").src = evt.target.src;
  imagePopup.querySelector(".popup__image").alt = evt.target.alt;
  imagePopup.querySelector(".popup__caption").textContent = evt.target.alt;
  openModal(imagePopup);
}

initialCards.forEach((card) => {
  cardContainer.append(addCard(card, openImagePopup));
});

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function keyHandler(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function clickHandler(evt) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.addEventListener("click", clickHandler);
  document.addEventListener("keydown", keyHandler);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

profileEditButton.addEventListener("click", () => {
  openModal(editPopup);
  document.forms.edit_profile.elements.name.value = profileTitle.innerText;
  document.forms.edit_profile.elements.description.value =
    profileDescription.innerText;
});

profileAddButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = document.forms.edit_profile.elements.name.value;
  profileDescription.textContent =
    document.forms.edit_profile.elements.description.value;
  closeModal(document.querySelector(".popup_is-opened"));
}

document.forms.edit_profile.addEventListener("submit", handleEditFormSubmit);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const placeName = document.forms.new_place.elements.place_name.value;
  const link = document.forms.new_place.elements.link.value;
  cardContainer.prepend(addCard({ name: placeName, link: link }, removeCard));
  closeModal(document.querySelector(".popup_is-opened"));
}

document.forms.new_place.addEventListener("submit", handleAddFormSubmit);
