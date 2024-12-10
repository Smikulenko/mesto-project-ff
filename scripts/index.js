// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы 
const cardPlace = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(data, removeCard){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;
  deleteButton.addEventListener('click',removeCard);
  return cardElement
}

// @todo: Функция удаления карточки
function deleteCard(evt){
evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(data){
  cardPlace.append(createCard(data, deleteCard));
});

