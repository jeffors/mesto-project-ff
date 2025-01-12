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
    closeModal(evt.currentTarget);
  }
}

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.addEventListener("click", clickHandler);
  document.addEventListener("keydown", keyHandler);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  modal.removeEventListener("click", clickHandler);
  document.removeEventListener("keydown", keyHandler);
}