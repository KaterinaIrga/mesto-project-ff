import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {clearValidation, enebleValidation} from './components/validation.js';
import logoImg from './images/logo.svg';
import './index.css';
import {getUserInfo, getCardsData, saveProfileData, saveNewCardData, SetUserAvatar} from './components/api.js';

const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
let userData;

createPage();

const profileButton = page.querySelector('.profile__edit-button');
const cardAddButton = page.querySelector('.profile__add-button');
const avatarButton = page.querySelector('.profile__image-edit');

document.querySelector('.header__logo').src = logoImg;

function avatarMouseOver() {
const editLink = new URL('./images/edit-icon.svg', import.meta.url);

profile.querySelector('.profile__image-edit')
  .style = `background-image : url('${editLink}'), linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.5))`;
}

function avatarMouseOut() {
  profile.querySelector('.profile__image-edit').style = `background-image: none;`;
}

function createProfile(profile, userData) {
  profile.querySelector('.profile__title').textContent = userData.name;
  profile.querySelector('.profile__description').textContent = userData.about;
  profile.querySelector('.profile__image').style = `background-image: url('${userData.avatar}')`;
  profile.querySelector('.profile__image-edit').addEventListener('mouseover', () => {avatarMouseOver()});
  profile.querySelector('.profile__image-edit').addEventListener('mouseout', () => {avatarMouseOut()});
  console.log('Профиль успешно создан.');

}

function updateProfile(profile, userData) {
  profile.querySelector('.profile__title').textContent = userData.name;
  profile.querySelector('.profile__description').textContent = userData.about;
  profile.querySelector('.profile__image').style = `background-image: url('${userData.avatar}')`;
  console.log('Профиль успешно обновлен.');
}

function updateCards(cardsData, idUser) {
  Array.from(cardsData).forEach(card => { 
    placesList.append(createCard(card, deleteCard, likeCard, cardTemplate, openModalImage, idUser)); 
  });
}

function createPage() {
  let cardsData = {};
  
  getUserInfo().then(res => {userData = res;});
  getCardsData().then(result => {cardsData = result; })
  const loadCardPromise = Promise.all([getUserInfo(), getCardsData()]);

  loadCardPromise.then(() => { createProfile(profile, userData);
                              updateCards(cardsData, userData._id);
                              enebleValidation(); });  
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
          .then(() => {updateProfile(profile, userData)})
          .catch((err) => {console.log(err)});
          resolve('Сохранить');
          reject(new Error('Где-то произошла ошибка...'));       
        break;
      }
      case 'edit-profile': {     
        saveProfileData(formElem.elements.name.value, formElem.elements.description.value)
          .then(() => { updateProfile(profile, userData)});
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
          .then((result) => { placesList.prepend(createCard(result, deleteCard, likeCard, cardTemplate, openModalImage, userData._id));});
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
}

profileButton.addEventListener('click', openModalProfile);
cardAddButton.addEventListener('click', openModalNewCard);
avatarButton.addEventListener('click', openModalAvatar);
