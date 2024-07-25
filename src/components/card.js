import {getUserInfo, switchLikesForCard, dropCard} from './api.js';
//ToDo: получить данные пользователя единоразово и юзать там, где нужно.

export function createCard(cardData, delCard, likeCard, cardTemplate, imageClick) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');  
  const likeButton =   newCard.querySelector('.card__like-button'); 
  const imageLink = new URL(cardData.link, import.meta.url);

  getUserInfo()
    .then(result => {const currentUser = result._id;
      if (currentUser === cardData.owner._id) {
        deleteButton.classList.add('card__delete-button_active');
        deleteButton.addEventListener('click', 
          (e) => {e.stopPropagation() ;
            if(e.target.classList.contains('card__delete-button')) {delCard(deleteButton)}}
         ) 
      };
      return currentUser;
    })
      .then((currentUser) => {  
         hasMyLike(cardData.likes, currentUser) ? 
          likeButton.classList.add('card__like-button_is-active') : null;}) 
    .catch(err => console.log('Произошла ошибка при получении idUser для карточки')); 

  newCard.querySelector('.card__image').src = imageLink;   
  newCard.querySelector('.card__image').alt = cardData.name; 
  newCard.querySelector('.card__title').textContent = cardData.name; 
  newCard.addEventListener('click', imageClick);
  newCard.setAttribute('id', cardData._id);  
  likeButton.addEventListener('click', () => likeCard(likeButton));
  return newCard;
}

export function deleteCard (btn) {  
  const delItem = btn.closest('.card');
  dropCard(delItem.getAttribute('id'));
    delItem.remove(); 
}

function hasMyLike(likeArray, idUser) {
  return Array.from(likeArray).some((item) => {
     return item._id === idUser});
}

export function likeCard(elem) {
  const likeCount = elem.closest('.card').querySelector('.card__like-counter');
  const idCard = elem.closest('.card').getAttribute('id');
  elem.classList.toggle('card__like-button_is-active'); 
  const isLiked = elem.classList.contains('card__like-button_is-active');

  switchLikesForCard(idCard, isLiked)
    .then(res => {
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {console.log('Что-то пошло не так при лайке.');
      console.log(err);
    })
    .finally(() => {return likeCount.textContent;})
  
}
