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
  /* const inputPlaceName = elem.querySelector('.popup__input_type_card-name');
  const inputLink = elem.querySelector('.popup__input_type_url'); */
  console.log(elem.querySelector('.popup__form'))
  elem.querySelector('.popup__form').addEventListener('submit',  (e) => { console.log(e.target)
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
  console.log('kkk')
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
  //  closeModal(formElem.closest('.popup_is-opened'));
   
    formElem.reset();
    console.log('save')
    debugger
   e.preventDefault();
   e.stopPropagation() ;
  }
}


export function closeModalEscape(e) {
  if(e.key === 'Escape'){
    closeModal(document.querySelector('.popup_is-opened'));}
  e.preventDefault();
 // e.stopPropagation() ;
}

export function closeModalOverlay(e){
  console.log(e.target.classList + ' close overlay')
  if (e.type === 'submit' ||
     (e.target.classList.contains('popup') || e.target.classList.contains('popup__close'))) {

    closeModal(e.currentTarget);
    
  }
  //e.preventDefault();
  e.stopPropagation() ;
}
   
//page.addEventListener('click', clickHendler);

profileButton.addEventListener('click', openModalProfile);
cardAddButton.addEventListener('click', openModalNewCard);
imageCard.addEventListener('click', openModalImage);
