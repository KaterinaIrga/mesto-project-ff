import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal, saveData, handleMouseClick} from './components/modal.js';
import {initialCards} from './cards.js';
import logoImg from './images/logo.svg';
import './index.css';

const page = document.querySelector('.page');
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

insertCards(initialCards);  

const profileButton = page.querySelector('.profile__edit-button');
const cardAddButton = page.querySelector('.profile__add-button');
const imageCard = document.querySelector('.card__image');

document.querySelector('.header__logo').src = logoImg;

const activeElements = [
  {
    name: 'profileButton', 
    elem: profileButton, 
    className: profileButton.className},
  {
    name: 'cardAddButton', 
    elem: cardAddButton, 
    className: cardAddButton.className},
  {
    name: 'imageCard', 
    elem: imageCard, 
    className: imageCard.className}
]

const profilePopap = document.querySelector('.popup_type_edit');
const cardPopap = document.querySelector('.popup_type_new-card');
const imagePopap = document.querySelector('.popup_type_image');
 
// @todo: Вывести карточки на страницу
function insertCards(cardsData) {
  const cardsArray = Array.from(cardsData);  
  cardsArray.forEach(item => 
    {
     placesList.append(createCard(item, deleteCard, likeCard, cardTemplate)); 
    }
  )  
}
   
page.addEventListener('click', clickHendler);

function clickHendler(e) {
  const elemClassName = e.target.className;
  if (activeElements.some(item => item.className === elemClassName)) {

    switch (elemClassName) 
    {
      case profileButton.className: 
        {
          openModal(profilePopap);
          break;
        }
      case cardAddButton.className:
        {        
          openModal(cardPopap);
          break;
        }
      case imageCard.className:
        {
          openModal(imagePopap, e.target.src, e.target.alt);
          break;
        }
    }
  }
 
}
