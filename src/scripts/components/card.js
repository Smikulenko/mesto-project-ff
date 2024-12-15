// @todo: Функция создания карточки
export function createCard(data, removeCard, likeCard, openImage){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButtom = cardElement.querySelector('.card__like-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;
  deleteButton.addEventListener('click',removeCard);
  likeButtom.addEventListener('click',likeCard);
  cardImage.addEventListener('click',function(evt){
    openImage(data)
  });
  return cardElement
}

// @todo: Функция удаления карточки
export function deleteCard(evt){
evt.target.closest('.places__item').remove();
};
export function handleLikeCard(evt){
evt.target.classList.toggle('card__like-button_is-active');
};


