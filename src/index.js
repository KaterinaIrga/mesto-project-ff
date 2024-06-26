import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
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


// @todo: Вывести карточки на страницу
function insertCards(cardsData) {
  const cardsArray = Array.from(cardsData);  
  cardsArray.forEach(item => 
    {
     placesList.append(createCard(item, deleteCard, likeCard, cardTemplate, openModalImage)); 
    }
  )  
}

function openModalProfile() {
  const elem = openModal(document.querySelector('.popup_type_edit'));
  const inputName = elem.querySelector('.popup__input_type_name');
  const inputDescription = elem.querySelector('.popup__input_type_description');
  inputDescription.placeholder = document.querySelector('.profile__description').textContent;
  inputName.placeholder = document.querySelector('.profile__title').textContent;
  elem.querySelector('.popup__form').addEventListener('submit',  saveData );
}

function openModalNewCard() {
  const elem = openModal(document.querySelector('.popup_type_new-card'));
  elem.querySelector('.popup__form').addEventListener('submit',  (e) => { 
    saveData(e)} );
}

function openModalImage(e) {
  const cardElem = document.querySelector('.card');
  const buttonLike = cardElem.querySelector('.card__like-button');
  if ((e.currentTarget === cardElem) && (e.target !== buttonLike) ) {
    const elem = openModal(document.querySelector('.popup_type_image'));
    elem.querySelector('.popup__image').src = cardElem.querySelector('.card__image').getAttribute('src');
    elem.querySelector('.popup__caption').textContent = cardElem.querySelector('.card__title').textContent;
    e.stopPropagation();
  }  
}

//ToDo: написать функцию, достающую все поля и элементы управления из формы

function saveData(e) {
  //ToDo: здесь переделать на использование document.forms.[e.target]
  const formElem = e.target;
  if (e.type === 'submit') {
    switch (formElem.getAttribute('name')) {
      case 'edit-profile': {    
        document.querySelector('.profile__title').textContent = formElem.elements.name.value;
        document.querySelector('.profile__description').textContent = formElem.elements.description.value;
        break;
      }
      case 'new-place': {
        const newCardData = {
          name:formElem.elements['place-name'].value,
          link: formElem.elements.link.value
        };
        placesList.prepend(createCard(newCardData, deleteCard, likeCard, cardTemplate, openModalImage));     
        break;
      }
    }   
   
   formElem.reset();
   e.preventDefault();
   e.stopPropagation() ;
  }
}


export function closeModalEscape(e) {
  if(e.key === 'Escape'){
    closeModal(document.querySelector('.popup_is-opened'));}
  e.preventDefault();
}

export function closeModalOverlay(e){
  if (e.type === 'submit' ||
     (e.target.classList.contains('popup') || e.target.classList.contains('popup__close'))) {
    closeModal(e.currentTarget);    
  }
  e.stopPropagation() ;
}

profileButton.addEventListener('click', openModalProfile);
cardAddButton.addEventListener('click', openModalNewCard);
imageCard.addEventListener('click', openModalImage);
