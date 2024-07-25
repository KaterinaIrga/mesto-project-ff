import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
//import {initialCards} from './cards.js';
import {clearValidation, enebleValidation} from './components/validation.js';
import logoImg from './images/logo.svg';
import './index.css';
import {getUserInfo, getCardsData, saveProfileData, saveNewCardData, SetUserAvatar} from './components/api.js';

const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

createPage();

const profileButton = page.querySelector('.profile__edit-button');
const cardAddButton = page.querySelector('.profile__add-button');
const avatarButton = page.querySelector('.profile__image-edit');
const imageCard = document.querySelector('.card__image');

document.querySelector('.header__logo').src = logoImg;


function avatarMouseOver() {
const editLink = new URL('./images/edit-icon.svg', import.meta.url);

profile.querySelector('.profile__image-edit').style = `background-image : url('${editLink}'), linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.5))`;

console.log(profile.querySelector('.profile__image-edit').style)

}



function avatarMouseOut() {
  profile.querySelector('.profile__image-edit').style = `background-image: none;`;
}

function createProfile(profile, userData) {

  userData
  .then(res => {
    profile.querySelector('.profile__title').textContent = res.name;
    profile.querySelector('.profile__description').textContent = res.about;
    profile.querySelector('.profile__image').style = `background-image: url('${res.avatar}')`;
    profile.querySelector('.profile__image-edit').addEventListener('mouseover', () => {avatarMouseOver()})
    profile.querySelector('.profile__image-edit').addEventListener('mouseout', () => {avatarMouseOut()})
    console.log('Профиль успешно создан.');
    
  })
  .catch(() => {
    console.log('При осоздании профиля что-то пошло не так...')
  })
  .finally(() => console.log('createProfile.finally'));
}

function updateProfile(profile, userData) {
  userData
    .then(res => {
      profile.querySelector('.profile__title').textContent = res.name;
      profile.querySelector('.profile__description').textContent = res.about;
      profile.querySelector('.profile__image').style = `background-image: url('${res.avatar}')`;
      console.log('Профиль успешно обновлен.');
      console.log(res);
    })
    .catch(() => {
      console.log('При обновлении профиля что-то пошло не так...')
    })
    .finally(() => console.log('updateProfile.finally'));
}

function updateCards(cardsData) {
  cardsData
    .then(res => {
      res.forEach(card => { 
        placesList.append(createCard(card, deleteCard, likeCard, cardTemplate, openModalImage)); 
      })
    })
}

function createPage() {
  //insertCards(initialCards);  
  enebleValidation();
  

  createProfile(profile, getUserInfo());
  //ToDo: ТЗ пункт 4 - добавить загрузку карточек по Promise.all()
  updateCards(getCardsData());
}

//Вывести карточки на страницу /*depricated*/
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
  const form = elem.querySelector('.popup__form');
  clearValidation(form); //очистим значения сообщений об ошибке
  
  inputName.textContent = '';
  inputDescription.textContent = '';
  inputDescription.placeholder = document.querySelector('.profile__description').textContent;
  inputName.placeholder = document.querySelector('.profile__title').textContent;
  form.addEventListener('submit', (e) => {saveData(e); closeModal(elem);});  
}

function openModalAvatar() {
  const elem = openModal(document.querySelector('.popup_type_avatar'));
  const inputAvatar = elem.querySelector('.popup__input_type_avatar');
  const form = elem.querySelector('.popup__form');
  clearValidation(form); //очистим значения сообщений об ошибке
  //toggleButtonState(form);
  form.addEventListener('submit', (e) => {saveData(e); closeModal(elem);});
}

function openModalNewCard() {
  const elem = openModal(document.querySelector('.popup_type_new-card'));
  const inputNewCard = elem.querySelector('.popup__input_type_card-name');
  const inputUrl = elem.querySelector('.popup__input_type_url');
  inputNewCard.textContent = '';
  inputUrl.textContent = '';
  const form = elem.querySelector('.popup__form');
  clearValidation(form); //очистим значения сообщений об ошибке
  
  
  elem.querySelector('.popup__form').addEventListener('submit',  (e) => { 
    saveData(e); closeModal(elem);} );
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

function changeButtonContent(btn, btnContent) {
  btn.textContent = btnContent;
}

//ToDo: написать функцию, достающую все поля и элементы управления из формы

function saveData(e) {
  //ToDo: здесь переделать на использование document.forms.[e.target]
  const formElem = e.target;
  const saveButton = formElem.querySelector('.popup__button');

  changeButtonContent(saveButton, 'Сохранение...');
  const savePromise = new Promise((resolve, reject) => {
    switch (formElem.getAttribute('name')) {
      case 'edit-avatar': {   
        SetUserAvatar(formElem.elements.avatar.value)
          .then(() => {updateProfile(profile, getUserInfo() )})
          .catch((err) => {console.log(err)});
          resolve('Сохранить');
          reject(new Error('Где-то произошла ошибка...'));       
        break;
      }
      case 'edit-profile': {  
        //ToDo: передавать не getUserInfo(), а сам объект, возвращаемый saveProfileData       
        saveProfileData(formElem.elements.name.value, formElem.elements.description.value)
          .then(() => { updateProfile(profile, getUserInfo())});
        resolve('Сохранить');
        reject(new Error('Где-то произошла ошибка...'));       
        break;
      }
      case 'new-place': {
        const newCardData = {
          name:formElem.elements['place-name'].value,
          link: formElem.elements.link.value
        };
        //ToDO:если сервер возвращает id карточки, то здесь нужно переделать на добавление карточки в верстку по id        
        saveNewCardData(newCardData)
          .then((result) => { placesList.prepend(createCard(result, deleteCard, likeCard, cardTemplate, openModalImage));});
        resolve('Сохранить');
        reject(new Error('Где-то произошла ошибка...'));        
        break;
      }
      default: {
      e.stopPropagation();
      //showButtonIsLoad()
      }
    }   
  });

  savePromise
    .then((result) => {changeButtonContent(saveButton, result);})
    .catch((err) => {changeButtonContent(saveButton, err.message);})

 
  //showButtonOnLoad();
 /*  if (e.type === 'submit') {
    changeButtonContent(e.target.querySelector('.popup__button'), 'Сохранение...') 
    switch (formElem.getAttribute('name')) {
      case 'edit-avatar': {   
        SetUserAvatar(formElem.elements.avatar.value)
          .then(() => {updateProfile(profile, getUserInfo() )})
          .catch((err) => {console.log(err)});
        break;
      }
      case 'edit-profile': {  
        //ToDo: передавать не getUserInfo(), а сам объект, возвращаемый saveProfileData       
        saveProfileData(formElem.elements.name.value, formElem.elements.description.value)
          .then(() => { updateProfile(profile, getUserInfo())})  
        break;
      }
      case 'new-place': {
        const newCardData = {
          name:formElem.elements['place-name'].value,
          link: formElem.elements.link.value
        };
        //ToDO:если сервер возвращает id карточки, то здесь нужно переделать на добавление карточки в верстку по id
        
        saveNewCardData(newCardData)
          .then((result) => { placesList.prepend(createCard(result, 
                                                            deleteCard, 
                                                            likeCard, 
                                                            cardTemplate, 
                                                            openModalImage));})
          //.then(showButtonIsLoad);

             
        break;
      }
      default: {
      e.stopPropagation();
      //showButtonIsLoad()
      }
    }   
   
   formElem.reset();
   e.preventDefault();
   //e.stopPropagation() ;
  } */
}

profileButton.addEventListener('click', openModalProfile);
cardAddButton.addEventListener('click', openModalNewCard);
avatarButton.addEventListener('click', openModalAvatar);
//imageCard.addEventListener('click', openModalImage);
/* 
const inputName = document.getElementById('popup__input_type_name');
inputName.setCustomValidity('rrr')
const inputNameError = document.querySelector('.popup__input-error')
const formP = document.querySelector('.popup__form');
Array.from(formP.elements).forEach(elem => {console.log(elem.classList)})
inputNameError.textContent = setErrorValue(inputNameError, inputName, 'content-error'); */
//inputName.validationMessage



//console.log(inputName.validationMessage)
