import { data } from 'autoprefixer';
import{deleteCardApi,addLike, removeLike} from './api' 

// @todo: Функция создания карточки
export function createCard(data, removeCard, likeCard, openImage, userId){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButtom = cardElement.querySelector('.card__like-button');
  const likeCardCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;
  if (data.owner._id === userId){
    deleteButton.addEventListener('click', () => removeCard(cardElement,data._id));
  } else {
    deleteButton.remove()
  }
  const likedCard = data.likes.some((like)=> like._id === userId);
  if (likedCard){
    likeButtom.classList.toggle('card__like-button_is-active');
  }
  likeCardCounter.textContent = data.likes.length;
  likeButtom.addEventListener('click',() => likeCard(likeButtom,data._id,likeCardCounter));
  cardImage.addEventListener('click', () => openImage(data));
  return cardElement
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement, cardId){
  deleteCardApi(cardId).then((deletedCard) => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(err);
  });
  
};
export function handleLikeCard(likeButtom,cardID,likeCardCounter){
  const likedCard = likeButtom.classList.contains('card__like-button_is-active')
  if (likedCard){
    removeLike(cardID).then(updateCard => {
      likeCardCounter.textContent =updateCard.likes.length
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    addLike(cardID).then(updateCard => {
      likeCardCounter.textContent =updateCard.likes.length
    })
    .catch((err) => {
      console.log(err);
    });
  }
 
  likeButtom.classList.toggle('card__like-button_is-active');
};


