import './pages/index.css'; 
import {createCard,deleteCard,handleLikeCard} from './scripts/components/card';
import{openModal,addCloseModelListeners,closeModal} from './scripts/components/modal';
import {enableValidation,clearValidation} from './scripts/validation';
import{getUser,getCardList,updateUser,addCard,updateAvatar} from './scripts/components/api' 
// @todo: DOM узлы 
const cardPlace = document.querySelector('.places__list');

const buttomAddCard = document.querySelector('.profile__add-button');
const buttomEditProfile = document.querySelector('.profile__edit-button');


const addCardModalWindow = document.querySelector('.popup_type_new-card');
const imageModalWindow = document.querySelector('.popup_type_image');
const imageCard = imageModalWindow.querySelector('.popup__image');
const imageCaption = imageModalWindow.querySelector('.popup__caption');


const formProfile = document.querySelector('.popup_type_edit');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image')
const profileSubmitButton = formProfile.querySelector('.popup__button')

const formEditAvatar = document.querySelector('.popup_type_edit_avatar')
const linkAvatarInput = formEditAvatar.querySelector('.popup__input_type_url')
const avatarSubmitButtom =formEditAvatar.querySelector('.popup__button')
const formAvatar = formEditAvatar.querySelector('.popup__form')

const formCardModalWindow = document.querySelector('.popup_type_new-card');
const formCard = formCardModalWindow.querySelector('.popup__form')
const cardSubmitButtom = formCardModalWindow.querySelector('.popup__button')
const namePlaceInput = formCardModalWindow.querySelector('.popup__input_type_card-name');
const linkPlaceInput = formCardModalWindow.querySelector('.popup__input_type_url');
const popupElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  avatarSubmitButtom.textContent = 'Сохранение...';
  const link =linkAvatarInput.value;
  updateAvatar(link).then((updatedAvatar) => {
    profileImage.style.backgroundImage = `url(${updatedAvatar.avatar})`;
    closeModal(formEditAvatar);
    formAvatar.reset();
  })
  .finally(() => {
    avatarSubmitButtom.textContent = 'Сохранить';
  })
  .catch((err) => {
    console.log(err);
  });
};

function handleOpenImage(data){
  imageCard.src =data.link;
  imageCard.alt = data.name;
  imageCaption.textContent = data.name;
  openModal(imageModalWindow);

};
function handleFormSubmit(evt){
  evt.preventDefault();
  profileSubmitButton.textContent = 'Сохранение...'
  const name = nameInput.value;
  const job = jobInput.value;
  updateUser(name,job).then((updatedUser) => {
    profileName.textContent = updatedUser.name;
    profileJob.textContent = updatedUser.about;
    closeModal(formProfile);
  })
  .finally(() => {
     profileSubmitButton.textContent = 'Сохранить';
  }) 
  .catch((err) => {
    console.log(err);
  });
  
};
function handleFormCardSubmit(evt){
  evt.preventDefault();
  cardSubmitButtom.textContent = 'Сохранение...'
  const namePlace = namePlaceInput.value;
  const linkPlace = linkPlaceInput.value;
  addCard(namePlace,linkPlace).then((card) => {
    cardPlace.prepend(createCard(
        card, 
        deleteCard,
        handleLikeCard,
        handleOpenImage,
        card.owner._id),
      );
    closeModal(formCardModalWindow);
    formCard.reset();
  }) 
  .finally(() => {
    cardSubmitButtom.textContent = 'Сохранинть';
 }) 
  .catch((err) => {
    console.log(err);
  });
 
};
profileImage.addEventListener('click',function(){
  openModal(formEditAvatar);
  clearValidation(formEditAvatar,popupElements);
})

buttomEditProfile.addEventListener('click',function(){
  nameInput.value= profileName.textContent;
  jobInput.value=profileJob.textContent;
  openModal(formProfile);
  clearValidation(formProfile,popupElements)
});
buttomAddCard.addEventListener('click', function(){
  openModal(addCardModalWindow);
  clearValidation(addCardModalWindow,popupElements)
});

formProfile.addEventListener('submit', handleFormSubmit); 
formCard.addEventListener('submit', handleFormCardSubmit);
formEditAvatar.addEventListener('submit',handleAvatarFormSubmit);
addCloseModelListeners(formProfile);
addCloseModelListeners(formEditAvatar);
addCloseModelListeners(addCardModalWindow);
addCloseModelListeners(imageModalWindow);

addCardModalWindow.classList.add('popup_is-animated');
imageModalWindow.classList.add('popup_is-animated');
formProfile.classList.add('popup_is-animated');
formEditAvatar.classList.add('popup_is-animated')

Promise.all([getUser(),getCardList()])
  .then(([userData,cardsData]) => {
  let userId = userData._id;
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
  cardsData.forEach(function(data){
    cardPlace.append(createCard(data, deleteCard,handleLikeCard,handleOpenImage, userId))
  }
)})
.catch((err) => {
  console.log(err);
});

enableValidation(popupElements)
