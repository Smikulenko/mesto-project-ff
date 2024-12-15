import './pages/index.css'; 
import {initialCards} from './scripts/components/cards';
import {createCard,deleteCard,handleLikeCard} from './scripts/components/card';
import{openModal,addCloseModelListeners,closeModal} from './scripts/components/modal';

// @todo: DOM узлы 
const cardPlace = document.querySelector('.places__list');

const buttomAddCard = document.querySelector('.profile__add-button');
const buttomEditProfile = document.querySelector('.profile__edit-button');


const addCardModalWindow = document.querySelector('.popup_type_new-card');
const editProfileModalWindow = document.querySelector('.popup_type_edit');
const imageModalWindow = document.querySelector('.popup_type_image');
const imageCard = imageModalWindow.querySelector('.popup__image');
const imageCaption = imageModalWindow.querySelector('.popup__caption');

const formProfile = document.querySelector('.popup_type_edit');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const formCardModalWindow = document.querySelector('.popup_type_new-card');
const formCard = formCardModalWindow.querySelector('.popup__form')
const namePlaceInput = formCardModalWindow.querySelector('.popup__input_type_card-name');
const linkPlaceInput = formCardModalWindow.querySelector('.popup__input_type_url');

function handleOpenImage(data){
  imageCard.src =data.link;
  imageCard.alt = data.name;
  imageCaption.textContent = data.name;
  openModal(imageModalWindow);

};
function handleFormSubmit(evt){
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closeModal(formProfile);
};
function handleFormCardSubmit(evt){
  evt.preventDefault();
  const namePlace = namePlaceInput.value;
  const linkPlace = linkPlaceInput.value;
  cardPlace.prepend(createCard(
    {name:namePlace,link:linkPlace}, 
      deleteCard,
      handleLikeCard,
      handleOpenImage),
    );
  closeModal(formCardModalWindow);
  formCard.reset();
};

buttomEditProfile.addEventListener('click',function(){
  openModal(editProfileModalWindow);
});
buttomAddCard.addEventListener('click', function(){
  openModal(addCardModalWindow);
});

formProfile.addEventListener('submit', handleFormSubmit); 
formCard.addEventListener('submit', handleFormCardSubmit);
addCloseModelListeners(editProfileModalWindow);
addCloseModelListeners(addCardModalWindow);
addCloseModelListeners(imageModalWindow);

addCardModalWindow.classList.add('popup_is-animated');
imageModalWindow.classList.add('popup_is-animated');
editProfileModalWindow.classList.add('popup_is-animated');

// @todo: Вывести карточки на страницу
initialCards.forEach(function(data){
  cardPlace.append(createCard(data, deleteCard,handleLikeCard,handleOpenImage));
});
