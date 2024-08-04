import {switchLikesForCard, dropCard} from './api.js';

export function createCard(cardData, delCard, likeCard, cardTemplate, imageClick, idUser) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');  
  const likeButton =   newCard.querySelector('.card__like-button'); 
  const imageLink = new URL(cardData.link, import.meta.url);
  const currentUser = idUser;

  if (currentUser === cardData.owner._id) {
    deleteButton.classList.add('card__delete-button_active');
    deleteButton.addEventListener('click', 
      (e) => {e.stopPropagation() ;
        delCard(deleteButton)}
     ) 
  };

  newCard.querySelector('.card__image').src = imageLink;   
  newCard.querySelector('.card__image').alt = cardData.name; 
  newCard.querySelector('.card__title').textContent = cardData.name; 
  newCard.querySelector('.card__like-counter').textContent = cardData.likes.length; 
  console.log(cardData.likes.length)
  
  if (hasMyLike(cardData.likes, currentUser)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  newCard.addEventListener('click', imageClick);
  newCard.setAttribute('id', cardData._id);  
  likeButton.addEventListener('click', () => likeCard(likeButton));
  console.log(`Карточка [${cardData.name}] успешно создана.`);
  return newCard;
}

export function deleteCard (btn) {  
  const delItem = btn.closest('.card');
  dropCard(delItem.getAttribute('id'))
    .then(() => {delItem.remove();});    
}

function hasMyLike(likeArray, idUser) {
  return likeArray.some((item) => {
     return item._id === idUser});
}

export function likeCard(elem) {
  const likeCount = elem.closest('.card').querySelector('.card__like-counter');
  const idCard = elem.closest('.card').getAttribute('id');  
  const isLiked = elem.classList.contains('card__like-button_is-active');

  switchLikesForCard(idCard, isLiked)
    .then(res => { 
      likeCount.textContent = res.likes.length;
      elem.classList.toggle('card__like-button_is-active'); 
    })
    .catch((err) => {console.log('Что-то пошло не так при лайке.');
      console.log(err);
    })
    .finally(() => {return likeCount.textContent;})
  
}
