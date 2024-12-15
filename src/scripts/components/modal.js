function EscapeListener(evt, modalWindow){
  if (evt.key ==='Escape'){ 
    closeModal(modalWindow);
  }
  document.removeEventListener('keyup', EscapeListener);
};

function overlayclickListener(evt, modalWindow){
  if (evt.target === modalWindow){
    closeModal(modalWindow);
  }
};
 
export function closeModelListener(modalWindow){
  const buttomDelete = modalWindow.querySelector('.popup__close');
  buttomDelete.addEventListener('click',function(){
   closeModal(modalWindow);
  });
  modalWindow.addEventListener('click', function(evt){
    overlayclickListener(evt,modalWindow);
 });
};
  
export function openModal(modalWindow){
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keyup', function(evt){
    EscapeListener(evt, modalWindow);
  })
};

export function closeModal(modalWindow){
  modalWindow.classList.remove('popup_is-opened');
};