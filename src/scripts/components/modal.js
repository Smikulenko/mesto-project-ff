function escapeListener(evt){
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key ==='Escape'){ 
    closeModal(openedPopup);
  }
};

function overlayClickListener(evt, modalWindow){
  if (evt.target === modalWindow){
    closeModal(modalWindow);
  }
};
 
export function addCloseModelListeners(modalWindow){
  const buttomDelete = modalWindow.querySelector('.popup__close');
  buttomDelete.addEventListener('click',() => closeModal(modalWindow));
  modalWindow.addEventListener('click', (evt) => overlayClickListener(evt,modalWindow));
};
  
export function openModal(modalWindow){
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keyup', escapeListener);
};

export function closeModal(modalWindow){
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', escapeListener);
};