const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard(cardData, delCard) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');    

  newCard.querySelector('.card__image').src = cardData.link;   
  newCard.querySelector('.card__title').textContent = cardData.name;
  deleteButton.addEventListener('click', 
                                () => delCard(deleteButton)
                               ) 
  return newCard;
}

function deleteCard (btn) {
  const delItem = btn.closest('.card');
  delItem.remove();
}

// @todo: Вывести карточки на страницу

function insertCards(cardsData) {
  const cardsArray = Array.from(cardsData);
  
  cardsArray.forEach(item => 
    {
     placesList.append(createCard(item, deleteCard)); 
    }
  )  
}

  insertCards(initialCards); 
